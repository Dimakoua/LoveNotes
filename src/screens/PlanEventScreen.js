import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const Colors = {
  primary: '#FF3366', // Romantic tone color
  secondary: '#007AFF', // Blue
  background: '#fff', // White background
  text: '#333', // Dark text color
  inputBorder: '#ccc', // Light gray border color
};

const PlanEventScreen = ({ route }) => {
  const { idea } = route.params;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const generateGoogleCalendarLink = () => {
    const eventTitle = `Plan: ${idea}`;
    const startDate = selectedDate.toISOString();
    const endDate = new Date(selectedDate.getTime() + 2 * 60 * 60 * 1000).toISOString(); // End time is 2 hours later
    const eventDescription = notes;
    const eventLocation = 'Your Location';

    const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventTitle
    )}&dates=${encodeURIComponent(startDate)}/${encodeURIComponent(
      endDate
    )}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(
      eventLocation
    )}`;

    // Open the link in the default browser
    Linking.openURL(googleCalendarLink);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Plan Event: {idea}</Text>
      <TouchableOpacity
        style={styles.datePickerContainer}
        onPress={() => setIsDatePickerVisible(true)}
      >
        <Text style={styles.label}>Select Date:</Text>
        <Text style={styles.selectedDate}>
          {selectedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DatePicker
          modal
          open={isDatePickerVisible}
          date={selectedDate}
          onConfirm={(date) => {
            setSelectedDate(date);
            setIsDatePickerVisible(false);
          }}
          onCancel={() => setIsDatePickerVisible(false)}
          androidVariant="nativeAndroid"
        />
      )}
      <TextInput
        style={styles.notesInput}
        placeholder="Notes"
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setNotes(text)}
        placeholderTextColor={Colors.text}
      />
      <TouchableOpacity
        style={styles.generateLinkButton}
        onPress={generateGoogleCalendarLink}
      >
        <Text style={styles.buttonText}>Generate Google Calendar Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.primary,
    textAlign: 'center',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 20,
    marginRight: 8,
    color: Colors.primary,
  },
  selectedDate: {
    fontSize: 20,
    color: Colors.text,
  },
  notesInput: {
    width: '100%',
    height: 120,
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    marginBottom: 24,
    paddingLeft: 8,
    color: Colors.text,
  },
  generateLinkButton: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default PlanEventScreen;
