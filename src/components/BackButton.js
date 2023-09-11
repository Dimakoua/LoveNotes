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
        <View >
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
});

export default BackButton;
