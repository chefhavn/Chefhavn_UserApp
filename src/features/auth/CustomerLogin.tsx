import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';

const CustomerLogin = () => {
  return (
    <View style={styles.container}>
      <Text>CustomerLogin</Text>
      <CustomSafeAreaView>
        <Text>Hello</Text>
      </CustomSafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomerLogin;
