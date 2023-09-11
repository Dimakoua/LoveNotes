import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import BackBottom from '../components/BackBottom';

const SettingsScreen = ({ navigation }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.backBotton}>
                <BackBottom />
            </View>

            <Text style={styles.header}>{t("Settings")}</Text>

            {/* Add your settings options here */}
            <TouchableOpacity style={styles.settingOption}>
                <Text>{t("Option 1")}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingOption}>
                <Text>{t("Option 2")}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(253, 246, 238, 0.7)',
        position: 'relative',
    },
    backBotton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'rgb(222, 178, 150)',
    },
    settingOption: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        width: '80%',
        maxHeight: 200,
        backgroundColor: 'rgba(255, 204, 204, 0.7)',
    },
});

export default SettingsScreen;
