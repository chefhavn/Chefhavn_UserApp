import CustomFooter from '@components/global/CustomFooter';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

const HelpScreen = ({ navigation, route }) => {
  const { source } = route.params || {};
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleBackPress = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  const handleMailPress = () => {
    const email = 'mailto:support@chefhavn.com?subject=Support%20Request&body=Hi%20Team,';
    Linking.openURL(email).catch((err) =>
      Alert.alert('Error', 'Unable to open email client.')
    );
  };

  const handleCallPress = () => {
    const phone = 'tel:9281040332';
    Linking.openURL(phone).catch((err) =>
      Alert.alert('Error', 'Unable to make the call.')
    );
  };

  return (
    <CustomSafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Image
              source={require('@assets/auth/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <CustomText style={styles.screenTitle}>Help</CustomText>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <CustomText fontFamily={Fonts.SemiBold} style={styles.bannerText}>
            Need Assistance? We’re here to help!
          </CustomText>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Mail Us Card */}
          <TouchableOpacity style={styles.card} onPress={handleMailPress}>
            <Image
              source={require('@assets/auth/mail-50x50.png')} // Replace with your 30x30 px icon
              style={styles.icon}
            />
            <View style={styles.cardTextContainer}>
              <CustomText style={styles.cardTitle}>Mail Us</CustomText>
              <CustomText style={styles.cardSubTitle}>
                Reach out to us via email for any queries or support.
              </CustomText>
            </View>
          </TouchableOpacity>

          {/* Call Us Card */}
          <TouchableOpacity style={styles.card} onPress={handleCallPress}>
            <Image
              source={require('@assets/auth/call.png')} // Replace with your 30x30 px icon
              style={styles.icon}
            />
            <View style={styles.cardTextContainer}>
              <CustomText style={styles.cardTitle}>Call Us</CustomText>
              <CustomText style={styles.cardSubTitle}>
                Contact us directly for immediate assistance.
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* <CustomFooter/> */}
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  screenTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: Colors.text,
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  bannerText: {
    fontSize: 20,
    color: Colors.text,
    paddingHorizontal: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  cardSubTitle: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
  },
});

export default HelpScreen;
