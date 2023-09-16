import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PushNotification from 'react-native-push-notification';

const NotificationScreen = () => {
  const [message, setMessage] = useState('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [interval, setInterval] = useState('daily');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('Notification received:', notification);
      },
    });
  }, []);

  const scheduleNotification = () => {
    const currentDate = new Date();
    const date = new Date(currentDate.getTime() + 10000);

    console.log('Scheduled time:', date);

    PushNotification.localNotificationSchedule({
      id: '1',
      title: 'Scheduled Notification',
      message: message,
      date: date,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Notifications</Text>

      <Button
        title="Schedule Notification"
        onPress={() => setModalVisible(true)}
      />

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

            <Button title="Save" onPress={scheduleNotification} />
            <Button
              title="Close"
              onPress={() => {
                setModalVisible(false);
                setMessage('');
                setSelectedTime(new Date());
              }}
            />
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
});

export default NotificationScreen;
