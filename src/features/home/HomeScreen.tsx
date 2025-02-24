import { Text, ScrollView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@state/authStore';
import { tokenStorage } from '@state/storage';
import { navigate } from '@utils/NavigationUtils';

const HomeScreen = () => {
  const { user, logout } = useAuthStore(); // Get user data & logout function
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = () => {
      const storedToken = tokenStorage.getString('accessToken'); // Use getString()
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  // Logout Function
  const handleLogout = () => {
    tokenStorage.delete('accessToken'); // Remove token from storage
    logout(); // Clear user data from zustand store
    navigate("CustomerLogin")
  };

  return (
    <ScrollView style={{ paddingTop: 120 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
        Welcome, {user?.name || 'Guest'}
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 5 }}>User Id: {user?.id || 'N/A'}</Text>
      <Text style={{ fontSize: 16, marginBottom: 5 }}>Email: {user?.email || 'N/A'}</Text>
      <Text style={{ fontSize: 16, marginBottom: 5 }}>Phone: {user?.phone || 'N/A'}</Text>
      <Text style={{ fontSize: 16, marginBottom: 5 }}>Role: {user?.role || 'N/A'}</Text>
      <Text style={{ fontSize: 16, marginBottom: 5 }}>KYC Status: {user?.kyc_status || 'N/A'}</Text>

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Token:</Text>
      <Text style={{ fontSize: 12, color: 'gray' }}>{token || 'No Token Found'}</Text>

      {/* Logout Button */}
      <Button title="Logout" onPress={handleLogout} color="red" />
    </ScrollView>
  );
};

export default HomeScreen;
