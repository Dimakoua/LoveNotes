import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ideas as list } from '../ideas/list';

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
  addButton: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff', // White modal background
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 16,
    borderColor: '#ddd', // Light gray border color
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
  },
});

const IdeasScreen = () => {
  const [ideas, setIdeas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [newIdeaText, setNewIdeaText] = useState('');

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      const storedIdeas = await AsyncStorage.getItem('ideas');
      if (storedIdeas !== null) {
        setIdeas(JSON.parse(storedIdeas));
      } else {
        setIdeas(list);
      }
    } catch (error) {
      console.error('Error loading ideas:', error);
    }
  };

  const saveIdeas = async (updatedIdeas) => {
    try {
      await AsyncStorage.setItem('ideas', JSON.stringify(updatedIdeas));
    } catch (error) {
      console.error('Error saving ideas:', error);
    }
  };

  const addIdea = () => {
    if (newIdeaText) {
      const updatedIdeas = [...ideas, { id: Date.now(), text: newIdeaText }];
      setIdeas(updatedIdeas);
      saveIdeas(updatedIdeas);
      setNewIdeaText('');
      setModalVisible(false);
    }
  };

  const editIdea = () => {
    if (selectedIdea && newIdeaText) {
      const updatedIdeas = ideas.map((idea) =>
        idea.id === selectedIdea.id
          ? { ...idea, text: newIdeaText }
          : idea
      );
      setIdeas(updatedIdeas);
      saveIdeas(updatedIdeas);
      setNewIdeaText('');
      setModalVisible(false);
    }
  };

  const deleteIdea = () => {
    if (selectedIdea) {
      const updatedIdeas = ideas.filter(
        (idea) => idea.id !== selectedIdea.id
      );
      setIdeas(updatedIdeas);
      saveIdeas(updatedIdeas);
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Ideas</Text>
      <FlatList
        data={ideas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.ideaContainer}
            onPress={() => {
              setSelectedIdea(item);
              setNewIdeaText(item.text);
              setModalVisible(true);
            }}
          >
            <Text style={styles.ideaText}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setSelectedIdea(null);
            setNewIdeaText('');
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>+ Add Idea</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Idea"
              onChangeText={(text) => setNewIdeaText(text)}
              value={newIdeaText}
              multiline={true}
            />
            <View style={styles.buttonContainer}>
              <Button
                title={selectedIdea ? "Save" : "Add"}
                onPress={selectedIdea ? editIdea : addIdea}
              />
              {selectedIdea && (
                <Button
                  title="Delete"
                  onPress={deleteIdea}
                  color="#FF5A5F" // Use the secondary color
                />
              )}
            </View>
            <Button
              title="Close"
              onPress={() => {
                setModalVisible(false);
                setSelectedIdea(null);
                setNewIdeaText('');
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default IdeasScreen;
