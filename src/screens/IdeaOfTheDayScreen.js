import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ideas } from '../ideas/list';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IdeaOfTheDayScreen = ({ navigation }) => {
  const [idea, setIdea] = useState(null);
  const [ideaPointer, setIdeaPointer] = useState(0);
  const [ideaHistoryStack, setIdeaHistoryStack] = useState([]);

  useEffect(() => {
    generateIdea();
  }, []);

  const generateIdea = async () => {
    let ideaList = ideas;
    const storedIdeas = await AsyncStorage.getItem('ideas');
    if(storedIdeas !== null){
      ideaList = JSON.parse(storedIdeas);
    }

    const randomIndex = Math.floor(Math.random() * ideaList.length);
    const randomElement = ideaList[randomIndex];

    setIdea(randomElement.text);

    const array = [...ideaHistoryStack]; // Create a new array to avoid mutating state directly
    array.push(randomElement.text);
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

  const planEvent = () => {
    navigation.navigate('planEvent', {idea});
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Idea of the Day</Text>
      <View style={styles.ideaContainer}>
        <Text style={styles.ideaText}>{idea}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={prevIdea}
          disabled={ideaPointer === 0}
        >
          <Text style={styles.buttonText}>Previous Idea</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={planEvent}>
          <Text style={styles.buttonText}>Plan Event</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={nextIdea}>
          <Text style={styles.buttonText}>Next Idea</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set a white background
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FF3366', // Romantic tone color
  },
  ideaContainer: {
    backgroundColor: '#FFCCCC', // Light pink background
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  ideaText: {
    fontSize: 18,
    color: '#333', // Dark text color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#FF3366', // Romantic tone button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff', // White button text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IdeaOfTheDayScreen;
