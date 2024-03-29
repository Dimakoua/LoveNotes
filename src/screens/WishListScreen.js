import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    SafeAreaView,
    Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import BackButton from '../components/BackButton';
import { useIdea } from '../services/IdeaGenerator';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import ListEmptyComponent from '../components/ListEmptyComponent';

const WishListScreen = () => {
    const { t } = useTranslation();
    const { getIdeas, like, markIsDone } = useIdea();

    const [ideas, setIdeas] = useState(null);
    const [showLiked, setShowLiked] = useState(true);
    const [showDone, setShowDone] = useState(false);
    const [emptyListErrorText, setEmptyListErrorText] = useState(null);

    const [searchText, setSearchText] = useState(''); // Додавання стану для текстового пошуку
    const [isEditingSearch, setIsEditingSearch] = useState(false); // Додавання стану для визначення режиму редагування пошуку

    const navigation = useNavigation();
    const searchInputRef = useRef();

    useEffect(() => {
        loadIdeas();
        toggleEmptyListText();
    }, [showLiked, showDone, searchText]);

    const loadIdeas = async () => {
        const storedIdeas = await getIdeas();

        const filteredIdeas = storedIdeas.filter((item) => {
            return (
                (showLiked ? item.liked : true) &&
                (showDone ? item.done : true) &&
                (t(item.key).toLowerCase().includes(searchText.toLowerCase()) || item.text.toLowerCase().includes(searchText.toLowerCase())) // Додати фільтрацію за текстовим пошуком
            );
        });
        setIdeas(filteredIdeas);
    };

    const toggleLike = async (item) => {
        await like(item);
        loadIdeas();
    };

    const toggleDone = async (item) => {
        await markIsDone(item);
        loadIdeas();
    };

    const toggleEmptyListText = () => {
        if (showDone && showLiked) {
            setEmptyListErrorText(t('liked_done_list_is_empty'));
        } else if (showDone) {
            setEmptyListErrorText(t('done_list_is_empty'));
        } else {
            setEmptyListErrorText(t('liked_list_is_empty'));
        }
    }

    const focusSearchInput = () => {
        if (searchInputRef.current) {
            setTimeout(() => searchInputRef.current.focus(), 100)
        }
    };

    const getItemBackgroundColor = (item) => {
        if (item.liked && item.done) {
            return 'rgba(255, 0, 0, 0.5)';
        } else if (item.liked) {
            return 'rgb(150, 222, 178)';
        } else if (item.done) {
            return 'rgb(150, 178, 222)';
        } else {
            return 'rgba(255, 204, 204, 0.7)';
        }
    };

    const renderRightActions = (item, dragX, close) => {
        return (
            <View style={styles.rightActionsContainer}>
                <RectButton
                    style={[
                        styles.rightActionButton,
                        styles.likeButton,
                        styles.like,
                    ]}
                    onPress={() => {
                        toggleLike(item);
                    }}
                >
                    <Text style={styles.actionText}>{t('like')}</Text>
                </RectButton>
                <RectButton
                    style={[
                        styles.rightActionButton,
                        styles.doneButton,
                        styles.done,
                    ]}
                    onPress={() => {
                        toggleDone(item);
                    }}
                >
                    <Text style={styles.actionText}>{t('done')}</Text>
                </RectButton>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackButton />
            <TouchableOpacity
                onPress={() => {
                    setIsEditingSearch(!isEditingSearch);
                    focusSearchInput();
                }}
                style={styles.searchButton}
            >
                <Image source={require('../../assets/images/icons8-search-30.png')} style={styles.image} />
            </TouchableOpacity>

            <View style={styles.headerWrap}>
                <TextInput
                    ref={searchInputRef}
                    style={[
                        styles.searchInput,
                        isEditingSearch ? null : styles.hidden,
                    ]}
                    placeholder={t('search')}
                    value={searchText}
                    blurOnSubmit={false}
                    onChangeText={(text) => setSearchText(text)}
                />
                <Text style={[
                    styles.header,
                    isEditingSearch ? styles.hidden : null,
                ]}>
                    {t('wish_list')}
                </Text>
            </View>
            <View style={styles.filterButtons}>
                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        showLiked ? styles.activeFilterButton : null,
                    ]}
                    onPress={() => setShowLiked(!showLiked)}
                >
                    <Text
                        style={[
                            showLiked ? styles.activeFilterButtonText : styles.filterButtonText,
                        ]}
                    >
                        {t('like')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        showDone ? styles.activeFilterButton : null,
                    ]}
                    onPress={() => setShowDone(!showDone)}
                >
                    <Text
                        style={[
                            showDone ? styles.activeFilterButtonText : styles.filterButtonText,
                        ]}
                    >
                        {t('done')}
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={ideas}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={() => <ListEmptyComponent text={emptyListErrorText} />}
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
                            onPress={() => navigation.navigate('ideaDetails', { idea: item })}
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
        backgroundColor: 'rgba(253, 246, 238, 0.7)',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'rgb(222, 178, 150)',
        textAlign: 'center',
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
        alignItems: 'stretch',
        marginBottom: 16,
    },
    rightActionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 60,
    },
    actionText: {
        color: 'white',
        paddingHorizontal: 10,
    },
    likeButton: {
        backgroundColor: 'rgb(150, 222, 178)',
        marginRight: 8,
    },
    doneButton: {
        backgroundColor: 'rgb(150, 178, 222)',
    },
    filterButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: 'rgb(150, 178, 222)',
    },
    filterButtonText: {
        color: 'rgb(150, 178, 222)',
    },
    activeFilterButton: {
        color: 'white',
        backgroundColor: 'rgb(150, 178, 222)',
    },
    searchContainer: {
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'rgb(150, 178, 222)',
        borderRadius: 16,
        paddingHorizontal: 16,
        alignSelf: 'center',
        width: '60%',
        height: 40
    },
    searchButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 100,
    },
    headerWrap: {
        height: 50
    },
    hidden: {
        display: 'none'
    }
});

export default WishListScreen;
