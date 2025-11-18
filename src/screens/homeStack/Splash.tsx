import {
  SafeAreaView,
} from 'react-native';
import React, { useEffect } from 'react';


import { useNavigation } from '@react-navigation/native';
import { Icons } from '../../theme';

export const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignInScreen');
    }, 1000);
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Icons.Logo width={320} height={180} />
    </SafeAreaView>
  );
};


