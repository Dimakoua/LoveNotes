import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../components/BackButton';

const LanguageSelectScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();

    const changeLanguage = async (language) => {
        // Save the selected language in AsyncStorage or any other persistent storage
        await AsyncStorage.setItem('selectedLanguage', language);

        // Set the selected language using i18n
        i18n.changeLanguage(language);
        navigation.navigate("Ideas");
    };

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'uk', label: 'Українська' },
        { code: 'de', label: 'Deutsch' },
        { code: 'fr', label: 'Français' },
        { code: 'it', label: 'Italiano' }
    ];

    return (
        <View style={styles.container}>
            <BackButton />
            {languages.map((language) => (
                <TouchableOpacity
                    key={language.code}
                    onPress={() => changeLanguage(language.code)}
                    style={styles.languageButton}
                >
                    <Text style={styles.buttonText}>{language.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(252, 247, 241)'

    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    languageButton: {
        backgroundColor: 'rgba(255, 204, 204, 0.7)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LanguageSelectScreen;
