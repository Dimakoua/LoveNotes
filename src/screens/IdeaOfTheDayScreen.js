import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useIdea } from '../services/IdeaGenerator';
import { useTranslation } from "react-i18next";
import SquareBlockWithArrows from '../components/SquareBlockWithArrows ';

const IdeaOfTheDayScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { idea, nextIdea, prevIdea } = useIdea();

  const selectImage = () => {
    return require('../../assets/images/6.png');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={selectImage()} // Provide the correct path to your image
        style={styles.image}
        resizeMode="cover"
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={prevIdea}
          >
            <SquareBlockWithArrows />
          </TouchableOpacity>
          <View style={styles.ideaContainer}>
            <Text style={styles.ideaText}>{idea}</Text>
          </View>
          <TouchableOpacity
            onPress={nextIdea}
          >
            <SquareBlockWithArrows />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(253, 246, 238, 0.7)',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ideaContainer: {
    // backgroundColor: 'rgba(255, 204, 204, 0.7)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '60%',
    maxHeight: 200,
  },
  ideaText: {
    fontSize: 18,
    color: '#333',
  },
  buttonContainer: {
    paddingLeft: '3%',
    paddingRight: '3%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 120,
    maxHeight: 200,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IdeaOfTheDayScreen;
