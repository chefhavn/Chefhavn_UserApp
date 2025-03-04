import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '@utils/Constants';
import {useAuthStore} from '@state/authStore';
import {deleteAccount} from '@service/authServices';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import CustomFooter from '@components/global/CustomFooter';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('Guest');
  const [email, setEmail] = useState('');
  const {user, logout} = useAuthStore();

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            logout();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              if (user?.id) {
                await deleteAccount(user.id);
                logout();
                console.log('Account deleted successfully');
              } else {
                console.error('User data not found.');
              }
            } catch (error) {
              console.error('Error during account deletion:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <CustomSafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image
              source={require('@assets/auth/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Profile</Text>
        </View>

        <>
          {user && user?.id && (
            <>
              <View style={styles.profileContainer}>
                <View style={styles.profileHeader}>
                  <Image
                    source={require('@assets/icons-new/836.png')}
                    style={styles.profileImage}
                  />
                </View>
                <View style={styles.userText}>
                  <Text style={styles.userName}>{name ? name : 'Guest'}</Text>

                  <Text style={styles.userEmail}>{email}</Text>
                  <TouchableOpacity
                    style={styles.editProfileButton}
                    >
                    <Text style={styles.editProfileText}>Edit profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
          <View style={styles.menuListContainer}>
            {user && user?.token && (
              <>
                <TouchableOpacity
                  style={styles.menuItem}
                  >
                  <View style={styles.menuContent}>
                    <Image
                      source={require('@assets/icons-new/event.png')}
                      style={styles.menuIcon}
                    />
                    <Text style={styles.menuText}>Settings</Text>
                  </View>
                  <Image
                    source={require('@assets/icons-new/event.png')}
                    style={styles.forwardIcon}
                  />
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={styles.menuItem}
              >
              <View style={styles.menuContent}>
                <Image
                  source={require('@assets/icons-new/event.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>About</Text>
              </View>
              <Image
                source={require('@assets/icons-new/event.png')}
                style={styles.forwardIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              >
              <View style={styles.menuContent}>
                <Image
                  source={require('@assets/icons-new/event.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Terms and Conditions</Text>
              </View>
              <Image
                source={require('@assets/icons-new/event.png')}
                style={styles.forwardIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              >
              <View style={styles.menuContent}>
                <Image
                  source={require('@assets/icons-new/event.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Privacy Policy</Text>
              </View>
              <Image
                source={require('@assets/icons-new/event.png')}
                style={styles.forwardIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              >
              <View style={styles.menuContent}>
                <Image
                  source={require('@assets/icons-new/event.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Help</Text>
              </View>
              <Image
                source={require('@assets/icons-new/event.png')}
                style={styles.forwardIcon}
              />
            </TouchableOpacity>

            {/* onPress={() => navigation.navigate('ReportSafetyIssue')} */}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuContent}>
                <Image
                  source={require('@assets/icons-new/event.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Report a Safety Issue</Text>
              </View>
              <Image
                source={require('@assets/icons-new/event.png')}
                style={styles.forwardIcon}
              />
            </TouchableOpacity>

            {/* onPress={handleOpenPlayStore} */}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuContent}>
                <Image
                  source={require('@assets/icons-new/event.png')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Earn by Cooking</Text>
              </View>
              <Image
                source={require('@assets/icons-new/filter.png')}
                style={styles.forwardIcon}
              />
            </TouchableOpacity>

            {user && user?.id && (
              <>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={handleDeleteAccount}>
                  <View style={styles.menuContent}>
                    <Image
                      source={require('@assets/icons-new/logout.png')}
                      style={styles.menuIcon}
                    />
                    <Text style={styles.logoutText}>Delete Account</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}

            {user && user?.id ? (
              <>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={handleLogout}>
                  <View style={styles.menuContent}>
                    <Image
                      source={require('@assets/icons-new/logout.png')}
                      style={styles.menuIcon}
                    />
                    <Text style={styles.logoutText}>Logout</Text>
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.menuItem}
                  >
                  <View style={styles.menuContent}>
                    <Text style={styles.logoutText}>Login / Register</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </>
      </ScrollView>
      {/* <CustomFooter /> */}
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    fontFamily: 'Montserrat-Regular',
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginLeft: 10,
    fontFamily: 'Montserrat-Regular',
  },
  profileContainer: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: 'row',
    gap: 20,
  },
  profileHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userText: {
    flex: 1,
    justifyContent: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  userName: {
    fontSize: 24,
    color: Colors.BLACK,
    marginVertical: 2,
    fontFamily: 'Montserrat-Bold',
  },
  userEmail: {
    fontSize: 16,
    color: Colors.BLACK,
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    padding: 5,
    alignSelf: 'flex-start', // Makes the width inline with the content
    borderRadius: 4, // Optional: for rounded corners
  },

  editProfileText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular',
  },
  menuListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
  },
  logoutText: {
    fontSize: 16,
    color: Colors.RED,
    fontFamily: 'Montserrat-Regular',
  },
  forwardIcon: {
    width: 20,
    height: 20,
  },
  logOutButton: {
    backgroundColor: Colors.PRIMARY,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  logOutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
});
