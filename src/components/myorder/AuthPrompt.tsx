import { useAuthStore } from '@state/authStore';
import { Colors } from '@utils/Constants';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const AuthPrompt = () => {
    const {logout} = useAuthStore();

  const handleAuthNavigation = () => {
    logout();
  };

  return (
    <View>
      <Text style={styles.infoText}>
        Please login or sign up to select an address or book a chef.
      </Text>

      <TouchableOpacity
        style={styles.authButton}
        onPress={handleAuthNavigation}>
        <Text style={styles.authButtonText}>Go to Login / Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  authButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AuthPrompt;
