import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Animated } from 'react-native';
import { useIdea } from '../services/IdeaGenerator';
import { useTranslation } from "react-i18next";
import SquareBlockWithArrows from '../components/SquareBlockWithArrows';
import { PanGestureHandler } from 'react-native-gesture-handler';

const IdeaOfTheDayScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { idea, nextIdea, prevIdea, like } = useIdea();

  const [tapCount, setTapCount] = useState(0); // Лічильник тапів
  const [tapTimer, setTapTimer] = useState(null); // Таймер для тапів
  const [showLikeMessage, setShowLikeMessage] = useState(false); // State to control the like message

  const selectImage = () => {
    return require('../../assets/images/6.png');
  };

  let offsetX = 0; // Зберігаємо змінну для відстеження руху вправо та вліво

  const onSwipeEvent = (event) => {
    offsetX = event.nativeEvent.translationX;
  };

  const onSwipeEnd = (event) => {
    if (offsetX > 50) {
      console.log("PREV")
      prevIdea();
    } else if (offsetX < -50) {
      console.log("EKEKEKEK")
      nextIdea();
    }

    if (offsetX < 5) {
      handleTap();
    }
    offsetX = 0;
  };

  // Create an animated value
  const likeOpacity = new Animated.Value(0); // Initialize with 0 opacity
  const likeScale = new Animated.Value(0.5); // Initialize with 0 scale
  // Function to show the like message
  const showLike = () => {
    setShowLikeMessage(true);

    // Animate the like image opacity
    Animated.timing(likeOpacity, {
      toValue: 1, // Animate to full opacity
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: true, // Use native driver for performance
    }).start(); // Start the animation

    // Scale animation
    Animated.sequence([
      Animated.timing(likeScale, {
        toValue: 1, // Scale to 100% (original size)
        duration: 2000, // Animation duration in milliseconds
        useNativeDriver: true,
      }),
      Animated.timing(likeOpacity, {
        toValue: 0, // Scale back to 0% (hidden)
        duration: 200, // Animation duration in milliseconds
        useNativeDriver: true,
        delay: 1500, // Delay before hiding
      }),
    ]).start(() => { });

    // Hide the like message and reset opacity after 2 seconds
    setTimeout(() => {
      setShowLikeMessage(false);
      likeOpacity.setValue(0); // Reset opacity
    }, 2000);
  };

  const handleTap = () => {
    setTapCount(tapCount + 1);

    setTapTimer(
      setTimeout(() => {
      if (tapCount === 2) {
          showLike();
          like(idea);
        }
        setTapCount(0);
        clearTimeout(tapTimer);
      }, 300) // Визначте власний інтервал між тапами (наприклад, 300 мс)
    );
  };
  return (
    <View>
      <ImageBackground
        source={selectImage()} // Provide the correct path to your image
        style={styles.image}
        resizeMode="cover"
      >
        {showLikeMessage && (
          <View style={styles.likeMessage}>
            <Image source={require('../../assets/images/icons8-like-96.png')} style={styles.likeImage} />
          </View>
        )}
        <PanGestureHandler
          onGestureEvent={onSwipeEvent}
          onHandlerStateChange={onSwipeEnd}
        >
          <View style={styles.container}>
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
          </View>
        </PanGestureHandler>
      </ImageBackground>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(253, 246, 238)',
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
    paddingBottom: '5%',
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
  likeMessage: {
    position: 'absolute',
    bottom: '50%',
    right: '50%',
    transform: [{ translateX: 75 }, { translateY: 75 }],
    borderRadius: 8,
    padding: 10,
  },
  likeImage: {
    width: 150,
    height: 150
  },
});

export default IdeaOfTheDayScreen;
