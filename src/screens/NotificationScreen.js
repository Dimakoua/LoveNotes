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
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';
import BackButton from '../components/BackButton';
import { Image } from '@rneui/base';

const CHANNEL_ID = "defaultLocalPushesChannelId";

const NotificationScreen = () => {
  const { t } = useTranslation();

  const [message, setMessage] = useState('');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [interval, setInterval] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [storedNotifications, setStoredNotifications] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerMode, setDatePickerMode] = useState('date');

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

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const scheduleNotification = () => {
    const newNotification = {
      id: getRandomInt(1, 10000),
      title: notificationTitle,
      message: message,
      channelId: CHANNEL_ID,
      date: selectedDate,
    };

    if (interval) {
      newNotification.repeatType = interval;
      newNotification.repeatTime = 1;
    }

    PushNotification.localNotificationSchedule(newNotification);

    const updatedNotifications = [...storedNotifications, newNotification];
    setStoredNotifications(updatedNotifications);
    saveNotifications(updatedNotifications);

    resetModalForm();
  };

  const resetModalForm = () => {
    setModalVisible(false);
    setMessage('');
    setNotificationTitle('');
    setInterval(null);
    setDatePickerMode('date');
  }

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowPicker(false);
      setDatePickerMode('date');
      return;
    }

    if (selectedDate) {
      setSelectedDate(selectedDate);
      setDatePickerMode('time');
    }

    if (datePickerMode == 'time') {
      setShowPicker(false);
      setDatePickerMode('date');
    }
  }


  const cancelNotification = (id) => {
    PushNotification.cancelLocalNotification(id);
    const updatedNotifications = storedNotifications.filter(notification => notification.id !== id);
    setStoredNotifications(updatedNotifications);
    saveNotifications(updatedNotifications);
  };

  const clearAllNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
    setStoredNotifications([]);
    saveNotifications([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Text style={styles.header}>{t('my_notifications')}</Text>
      {storedNotifications.length > 0 && (
        <TouchableOpacity
          style={styles.clearAllButton}
          onPress={clearAllNotifications}
        >
          <Text style={styles.clearAllButtonText}>{t('clear_all_notifications')}</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={storedNotifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationMessage}>{item.message}</Text>
            <Text style={styles.notificationFrequency}>{t('frequency')}: {item.repeatType ?? t('none')}</Text>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => cancelNotification(item.id)}
            >
              <Image source={require('../../assets/images/icons8-trash-50.png')} style={styles.calendarIcon} />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonLabel}>+</Text>
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
            <Text style={styles.modalHeader}>{t('schedule_notification')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('enter_title')}
              onChangeText={(text) => setNotificationTitle(text)}
              value={notificationTitle}
            />
            <TextInput
              style={styles.input}
              placeholder={t('enter_message')}
              onChangeText={(text) => setMessage(text)}
              value={message}
            />
            <Text>{t('frequency_label')}</Text>
            <Picker
              selectedValue={interval}
              onValueChange={(itemValue, itemIndex) => setInterval(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label={t('none')} value={null} />
              <Picker.Item label={t('daily')} value="day" />
              <Picker.Item label={t('weekly')} value="week" />
              <Picker.Item label={t('monthly')} value="month" />
            </Picker>

            <Text>{t('start_date')}</Text>
            <TouchableOpacity
              style={styles.selectDateTimeButton}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.selectDateTimeButtonText}>{selectedDate.toLocaleDateString() + ' ' + selectedDate.toLocaleTimeString()}</Text>
              <Image source={require('../../assets/images/icons8-calendar-50.png')} style={styles.calendarIcon} />
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={selectedDate}
                mode={datePickerMode}
                is24Hour={true}
                display="spinner"
                onChange={handleDateChange}
                style={styles.dateTimePicker}
              />
            )}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={scheduleNotification}
            >
              <Text style={styles.saveButtonText}>{t('save')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                resetModalForm();
              }}
            >
              <Text style={styles.closeButtonText}>{t('close')}</Text>
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
    textAlign: 'center',
  },
  clearAllButton: {
    backgroundColor: 'rgb(222, 178, 150)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  clearAllButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  notificationItem: {
    backgroundColor: 'rgba(255, 204, 204, 0.7)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
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
    width: 54,
    height: 54,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
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
  dateTimePicker: {
    marginTop: 16,
    borderColor: '#ddd',
    borderRadius: 8,
    borderWidth: 1,
  },
  selectDateTimeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  selectDateTimeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    position: 'absolute',
    top: '45%', // Змініть це значення, щоб відповідало вашим потребам
    right: 10, // Змініть це значення, щоб відповідало вашим потребам
    zIndex: 100,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  calendarIcon: {
    width: 35,
    height: 35
  }
});

export default NotificationScreen;
