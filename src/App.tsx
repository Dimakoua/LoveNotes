import {useEffect } from 'react';
import MainContainer from './navigation/MainContainer';
import PushNotification, {Importance} from 'react-native-push-notification';
import "./i18n.config";

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

  useEffect(() => {
    createNotificationChannels();
  }, []);

  return (
    <MainContainer />
  );
}

export default App;