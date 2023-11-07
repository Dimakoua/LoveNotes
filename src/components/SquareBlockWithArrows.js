import React from 'react';
import { View, StyleSheet } from 'react-native';

const SquareBlockWithArrows = () => {
    return (
        <View style={styles.square}>
        </View>
    );
};

const styles = StyleSheet.create({
    square: {
        width: 40, // Adjust the width as needed
        height: 40, // Adjust the height as needed
        backgroundColor: 'rgb(253, 224, 213)',
        borderRadius: 10
    },
});

export default SquareBlockWithArrows;
