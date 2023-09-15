import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import BackButton from '../components/BackButton';
import { useIdea } from '../services/IdeaGenerator';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

const WishListScreen = () => {
    const { t } = useTranslation();
    const { getIdeas, like, markIsDone } = useIdea();

    const [ideas, setIdeas] = useState(null);
    const [render, setRender] = useState(false);

    useEffect(() => {
        loadIdeas();
    }, [render]);

    const loadIdeas = async () => {
        const storedIdeas = await getIdeas();
        setIdeas(storedIdeas);
    };

    const toggleLike = async (item) => {
        await like(item);
        setRender(!render);
    };

    const toggleDone = async (item) => {
        await markIsDone(item);
        setRender(!render);
    };

    const getItemBackgroundColor = (item) => {
        if (item.done) {
            return 'rgb(150, 178, 222)'; // Колір для зробленого
        } else if (item.liked) {
            return 'rgb(150, 222, 178)'; // Колір для лайку
        } else {
            return 'rgba(255, 204, 204, 0.7)';
        }
    };

    const renderRightActions = (item, dragX) => {
        return (
            <RectButton
                style={[
                    styles.rightAction,
                    styles.ideaContainer,
                    {
                        backgroundColor: getItemBackgroundColor(item), // Змінюємо колір фону
                    },
                ]}
            >
                <Text style={styles.actionText}>Like</Text>
            </RectButton>
        );
    };

    const renderLeftActions = (item, dragX) => {
        return (
            <RectButton
                style={[
                    styles.leftAction,
                    styles.ideaContainer,
                    {
                        backgroundColor: getItemBackgroundColor(item), // Змінюємо колір фону
                    },
                ]}

            >
                <Text style={styles.actionText}>Mark as Done</Text>
            </RectButton>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.backButton}>
                <BackButton />
            </View>
            <Text style={styles.header}>{t('wish_list')}</Text>
            <FlatList
                data={ideas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Swipeable
                        renderRightActions={(_, dragX) => renderRightActions(item, dragX)}
                        renderLeftActions={(_, dragX) => renderLeftActions(item, dragX)}
                        onSwipeableOpen={(direction) => {
                            if (direction === 'left') {
                                toggleDone(item);
                            } else {
                                toggleLike(item);
                            }
                        }}
                    >
                        <TouchableOpacity
                            style={[styles.ideaContainer, { backgroundColor: getItemBackgroundColor(item) }]}
                        >
                            <Text style={styles.ideaText}>{t(item.key)}</Text>
                        </TouchableOpacity>
                    </Swipeable>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(253, 246, 238, 0.7)',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'rgb(222, 178, 150)',
    },
    ideaContainer: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    ideaText: {
        fontSize: 18,
        color: 'rgb(51, 51, 51)',
    },
    rightAction: {
        justifyContent: 'center',
        flex: 1,
    },
    leftAction: {
        justifyContent: 'center',
        flex: 1,
    },
    actionText: {
        color: 'white',
        paddingHorizontal: 10,
    },
});

export default WishListScreen;
