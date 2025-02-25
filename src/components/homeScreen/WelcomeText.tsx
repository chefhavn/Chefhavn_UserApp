import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts} from '@utils/Constants';

interface MessageProps {
  message?: string;
}

const WelcomeText: FC<MessageProps> = ({message}) => {
  return (
    <View style={styles.container}>
      <CustomText
        fontFamily={Fonts.Bold}
        fontSize={17}
        variant="h1"
        style={{color: Colors.primary}}>
        {message}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
});

export default WelcomeText;
