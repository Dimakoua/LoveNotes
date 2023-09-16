import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    FlatList,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const NotificationScreen = () => {
    const [message, setMessage] = useState('');
    const [notificationTitle, setNotificationTitle] = useState('');
    const [interval, setInterval] = useState('daily');
    const [modalVisible, setModalVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [storedNotifications, setStoredNotifications] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        loadStoredNotifications();
    }, []);

    const loadStoredNotifications = async () => {
        try {
            const storedData = await AsyncStorage.getItem('notifications');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setStoredNotifications(parsedData);
            }
        } catch (error) {
            console.error('Error loading stored notifications:', error);
        }
    };

    const saveNotifications = async (data) => {
        try {
            await AsyncStorage.setItem('notifications', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving notifications:', error);
        }
    };

    const scheduleNotification = () => {
        const currentDate = new Date();

        console.log('Scheduled time:', selectedDate);

        PushNotification.localNotificationSchedule({
            id: '1',
            title: notificationTitle,
            message: message,
            channelId: 'defaultLocalPushesChannelId',
            repeatType: 'time',
            repeatTime: 2000,
            date: selectedDate,
        });

        const newNotification = {
            id: selectedDate.getTime().toString(),
            title: notificationTitle,
            message: message,
            channelId: 'defaultLocalPushesChannelId',
            date: selectedDate,
            frequency: interval,
        };

        const updatedNotifications = [...storedNotifications, newNotification];
        setStoredNotifications(updatedNotifications);
        saveNotifications(updatedNotifications);

        setModalVisible(false);
        setMessage('');
        setNotificationTitle('');
        setInterval('daily');
    };

    const handleDateChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setSelectedDate(selectedDate);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>My Notifications</Text>

            <FlatList
                data={storedNotifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.notificationItem}>
                        <Text style={styles.notificationTitle}>{item.title}</Text>
                        <Text style={styles.notificationMessage}>{item.message}</Text>
                        <Text style={styles.notificationFrequency}>Frequency: {item.frequency}</Text>
                    </View>
                )}
            />

            <View style={styles.addButtonContainer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.addButtonLabel}>Add Notification</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Schedule Notification</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your title"
                            onChangeText={(text) => setNotificationTitle(text)}
                            value={notificationTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your message"
                            onChangeText={(text) => setMessage(text)}
                            value={message}
                        />
                        <Picker
                            selectedValue={interval}
                            onValueChange={(itemValue, itemIndex) => setInterval(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Daily" value="daily" />
                            <Picker.Item label="Weekly" value="weekly" />
                            <Picker.Item label="Monthly" value="monthly" />
                        </Picker>

                        <TouchableOpacity
                            style={styles.selectDateTimeButton}
                            onPress={() => setShowPicker(true)}
                        >
                            <Text style={styles.selectDateTimeButtonText}>Select Date & Time</Text>
                        </TouchableOpacity>

                        {showPicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="time"
                                is24Hour={true}
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={scheduleNotification}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => {
                                setModalVisible(false);
                                setMessage('');
                                setNotificationTitle('');
                                setInterval('daily');
                            }}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'rgba(253, 246, 238, 0.7)',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'rgb(222, 178, 150)',
    },
    notificationItem: {
        backgroundColor: 'rgba(255, 204, 204, 0.7)',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    notificationMessage: {
        fontSize: 16,
    },
    addButtonContainer: {
        marginTop: 16,
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: 'rgb(222, 178, 150)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    addButtonLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
    },
    picker: {
        borderWidth: 1,
        borderColor: 'rgb(150, 178, 222)',
        borderRadius: 8,
        marginBottom: 16,
    },
    saveButton: {
        backgroundColor: 'rgb(222, 178, 150)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: 'gray',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default NotificationScreen;
