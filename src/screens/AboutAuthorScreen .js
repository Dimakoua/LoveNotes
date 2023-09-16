import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutAuthorScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.authorName}>John Doe</Text>
      <Text style={styles.authorBio}>
        Meet John Doe, a dedicated software developer with a passion for mobile app
        development. John thrives on creating innovative applications that tackle
        real-world challenges and enhance the lives of users.
      </Text>
      <Text style={styles.contactInfo}>
        You can reach out to John at: johndoe@example.com
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(253, 246, 238, 0.7)', // Same background color as SettingsScreen
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  authorName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgb(222, 178, 150)', // Same header color as SettingsScreen
  },
  authorBio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 204, 204, 0.7)', // Same background color as settingOption in SettingsScreen
  },
  contactInfo: {
    fontSize: 14,
    color: 'blue',
  },
});

export default AboutAuthorScreen;
