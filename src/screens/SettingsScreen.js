import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import BackButton from '../components/BackButton';

const SettingsScreen = ({ navigation }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <BackButton />

            <Text style={styles.header}>{t("settings")}</Text>

            <TouchableOpacity
                style={styles.settingOption}
                onPress={() => navigation.navigate("languageSelect")}
            >
                <Text>{t("language_select")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.settingOption}
                onPress={() => navigation.navigate("ideaList")}
            >
                <Text>{t("ideas_list")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.settingOption}
                onPress={() => navigation.navigate("wishList")}
            >
                <Text>{t("wish_list")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.settingOption}
                onPress={() => navigation.navigate("notification")}
            >
                <Text>{t("notification")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.settingOption}
                onPress={() => navigation.navigate("about")}
            >
                <Text>{t("about")}</Text>
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
