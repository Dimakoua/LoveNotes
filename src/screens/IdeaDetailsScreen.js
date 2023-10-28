import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ImageBackground, Linking, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BackButton from '../components/BackButton';
import { useIdea } from '../services/IdeaGenerator';


function IdeaDetailsScreen({ route }) {

    const { markIsDone, like, getIdeaById } = useIdea();
    const [idea, setIdea] = useState([]);
    const [render, setRender] = useState(false);

    const { t } = useTranslation();
    const selectImage = () => {
        return require('../../assets/images/8.png');
    };

    const doneHandler = async () => {
        await markIsDone(idea);
        setRender(!render);
    }
    const likeHandler = async () => {
        await like(idea);
        setRender(!render);
    }

    useEffect(() => {
        getIdeaById(route.params.idea.id).then(idea => setIdea(idea))
    }, [render])


    const generateGoogleCalendarLink = () => {
        const eventTitle = `Plan: ${t(idea.key)}`;
        const selectedDate = new Date();
        const startDate = selectedDate.toDateString();
        const endDate = new Date(selectedDate.getTime() + 2 * 60 * 60 * 1000).toDateString();
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
                <BackButton />

                <View style={styles.ideaTextWrap}>
                    <Text style={styles.ideaText}>{t(idea.key)}</Text>
                    <View style={styles.buttonsWrap}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={doneHandler}
                        >
                            {idea.done ? (<Image source={require('../../assets/images/icons8-done-100.png')} style={styles.imageIcon} resizeMode="cover" />) : (<Image source={require('../../assets/images/icons8-done-50.png')} style={styles.imageIcon} resizeMode="cover" />)}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.planEventButton}
                            onPress={generateGoogleCalendarLink}
                        >
                            <Text style={styles.buttonText}>{t('schedule_event')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={likeHandler}
                        >
                            {idea.liked ? (<Image source={require('../../assets/images/icons8-like-100.png')} style={styles.imageIcon} resizeMode="cover" />) : (<Image source={require('../../assets/images/icons8-like-50.png')} style={styles.imageIcon} resizeMode="cover" />)}
                        </TouchableOpacity>
                    </View>

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
    ideaTextWrap: {
        position: 'absolute',
        bottom: '5%',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20
    },
    buttonsWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '80%',
        height: 40
    },
    actionButton: {
        width: 40,
        height: 40
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
    imageIcon: {
        width: 40,
        height: 40

    }
});

export default IdeaDetailsScreen;
