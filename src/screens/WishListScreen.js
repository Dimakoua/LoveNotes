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

    useEffect(() => {
        loadIdeas();
    }, []);

    const loadIdeas = async () => {
        const storedIdeas = await getIdeas();
        setIdeas(storedIdeas);
    };

    const toggleLike = async (item) => {
        await like(item);
        loadIdeas();
    };

    const toggleDone = async (item) => {
        await markIsDone(item);
        loadIdeas();
    };

    const getItemBackgroundColor = (item) => {
        if (item.done) {
            return 'rgb(150, 178, 222)'; // Колір, коли тільки done виконується
        } else if (item.liked) {
            return 'rgb(150, 222, 178)'; // Колір, коли тільки like виконується
        } else {
            return 'rgba(255, 204, 204, 0.7)'; // Колір за замовчуванням
        }
    };

    const renderRightActions = (item, dragX, close) => {
        return (
            <View style={[styles.rightActionsContainer]}>
                <RectButton
                    style={[
                        styles.rightAction,
                        styles.ideaContainer,
                        styles.like
                    ]}
                    onPress={() => {
                        toggleLike(item);
                    }}
                >
                    <Text style={[styles.actionText, styles.like]}>Like</Text>
                </RectButton>
                <RectButton
                    style={[
                        styles.rightAction,
                        styles.ideaContainer,
                        styles.done
                    ]}
                    onPress={() => {
                        toggleDone(item);
                    }}
                >
                    <Text style={[styles.actionText]}>Done</Text>
                </RectButton>
            </View>
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
                        renderRightActions={(_, dragX, close) =>
                            renderRightActions(item, dragX, close)
                        }
                    >
                        <TouchableOpacity
                            style={[
                                styles.ideaContainer,
                                { backgroundColor: getItemBackgroundColor(item) },
                            ]}
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
    rightActionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch', // Зроблюємо кнопки повними по висоті
    },
    rightAction: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    actionText: {
        color: 'white',
        paddingHorizontal: 10,
    },
    done: {
        backgroundColor: 'rgb(150, 178, 222)'
    },
    like: {
        backgroundColor: 'rgb(150, 222, 178)'
    }
});

export default WishListScreen;
