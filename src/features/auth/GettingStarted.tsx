import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts} from '@utils/Constants';
import {navigate} from '@utils/NavigationUtils';
import {screenHeight} from '@utils/Scaling';
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const GettingStarted = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/onboarding.jpeg')}
          style={styles.image}
        />
      </View>
      <CustomSafeAreaView>
        <View style={styles.textContainer}>
          <CustomText
            style={styles.heading}
            fontSize={22}
            fontFamily={Fonts.Bold}>
            ChefHavn
          </CustomText>
          <CustomText style={styles.subheading} fontSize={13}>
            Continue to experience our app
          </CustomText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('CustomerLogin')}>
            <CustomText style={styles.buttonText} fontFamily={Fonts.SemiBold}>
              Get Started
            </CustomText>
          </TouchableOpacity>
        </View>
      </CustomSafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    height: screenHeight * 0.65,
    borderBottomRightRadius: 60,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    marginBottom: 10,
    width: '100%',
  },
  subheading: {
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    height: 70,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default GettingStarted;
