import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';

import { Colors } from '@utils/Constants';
import { useAuthStore } from '@state/authStore';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import CustomText from '@components/ui/CustomText';

export default function MapScreen({ navigation, route }) {
  const {user} = useAuthStore()
  const { addressToEdit } = route.params || {};
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationName, setLocationName] = useState("Selected Location")
  const [region, setRegion] = useState({
    latitude: addressToEdit?.latitude || 17.4065,
    longitude: addressToEdit?.longitude || 78.4772,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
    name: addressToEdit?.name || '',
    address: addressToEdit?.address || '',
  });

  const [flatNo, setFlatNo] = useState(addressToEdit?.flat || '');
  const [nearbyLandmark, setNearbyLandmark] = useState(addressToEdit?.landmark || '');
  const [areaLocality, setAreaLocality] = useState(addressToEdit?.area || '');
  const [addressType, setAddressType] = useState(addressToEdit?.type || 'Home');
  const [searchInput, setSearchInput] = useState('');
  const [showGpsIcon, setShowGpsIcon] = useState(true);
  const [otherName, setOtherName] = useState(addressToEdit?.otherName || '');




  const handleSelectLocation = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    setRegion({
      ...region,
      latitude,
      longitude,
    });
  };

  const resetAddressFields = () => {
    setFlatNo('');
    setNearbyLandmark('');
    setAreaLocality('');
    setOtherName('');
    setAddressType('Home');
    navigation.navigate('SelectLocation');
  };

  useEffect(() => {
    setShowGpsIcon(searchInput.trim() === '');
  }, [searchInput]);


  return (
    <CustomSafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('@assets/auth/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <CustomText style={styles.screenTitle}>{addressToEdit ? 'Edit Address' : 'Select Address'}</CustomText>
        </View>

<CustomText style={{paddingVertical: 20, textAlign: 'center'}}>Still Working on this page</CustomText>

            <MapView
              style={styles.map}
              onPress={handleSelectLocation}
              provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
              showsUserLocation
              region={region}>
              {selectedLocation && (
                <Marker
                  title={locationName}
                  coordinate={selectedLocation}
                  draggable
                />
              )}
            </MapView>


      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  screenTitle: {
    color: Colors.BLACK,
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
  },

});