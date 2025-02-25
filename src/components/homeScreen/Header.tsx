import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';

// Define the interface for props
interface HeaderProps {
  address?: string;
  handleLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({address, handleLogout}) => {
  const getLocationParts = (fullAddress: string) => {
    if (!fullAddress) return {primary: 'Select Address', sub: ''};

    const parts = fullAddress.split(',');
    return {
      primary: parts[0]?.trim() || 'Select Address',
      sub: parts.slice(1).join(',').trim() || '',
    };
  };

  const {primary, sub} = getLocationParts(address || '');

  const confirmLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Yes', onPress: handleLogout},
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.header}>
      <View style={styles.locationContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/auth/location.png')}
            style={styles.locationIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <CustomText fontFamily={Fonts.Bold} style={styles.locationText}>
            {primary}
          </CustomText>
          {sub ? (
            <CustomText
              fontFamily={Fonts.SemiBold}
              style={styles.subLocationText}>
              {sub}
            </CustomText>
          ) : null}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={confirmLogout}>
        <Image
          source={require('../../assets/auth/notifications.png')}
          style={styles.notificationIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary_light,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  locationText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: 'bold',
  },
  subLocationText: {
    fontSize: 14,
    color: Colors.text,
  },
});

export default Header;
