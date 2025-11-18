import {
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

// import {tweets} from '../../data/tweets';
// import {Tweet} from '../../components/Tweet';
import {useNavigation} from '@react-navigation/native';
// import {useEffect, useLayoutEffect, useState} from 'react';
// import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
// import LinearGradient from 'react-native-linear-gradient';
// import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
// import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'pinar';
// import {_signinWithGoogle} from '../../config/firebase/GoogleSignIn';
import React, {useContext} from 'react';
import {GlobalContext} from '../../context';
import { Button } from '../../appComponents/Button/Button';
import { COLORS, FONTS, RH, RW, SIZES } from '../../theme';
import { Icons } from '../../theme/assets';
export const SignInScreen = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    // handle the case where context is null
    throw new Error('GlobalContext must be used within a GlobalState provider');
  }

  // const {setCurrentUserName, setCurrentUser, setCurrentUserPhoto} = context;

  const navigation = useNavigation();

  const signInWithGoogle = async () => {
    // const data = await _signinWithGoogle();

    // if (!data) {
    //   console.log(
    //     '<==================================No Data From Google :Error==================================>',
    //   );
    //   return;
    // }

    // console.log(
    //   'Successfully signed using google sign in================================================>',
    //   data,
    // );

    // if (data?.idToken) {
    //   const {user} = data;
    //   console.log('user===>', user);
    //   setCurrentUserName(user?.name);
    //   setCurrentUser(user?.id);
    //   setCurrentUserPhoto(user?.photo);

    //   await AsyncStorage.setItem('token', data?.idToken);
      navigation.navigate('BottomTabGroup');
    // } else {
    //   // Handle the case where idToken is null or undefined
    //   console.log('idToken is null or undefined');
    // }
  };

  const data = [
    {
      id: 1,
      title: 'FIND YOUR FAVORITE HOTEL',
      Svg: Icons.Hotel,
    },
    {
      id: 2,
      title: 'BOOK ROOMS INSTANTLY',
      Svg: Icons.Door,


      
    },
    {
      id: 3,
      title: 'TRANQUIL AND PEACEFUL STAYS',
      Svg: Icons.Sleep,
    },
    // Add more items as needed
  ];

 
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.welcomeText}>Welcome Earthling !!</Text> */}
      {/* <Image
        source={require('../../assets/images/hottelo.png')}
        style={styles.earthImage}
      /> */}
          <Icons.Logo width={320} height={180} />
      {/* <GoogleSigninButton
        style={styles.googleSignInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={signInWithGoogle}
      /> */}
       <Button
          onPress={signInWithGoogle}
          backgroundColor={COLORS.primaryDark1}
          btnTitle="Get Started"
          fontColor={COLORS.white}
          wrapperStyle={styles.loginButtonWrapper}
          titleStyle={styles.loginButtonTitle}
        />
      {/* <View style={styles.carouselContainer}>
        <Carousel
          loop={true}
          autoplay={true}
          showsControls={false}
          style={styles.carousel}>
          {data.map(img => (
            <View key={img.title} style={styles.carouselItem}>
              <View style={styles.carouselTitleWrapper}>
                <Text style={styles.carouselTitle}>{img.title}</Text>
              </View>
              <View style={styles.svgWrapper}>
                <img.Svg width={150} height={150} />
              </View>
            </View>
          ))}
        </Carousel>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-between',
    justifyContent: "center",
    backgroundColor: COLORS.primaryLight,
    paddingTop: RH(40),
  },
  welcomeText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: SIZES.l,
    textAlign: 'center',
  },
  earthImage: {
    width: RW(300),
    height: RH(200),
    resizeMode: 'cover',
  },
  googleSignInButton: {
    width: RW(220),
    height: RH(50),
    borderRadius: RW(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: RH(2)},
    shadowOpacity: 0.25,
    shadowRadius: RW(3.84),
    elevation: 5,
  },
  loginButtonWrapper: {
    width: '90%',
  },
  loginButtonTitle: {
    fontFamily: FONTS.PSB,
    fontSize: SIZES.sm,
  },
  carouselContainer: {
    height: RH(240),
    marginBottom: 0,
    backgroundColor: 'white',
    borderTopEndRadius: RW(20),
    borderTopStartRadius: RW(20),
  },
  carousel: {
    height: '100%',
    width: '100%',
  },
  carouselItem: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderTopEndRadius: RW(20),
    borderTopStartRadius: RW(20),
    overflow: 'hidden',
  },
  carouselTitleWrapper: {
    height: RH(40),
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  carouselTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: SIZES.sm,
  },
  svgWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: RH(200),
  },
});
