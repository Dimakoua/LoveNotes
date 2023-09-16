import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import BackButton from '../components/BackButton';
import { useIdea } from '../services/IdeaGenerator';

const IdeaListScreen = () => {
  const { t } = useTranslation();
  const { getIdeas, saveIdeas } = useIdea();

  const [ideas, setIdeas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [newIdeaText, setNewIdeaText] = useState('');

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    const storedIdeas = await getIdeas();
    setIdeas(storedIdeas);
  };

  const addIdea = () => {
    if (newIdeaText) {
      const updatedIdeas = [...ideas, { id: Date.now(), text: newIdeaText, key: newIdeaText, done: false, like: false }];
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
      <View style={styles.backButton}>
        <BackButton />
      </View>
      <Text style={styles.header}>{t('my_ideas')}</Text>
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
            <Text style={styles.ideaText}>{t(item.key)}</Text>
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
          <Text style={styles.buttonText}>+</Text>
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
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={selectedIdea ? editIdea : addIdea}
              >
                <Text style={styles.modalButtonText}>
                  {selectedIdea ? 'Save' : 'Add'}
                </Text>
              </TouchableOpacity>
              {selectedIdea && (
                <TouchableOpacity
                  style={[styles.modalButton, styles.deleteButton]}
                  onPress={deleteIdea}
                >
                  <Text style={styles.modalButtonText}>{t('Delete')}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.modalButton, styles.closeButton]}
                onPress={() => {
                  setModalVisible(false);
                  setSelectedIdea(null);
                  setNewIdeaText('');
                }}
              >
                <Text style={styles.modalButtonText}>{t('Close')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(253, 246, 238, 0.7)', // Same background color as SettingsScreen
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
    color: 'rgb(222, 178, 150)', // Same header color as SettingsScreen
  },
  ideaContainer: {
    backgroundColor: 'rgba(255, 204, 204, 0.7)', // Same background color as SettingsScreen
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  ideaText: {
    fontSize: 18,
    color: 'rgb(51, 51, 51)', // Same text color as SettingsScreen
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  addButton: {
    backgroundColor: 'rgb(222, 178, 150)', // Same button background color as SettingsScreen
    width: 54, // Set a fixed width and height to make it circular
    height: 54,
    borderRadius: 32, // Half of the width/height to create a circle
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    position: 'absolute', // Position it absolutely
    bottom: 16, // Adjust the bottom position for spacing
    right: 16, // Adjust the left position for spacing
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },



  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '90%', // Adjust the width as needed
    backgroundColor: 'white', // White modal background
    borderRadius: 8,
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 16,
    borderColor: '#ddd', // Light gray border color
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  saveButton: {
    backgroundColor: 'rgb(222, 178, 150)', // Save button background color
  },
  deleteButton: {
    backgroundColor: '#FF5A5F', // Delete button background color
  },
  closeButton: {
    backgroundColor: 'gray', // Close button background color
  },
});


export default IdeaListScreen;
