import {FC, ReactNode} from 'react';
import {StyleSheet, ViewStyle, View, SafeAreaView} from 'react-native';

interface CustomSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({children, style}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default CustomSafeAreaView;
