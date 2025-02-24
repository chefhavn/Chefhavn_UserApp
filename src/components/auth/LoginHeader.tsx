import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import {screenHeight} from '@utils/Scaling';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';

interface LoginHeaderProps {
  loadingGuest: boolean;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({loadingGuest}) => {
  return (
    <View style={styles.topSection}>
      <Pressable
        style={styles.guestButton}
        onPress={() => {}}
        disabled={loadingGuest}>
        {loadingGuest ? (
          <ActivityIndicator color="#503A73" />
        ) : (
          <CustomText
            fontFamily={Fonts.SemiBold}
            variant="h6"
            style={styles.linkTextGuest}>
            Skip
          </CustomText>
        )}
      </Pressable>
      <View style={styles.logoImageContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logoImageContainerImg}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    width: '100%',
    height: screenHeight * 0.4,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  guestButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    fontWeight: 'bold',
    zIndex: 1,
  },
  linkTextGuest: {
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    paddingTop: 3,
    paddingBottom: 3,
    paddingHorizontal: 12,
    borderRadius: 17,
  },
  logoImageContainer: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#503a73',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImageContainerImg: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
});

export default LoginHeader;
