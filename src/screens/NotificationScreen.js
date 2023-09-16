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

const NotificationScreen = () => {
    const [message, setMessage] = useState('');
    const [interval, setInterval] = useState('daily');
    const [modalVisible, setModalVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [storedNotifications, setStoredNotifications] = useState([]);

    useEffect(() => {

        // Завантаження збережених сповіщень під час завантаження компонента
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
        const date = new Date(currentDate.getTime() + 10000);

        console.log('Scheduled time:', date);

        PushNotification.localNotificationSchedule({
            id: '1',
            title: 'Scheduled Notification',
            message: message,
            channelId: 'defaultLocalPushesChannelId',
            // repeatType: 'time',
            // repeatTime: 2000,
            date: date,
        });

        const newNotification = {
            id: date.getTime().toString(),
            title: 'Scheduled Notification',
            message: message,
            channelId: 'defaultLocalPushesChannelId',
            date: date,
        };

        const updatedNotifications = [...storedNotifications, newNotification];
        setStoredNotifications(updatedNotifications);
        saveNotifications(updatedNotifications);

        setModalVisible(false);
        setMessage('');
        setInterval('daily');
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
