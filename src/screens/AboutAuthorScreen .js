import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import BackButton from '../components/BackButton';

const AboutAuthorScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.authorName}>John Doe</Text>
      <Text style={styles.authorBio}>{t('author_bio')}</Text>
      <Text style={styles.contactInfo}>{t('author_contact_info')} kodim.developer@gmail.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(253, 246, 238, 0.7)',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  authorName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgb(222, 178, 150)',
  },
  authorBio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 204, 204, 0.7)',
  },
  contactInfo: {
    fontSize: 14,
    color: 'blue',
  },
});

export default AboutAuthorScreen;
