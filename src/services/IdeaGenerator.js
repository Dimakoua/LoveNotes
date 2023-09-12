import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ideas } from '../ideas/list';

export function useIdea() {
    const [idea, setIdea] = useState(null);
    const [ideaPointer, setIdeaPointer] = useState(0);
    const [ideaHistoryStack, setIdeaHistoryStack] = useState([]);

    useEffect(() => {
        generateIdea();
    }, []);

    const getIdeas = async () => {
        let ideaList = ideas;

        const storedIdeas = await AsyncStorage.getItem('ideas');
        if (storedIdeas !== null) {
            ideaList = JSON.parse(storedIdeas);
        }

        return ideaList;
    };

    const getIdeaById = async (id) => {
        const ideaList = await getIdeas();

        const ideaIndex = ideaList.findIndex(item => item.id === id);
        return ideaList[ideaIndex];
    };

    const generateIdea = async () => {
        const ideaList = await getIdeas();

        const randomIndex = Math.floor(Math.random() * ideaList.length);
        const randomElement = ideaList[randomIndex];

        setIdea(randomElement);

        const array = [...ideaHistoryStack];
        array.push(randomElement);
        setIdeaHistoryStack(array);
    };

    const nextIdea = () => {
        let currentPointer = ideaPointer;

        if (ideaHistoryStack[currentPointer + 1]) {
            setIdea(ideaHistoryStack[currentPointer + 1]);
        } else {
            generateIdea();
        }

        setIdeaPointer(currentPointer + 1);
    };

    const prevIdea = () => {
        let currentPointer = ideaPointer;

        if (ideaHistoryStack[currentPointer - 1]) {
            setIdea(ideaHistoryStack[currentPointer - 1]);
            setIdeaPointer(currentPointer - 1);
        }
    };

    const saveIdeas = async (updatedIdeas) => {
        try {
            await AsyncStorage.setItem('ideas', JSON.stringify(updatedIdeas));
        } catch (error) {
            console.error('Error saving ideas:', error);
        }
    };

    const like = async (idea) => {
        const ideaList = await getIdeas();

        const ideaIndex = ideaList.findIndex(item => item.id === idea.id);
        if (ideaIndex !== -1) {
            ideaList[ideaIndex].liked = !ideaList[ideaIndex].liked;
        }

        await saveIdeas(ideaList);
    };

    const markIsDone = async (idea) => {
        const ideaList = await getIdeas();

        const ideaIndex = ideaList.findIndex(item => item.id === idea.id);
        if (ideaIndex !== -1) {
            ideaList[ideaIndex].done = !ideaList[ideaIndex].done;
        }

        await saveIdeas(ideaList);
    };

    return { idea, nextIdea, prevIdea, saveIdeas, like, markIsDone, getIdeas, getIdeaById };
}
