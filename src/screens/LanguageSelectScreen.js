// LanguageSelectScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageSelectScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = async (language) => {
    // Save the selected language in AsyncStorage or any other persistent storage
    await AsyncStorage.setItem('selectedLanguage', language);
    
    // Set the selected language using i18n
    i18n.changeLanguage(language);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('languageSelect')}</Text>
      <TouchableOpacity
        onPress={() => changeLanguage('en')} // Change to the language code you want to support
      >
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => changeLanguage('es')} // Change to the language code you want to support
      >
        <Text style={styles.buttonText}>Español</Text>
      </TouchableOpacity>
      {/* Add more language buttons as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  languageButton: {
    backgroundColor: '#FF3366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LanguageSelectScreen;
