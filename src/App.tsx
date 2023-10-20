import { useEffect } from 'react';
import MainContainer from './navigation/MainContainer';
import PushNotification, { Importance } from 'react-native-push-notification';
import "./i18n.config";
import AsyncStorage from '@react-native-async-storage/async-storage';
const CHANNEL_ID = "defaultLocalPushesChannelId";

function App() {

  const createNotificationChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "defaultLocalPushesChannelId", // (required)
        channelName: "defaultLocalPushesChannelName", // (required)
        channelDescription: "Channel for local pushes", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created: any) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  const initialSetup = () => {
    AsyncStorage.getItem('initialSetup').then((initialSetup) => {
      if (initialSetup) return;

      // Get the current date
      const currentDate = new Date();
      // Add 3 days to the current date
      currentDate.setDate(currentDate.getDate() + 3);

      const newNotification = {
        id: 1,
        title: "It is time to buy flowers",
        message: "Don't forget to buy some beautiful flowers!",
        channelId: CHANNEL_ID,
        date: currentDate,
        repeatType: 'week',
        repeatTime: 1
      };

      AsyncStorage.setItem('notifications', JSON.stringify([newNotification]));
      PushNotification.localNotificationSchedule(newNotification);
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