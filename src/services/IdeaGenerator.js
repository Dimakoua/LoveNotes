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

    const generateIdea = async () => {
        let ideaList = ideas;
        const storedIdeas = await AsyncStorage.getItem('ideas');
        if (storedIdeas !== null) {
            ideaList = JSON.parse(storedIdeas);
        }

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

    return { idea, nextIdea, prevIdea };
}
