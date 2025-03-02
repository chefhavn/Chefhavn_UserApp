import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '@utils/Constants';

const CustomFooter = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Helper function to check active route
  const isRouteActive = (routeName) => {
    return route.name === routeName;
  };

  // Navigation tabs configuration
  const tabs = [
    {
      name: 'Home',
      icon: require('@assets/auth/home.png'),
      onPress: () => navigation.navigate('HomeScreen'),
    },
    {
      name: 'Orders',
      icon: require('@assets/auth/myorder_white.png'),
      onPress: () => navigation.navigate('MyOrderScreen'),
    },
    {
      name: 'Help',
      icon: require('@assets/auth/help-white.png'),
      onPress: () => navigation.navigate('HelpScreen'),
    },
    {
      name: 'Profile',
      icon: require('@assets/auth/profile.png'),
      onPress: () => navigation.navigate('HomeScreen'),
    },
  ];

  return (
    <View style={styles.footerContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.iconContainer}
          onPress={tab.onPress}
          activeOpacity={0.7}
        >
          <Image
            source={tab.icon}
            style={[
              styles.icon,
              isRouteActive(tab.name) ? styles.activeIcon : styles.inactiveIcon,
            ]}
          />
          <Text
            style={[
              styles.iconLabel,
              isRouteActive(tab.name) ? styles.activeLabel : styles.inactiveLabel,
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 80,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    height: 35,
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 5,
  },
  activeIcon: {
    tintColor: Colors.primary,
  },
  inactiveIcon: {
    tintColor: Colors.INACTIVE,
  },
  activeLabel: {
    color: Colors.primary,
  },
  inactiveLabel: {
    color: Colors.INACTIVE,
  },
});

export default CustomFooter;