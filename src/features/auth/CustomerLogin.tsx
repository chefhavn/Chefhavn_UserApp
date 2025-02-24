import React, {useState, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Animated,
  Keyboard,
} from 'react-native';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import {navigate} from '@utils/NavigationUtils';
import LoginHeader from '@components/auth/LoginHeader';
import InputBox from '@components/auth/InputBox';
import SocialLogin from '@components/auth/SocialLogin';

const CustomerLogin = () => {
  const [loading, setLoading] = useState(false);
  const [loadingGuest, setLoadingGuest] = useState(false);
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const animatedValue = useRef(new Animated.Value(0)).current;
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  useEffect(() => {
    if (keyboardOffsetHeight === 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [animatedValue, keyboardOffsetHeight]);

  const handleSubmit = () => {
    if (loginWithEmail) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailPattern.test(email)) {
        return;
      }
    } else {
      if (!phoneNumber || phoneNumber.length !== 10) {
        return;
      }
    }

    setPhoneNumber('');
    setEmail('');
    Keyboard.dismiss();
    navigate('OtpScreen', {email, phoneNumber, loginWithEmail});
  };

  const toggleLoginMethod = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToggling(true);
    setTimeout(() => {
      setLoginWithEmail(!loginWithEmail);
      setToggling(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <View>
          {toggling ? (
            <View style={[styles.loadingContainer]}>
              <ActivityIndicator size="large" color="#503A73" />
            </View>
          ) : (
            <>
              <LoginHeader loadingGuest={loadingGuest} />

              <Animated.ScrollView
                bounces={false}
                keyboardDismissMode="on-drag"
                style={{transform: [{translateY: animatedValue}]}}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled">
                <CustomSafeAreaView>
                  <View style={styles.bottomSection}>
                    <InputBox
                      loginWithEmail={loginWithEmail}
                      setPhoneNumber={setPhoneNumber}
                      phoneNumber={phoneNumber}
                      email={email}
                      setEmail={setEmail}
                      handleSubmit={handleSubmit}
                      loading={loading}
                    />

                    <SocialLogin
                      loginWithEmail={loginWithEmail}
                      toggleLoginMethod={toggleLoginMethod}
                    />
                  </View>
                </CustomSafeAreaView>
              </Animated.ScrollView>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 20,
  },
});

export default CustomerLogin;
