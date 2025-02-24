import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import {goBack, resetAndNavigate} from '@utils/NavigationUtils';
import CustomButton from '@components/ui/CustomButton';
import {login, sendOtp} from '@service/authServices';
import {Colors} from '@utils/Constants';

const OtpScreen = ({route}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(true);
  const [resendTimer, setResendTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const inputRefs = useRef([]);
  const [selectedInput, setSelectedInput] = useState(null);
  const {email, phoneNumber, loginWithEmail} = route.params;
  const [sentOtp, setSentOtp] = useState(null);

  // Fetch OTP on mount
  useEffect(() => {
    const fetchOtp = async () => {
      try {
        setLoading(false);
        const response = await sendOtp(email, phoneNumber, loginWithEmail);
        setSentOtp(response.otp);

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to send OTP. Please try again.',
        });
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };
    fetchOtp();
  }, [email, phoneNumber, loginWithEmail]);

  // Resend timer countdown
  useEffect(() => {
    if (resendDisabled && resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
    if (resendTimer === 0) {
      setResendDisabled(false);
    }
  }, [resendDisabled, resendTimer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle OTP verification
  const handleOtpVerification = async () => {
    const enteredOtp = otp.join('');
    // setLoading(true);
    if (sentOtp !== enteredOtp) {
      return;
    }

    try {
      const response = await login(email, phoneNumber, loginWithEmail);
      if(response.success){
        resetAndNavigate('HomeScreen')
      }
    } catch (error) {
      console.log("Otp screen",error)
    }
  };

  //   Handle resend OTP
  const handleResendCode = async () => {
    try {
      const response = await sendOtp(email, phoneNumber, loginWithEmail);
      setSentOtp(response.otp);
      //   Toast.show({
      //     type: 'success',
      //     text1: 'Code Sent',
      //     text2: `A new code has been sent to your ${loginWithEmail ? 'Email' : 'Phone Number'
      //       }`,
      //   });

      // Reset the timer and disable the resend button for 30 seconds
      setResendDisabled(true);
      setResendTimer(30);
    } catch (error) {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Error',
      //     text2: 'Failed to resend OTP. Please try again.',
      //   });
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <CustomSafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
            <Image
              source={require('@assets/auth/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>OTP Screen</Text>
        </View>
        {loading ? (
          <>
            {/* <OTPSkeleton /> */}
            <Text>Loading</Text>
          </>
        ) : (
          <View style={styles.mainContainer}>
            <Text style={styles.title}>Enter Confirmation Code</Text>
            <Text style={styles.subTitle}>
              A 4-digit code was sent to your{' '}
              {loginWithEmail ? 'Email' : 'Phone Number'}
              {'\n'}
              {loginWithEmail ? email : phoneNumber}
            </Text>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={[
                    styles.otpInput,
                    selectedInput === index && styles.selectedOtpInput,
                  ]}
                  value={digit}
                  onChangeText={value => handleOtpChange(value, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  ref={ref => (inputRefs.current[index] = ref)}
                  onFocus={() => setSelectedInput(index)}
                  onBlur={() => setSelectedInput(null)}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={handleResendCode}
              disabled={resendDisabled}>
              <Text
                style={[
                  styles.resendText,
                  resendDisabled && styles.disabledResendText,
                ]}>
                {resendDisabled
                  ? `Resend Code (${resendTimer}s)`
                  : 'Resend Code'}
              </Text>
            </TouchableOpacity>

            <CustomButton
              onPress={handleOtpVerification}
              disabled={!isOtpComplete}
              loading={loading}
              title="Continue"
            />
          </View>
        )}
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
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
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
    color: Colors.text,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  subTitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 30,
    fontFamily: 'Montserrat-Regular',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 22,
    margin: 5,
    backgroundColor: '#fff',
    color: Colors.text,
    fontFamily: 'Montserrat-SemiBold',
  },
  selectedOtpInput: {
    borderColor: '#503A73',
    borderWidth: 2,
  },
  resendText: {
    color: '#503A73',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Regular',
  },
  disabledResendText: {
    color: '#999',
  },
  button: {
    backgroundColor: '#503A73',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingBackdrop: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  disabledButton: {
    backgroundColor: Colors.primary_light,
  },
});

export default OtpScreen;
