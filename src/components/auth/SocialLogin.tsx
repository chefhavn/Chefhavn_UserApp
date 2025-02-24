import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  Linking,
} from 'react-native';
import React from 'react';
import CustomText from '@components/ui/CustomText';

interface SocialLoginProps {
  toggleLoginMethod: () => void;
  loginWithEmail: boolean;
}

const SocialLogin: React.FC<SocialLoginProps> = ({
  toggleLoginMethod,
  loginWithEmail,
}) => {
  return (
    <View>
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <CustomText style={styles.separatorText}>Or continue with</CustomText>
        <View style={styles.separator} />
      </View>

      <View style={styles.socialButtonsContainer}>
        {/* Email or Phone Toggle Button */}
        <Pressable
          style={[styles.socialButton, styles.googleButton]}
          onPress={toggleLoginMethod}>
          {loginWithEmail ? (
            <Image
              source={require('../../assets/auth/call.png')}
              style={styles.googleIcon}
            />
          ) : (
            <Image
              source={require('../../assets/auth/mail-50x50.png')}
              style={styles.googleIcon}
            />
          )}
        </Pressable>

        {/* Google Login Button */}
        <Pressable
          style={[styles.socialButton, styles.googleButton]}>
          <Image
            source={require('../../assets/auth/Google-50x50.png')}
            style={styles.googleIcon}
          />
        </Pressable>

        {/* Apple Login Button (Only for iOS) */}
        {Platform.OS === 'ios' && (
          <Pressable style={[styles.socialButton, styles.appleButton]}>
            <Image
              source={require('../../assets/auth/Apple-logo.png')}
              style={styles.googleIcon}
            />
          </Pressable>
        )}
      </View>

      {/* Terms and Privacy Policy */}
      <CustomText style={styles.termsText}>
        By logging in you agree to our{' '}
        <CustomText
          style={[styles.termsText, styles.link]} // Apply both styles properly
          onPress={() =>
            Linking.openURL('https://chefhavn.com/terms-condition')
          }>
          terms
        </CustomText>{' '}
        and{' '}
        <CustomText
          style={[styles.termsText, styles.link]}
          onPress={() =>
            Linking.openURL('https://chefhavn.com/privacy-policy')
          }>
          privacy policy
        </CustomText>
        .
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#111',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6a4d99',
    borderRadius: 50,
  },
  appleButton: {
    backgroundColor: '#000',
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  termsText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#111',
  },
  link: {
    color: '#503A73',
    textDecorationLine: 'underline',
  },
});

export default SocialLogin;
