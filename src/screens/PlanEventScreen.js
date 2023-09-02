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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FF3366',
    textAlign: 'center',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginRight: 8,
  },
  selectedDate: {
    fontSize: 18,
    color: '#333',
  },
  notesInput: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  planEventButton: {
    backgroundColor: '#FF3366',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  generateLinkButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PlanEventScreen;
