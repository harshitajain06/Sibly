import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch user information here, such as username from email
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userEmail = auth.currentUser.email;
        // Extract username from email (assuming email format is 'username@example.com')
        const username = userEmail.substring(0, userEmail.indexOf('@'));
        setUserName(username);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('index'); // Navigate back to the Welcome screen after logout
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const handleCreateSibly = () => {
    // Navigate to the Create Sibly screen
    navigation.navigate('ChatSibly');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Sibly!</Text>
      <Text style={styles.greeting}>Hello, {userName}!</Text>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateSibly}>
        <Text style={styles.buttonText}>Chat with Sibly</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    marginBottom: 30,
  },
  createButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
