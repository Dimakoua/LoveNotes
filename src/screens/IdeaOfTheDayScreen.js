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

        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")} // Замініть на потрібний екран налаштувань
          style={styles.settingsButton}
        >
          <Image source={require('../../assets/images/icons-settings-64.png')} style={styles.settingsButtonImage} />
        </TouchableOpacity>

        {idea ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={prevIdea}
            >
              <SquareBlockWithArrows />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ideaContainer}
              onPress={() => navigation.navigate("ideaDetails", { idea: idea })}
            >
              <Text style={styles.ideaText}>{t(idea.key)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={nextIdea}
            >
              <SquareBlockWithArrows />
            </TouchableOpacity>
          </View>
        ) : null}

      </ImageBackground>
    </View >
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
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  settingsButtonImage: {
    width: 35,
    height: 35
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
    fontSize: 15,
    color: 'rgb(222, 178, 150)',
    textAlign: 'center'
  },
  buttonContainer: {
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingBottom: '3%',
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
