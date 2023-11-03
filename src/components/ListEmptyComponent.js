import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const ListEmptyComponent = ({ text }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/search_rafiki.png')} style={styles.image} />
            {text ? <Text>{text}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginTop: '20%',
        width: 300,
        height: 300
    }
});

export default ListEmptyComponent;
