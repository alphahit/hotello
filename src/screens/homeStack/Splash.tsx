import {
  // View,
  // Text,
  SafeAreaView,
  // FlatList,
  // TouchableOpacity,
  Image,
  // ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
// import Modal from 'react-native-modal';
// import {getAxiosReqres} from '../data/AxiosApiReques';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { storageMMKV } from '../../utils/MMKV';

export const SplashScreen = () => {
  // const [vendors, setvendors] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1);
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [avatar, setAvatar] = useState('');
  // const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      // getToken();
      navigation.replace('SignInScreen');
    }, 1000);
  }, [navigation]);
  // const getToken = async () => {
  //   const token = await AsyncStorage.getItem('token');

  //   // const token = storageMMKV.getString('token')
  //   if (!token) {
  //     console.log('Get Token Called False====>', token);
  //     navigation.replace('SignInScreen');
  //   } else {
  //     console.log('Get Token Called True====>', token);
  //     navigation.replace('BottomTabGroup');
  //   }
  // };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Image
        style={{ width: 320, height: 180 }}
        source={require('../../assets/images/hottelo.png')}
      />
    </SafeAreaView>
  );
};
