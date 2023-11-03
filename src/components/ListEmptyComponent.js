import React from 'react';
import { View, StyleSheet,Image} from 'react-native';

const ListEmptyComponent = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/search_rafiki.png')} style={styles.image} />
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
