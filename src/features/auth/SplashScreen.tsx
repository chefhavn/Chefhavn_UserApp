import {View, StyleSheet, Image} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Colors} from '@utils/Constants';
import {screenHeight, screenWidth} from '@utils/Scaling';
import Logo from '@assets/images/logo.png';
import {navigate} from '@utils/NavigationUtils';

const SplashScreen: FC = () => {
  const navigateUser = async () => {
    navigate('GettingStarted');
  };

  useEffect(() => {
    const timeoutId = setTimeout(navigateUser, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logoImage} source={Logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
