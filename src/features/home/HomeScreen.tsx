import {
  Text,
  ScrollView,
  Button,
  View,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAuthStore} from '@state/authStore';
import {tokenStorage} from '@state/storage';
import {navigate} from '@utils/NavigationUtils';
import Geolocation from '@react-native-community/geolocation';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import Header from '@components/homeScreen/Header';
import {Colors} from '@utils/Constants';
import WelcomeText from '@components/homeScreen/WelcomeText';
import Promotion from '@components/homeScreen/Promotion';
import {EventCard} from '@components/homeScreen/EventCard';

const HomeScreen = () => {
  const {user, logout} = useAuthStore();
  const [token, setToken] = useState<string | null>(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('Fetching your location...');
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const fetchToken = () => {
      const storedToken = tokenStorage.getString('accessToken');
      setToken(storedToken);
    };
    fetchToken();

    // Request location permission and get location
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          setLocationError('Location permission denied');
          setAddress('Location access denied');
        }
      } catch (err) {
        console.warn(err);
        setLocationError('Error requesting location permission');
        setAddress('Error accessing location');
      }
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        // Get address from coordinates using reverse geocoding
        fetchAddress(position.coords.latitude, position.coords.longitude);
      },
      error => {
        setLocationError(error.message);
        setAddress('Could not get your location');
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD0Svh7_EkCQypWAEn8aT6aWrYmwetPqgA`,
      );
      const json = await response.json();

      if (json.status === 'OK' && json.results.length > 0) {
        setAddress(json.results[0].formatted_address);
      } else {
        setAddress(
          `Location found (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
        );
      }
    } catch (error) {
      console.error(error);
      setAddress(
        `Location found (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
      );
    }
  };

  // Logout Function
  const handleLogout = () => {
    tokenStorage.delete('accessToken');
    logout();
    navigate('CustomerLogin');
  };

  return (
    <CustomSafeAreaView
      style={{flex: 1, backgroundColor: Colors.primary_light}}>
      <ScrollView>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.primary_light}
        />
        <Header address={address} handleLogout={handleLogout} />

        <View style={styles.content}>
          <WelcomeText message={`Welcome, ${user?.name || 'Guest'}`} />

          <Promotion />

            <View style={styles.sectionHeaderServices}>
              <View style={styles.line} />
              <Text style={styles.sectionHeaderServicesText}>Explore</Text>
              <View style={styles.line} />
            </View>

            {EventCard({
              imagePath: require('../../assets/slider/basic-event.jpeg'),
              title: 'Basic Event',
              subtitle: 'Up to 10 people',
              discountText: 'Content Offer #1',
              description: 'Accomodates Upto 10 People',
              details:
                'Host a cozy game night with board games, snacks, and laughter for 10 friends at your place!',
            })}

            {EventCard({
              imagePath: require('../../assets/slider/large-event.jpeg'),
              title: 'Large Event',
              subtitle: 'More than 10 and Upto 25 people',
              discountText: 'Content Offer #2',
              description: 'Content Subheading Large Event',
              details:
                'Host a cozy game night with board games, snacks, and laughter for 25 friends at your place!',
            })}
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
    textAlign: 'left',
  },
  sectionHeaderText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: Colors.primary,
  },
  sectionHeaderServices: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
    width: '98%',
  },
  sectionHeaderServicesText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: Colors.primary,
    position: 'relative',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.text,
    position: 'relative',
    top: 12,
  },
});

export default HomeScreen;
