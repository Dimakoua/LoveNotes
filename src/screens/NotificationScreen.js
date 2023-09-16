// NotificationScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PushNotification from 'react-native-push-notification';


const NotificationScreen = () => {
    const [message, setMessage] = useState('');
    const [showTimePicker, setShowTimePicker] = useState(false); // State to control visibility of the time picker
    const [selectedTime, setSelectedTime] = useState(new Date()); // State to store the selected time
    const [interval, setInterval] = useState('daily');

    const scheduleNotification = () => {
        const currentDate = new Date();
        const date = new Date(currentDate.getTime() + 10000);

        // switch (interval) {
        //     case 'daily':
        //         break;
        //     case 'weekly':
        //         date.setDate(date.getDate() + 7);
        //         break;
        //     case 'monthly':
        //         date.setMonth(date.getMonth() + 1);
        //         break;
        //     default:
        //         break;
        // }

        console.log("asdasdasdasd");
        console.log(date);
        PushNotification.localNotificationSchedule({
            id: '1',
            channelId: "defaultLocalPushesChannelId",
            title: 'Scheduled Notification',
            message: message,
            date: date,
        });
    };

    const onTimePickerChange = (event, selected) => {
        setShowTimePicker(false); // Hide the time picker
        if (selected) {
            setSelectedTime(selected);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Message:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your message"
                value={message}
                onChangeText={(text) => setMessage(text)}
            />
            <Text style={styles.label}>Scheduled Time:</Text>
            {/* <Button
                title="Select Time"
                onPress={() => setShowTimePicker(true)} // Show the time picker when the button is pressed
            />
            {showTimePicker && (
                <DateTimePicker
                    value={selectedTime}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={onTimePickerChange}
                />
            )} */}
            <Text style={styles.label}>Repeat Interval:</Text>
            <Picker
                selectedValue={interval}
                onValueChange={(itemValue, itemIndex) => setInterval(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Daily" value="daily" />
                <Picker.Item label="Weekly" value="weekly" />
                <Picker.Item label="Monthly" value="monthly" />
            </Picker>
            <Button title="Schedule Notification" onPress={scheduleNotification} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'rgba(253, 246, 238, 0.7)',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgb(150, 178, 222)',
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
});

export default NotificationScreen;
