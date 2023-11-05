import { useEffect } from 'react';
import MainContainer from './navigation/MainContainer';
import PushNotification, { Importance, PushNotificationScheduleObject, PushNotificationObject  } from 'react-native-push-notification';
import "./i18n.config";
import AsyncStorage from '@react-native-async-storage/async-storage';
const CHANNEL_ID = "defaultLocalPushesChannelId";
import { notifications } from './initial_notifications';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const createNotificationChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "defaultLocalPushesChannelId",
        channelName: "defaultLocalPushesChannelName",
        channelDescription: "Channel for local pushes",
        playSound: true,
        soundName: "default", 
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created: any) => (created)
    );
  };

  const initialSetup = () => {
    AsyncStorage.getItem('initialSetup').then((initialSetup) => {
      if (initialSetup) return;

      ///////////////////////
      // NOTIFICATIONS
      //////////////////////

      // Get the current date
      const currentDate = new Date();
      // Add 3 days to the current date
      const notificationsToSave: PushNotificationScheduleObject[] = [];
      notifications.forEach(notification => {
        const obj: PushNotificationScheduleObject = {
          id: notification.id,
          title: t(notification.title),
          message: t(notification.message),
          channelId: CHANNEL_ID,
          date: new Date(currentDate.getTime() + notification.datePlus * 24 * 60 * 60 * 1000),
          repeatType: notification.repeatType,
          repeatTime: notification.repeatTime,
        };

        PushNotification.localNotificationSchedule(obj);
        notificationsToSave.push(obj);
      });

      AsyncStorage.setItem('notifications', JSON.stringify(notificationsToSave));
    });

    AsyncStorage.setItem('initialSetup', 'true');
  }

  useEffect(() => {
    createNotificationChannels();
    initialSetup();
  }, []);

  return (
    <MainContainer />
  );
}

export default App;