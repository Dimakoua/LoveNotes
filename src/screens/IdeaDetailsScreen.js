import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ImageBackground, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BackButton from '../components/BackButton';

function IdeaDetailsScreen({ route }) {
    const { t } = useTranslation();

    const { idea } = route.params;

    const selectImage = () => {
        return require('../../assets/images/8.png');
    };

    const generateGoogleCalendarLink = () => {
        const eventTitle = `Plan: ${t(idea.text)}`;
        const selectedDate = new Date();
        const startDate = selectedDate.toISOString();
        const endDate = new Date(selectedDate.getTime() + 2 * 60 * 60 * 1000).toISOString();
        const eventDescription = '';
        const eventLocation = 'Your Location';

        const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
            eventTitle
        )}&dates=${encodeURIComponent(startDate)}/${encodeURIComponent(
            endDate
        )}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(
            eventLocation
        )}`;

        Linking.openURL(googleCalendarLink);
    };


    return (
        <View style={styles.container}>
            <ImageBackground
                source={selectImage()}
                style={styles.image}
                resizeMode="cover"
            >
                <View style={styles.backButton}>
                    <BackButton />
                </View>

                <View style={styles.ideaTextWrap}>
                    <Text style={styles.ideaText}>{t(idea.key)}</Text>
                    <TouchableOpacity
                        style={styles.planEventButton}
                        onPress={generateGoogleCalendarLink}
                    >
                        <Text style={styles.buttonText}>{t('schedule_event')}</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    ideaTextWrap: {
        position: 'absolute',
        bottom: '5%',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20
    },
    ideaText: {
        width: '80%',
        marginBottom: 10,
        fontSize: 15,
        color: 'rgb(225, 164, 131)',
        textAlign: 'center',
        padding: 16,
    },
    planEventButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
        borderRadius: 10,
        padding: 30,
        backgroundColor: 'white'
    },
    buttonText: {
        color: 'rgb(222, 178, 150)',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default IdeaDetailsScreen;
