import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const BackButton = () => {
    const navigation = useNavigation();

    // Handle the "Back" button press to navigate back to the previous screen
    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.backButton}>
            <TouchableOpacity
                onPress={handleBackPress}
                style={styles.settingsButton}
            >
                <Image source={require('../../assets/images/icons-back-48.png')} style={styles.image} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 35,
        height: 35
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 100
    },
});

export default BackButton;
