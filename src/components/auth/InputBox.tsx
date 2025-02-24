import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CustomInput from '@components/ui/CustomInput';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts} from '@utils/Constants';
import CustomButton from '@components/ui/CustomButton';

interface InputBoxProps {
  loginWithEmail: boolean;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  handleSubmit: () => void;
  loading: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({
  loginWithEmail,
  setPhoneNumber,
  phoneNumber,
  email,
  setEmail,
  handleSubmit,
  loading,
}) => {
  return (
    <View>
      <Text style={styles.title}>Login/Signup</Text>
      {!loginWithEmail ? (
        <View style={styles.phoneContainer}>
          <CustomInput
            onChangeText={text => {
              const cleaned = text.replace(/[^0-9]/g, '');
              setPhoneNumber(cleaned);
            }}
            onClear={() => setPhoneNumber('')}
            placeholder="Phone Number"
            value={phoneNumber}
            inputMode="numeric"
            left={
              <View style={styles.flagContainer}>
                <Image
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png',
                  }}
                  style={styles.flag}
                />
                <CustomText fontFamily={Fonts.SemiBold} variant="h6">
                  +91
                </CustomText>
              </View>
            }
            maxLength={10}
          />
        </View>
      ) : (
        <CustomInput
          onChangeText={text => setEmail(text)}
          inputMode="email"
          onClear={() => setEmail('')}
          placeholder="Email"
          value={email}
        />
      )}

      <CustomButton
        onPress={handleSubmit}
        disabled={loading}
        loading={loading}
        title="Continue"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: '#111',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    color: Colors.text,
    fontSize: 16,
  },
  phoneNumberInput: {
    height: 50,
    color: Colors.text,
    fontSize: 16,
    letterSpacing: 1,
    flex: 1,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    height: 50,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 5,
  },
  countryCode: {
    fontSize: 16,
    color: Colors.text,
    letterSpacing: 0,
  },
});

export default InputBox;
