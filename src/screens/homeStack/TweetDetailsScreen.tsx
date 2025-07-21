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
import {useNavigation} from '@react-navigation/native';
import {useEffect, useLayoutEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {TweetContent} from '../../components/TweetContent';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native-gesture-handler';
import React from 'react';
export const TweetDetailsScreen = () => {
  const navigation = useNavigation();
  // const [textWidth, setTextWidth] = useState(null);
  const [comments, setComments] = useState('');
  // const onTextLayout = event => {
  //   const {width} = event.nativeEvent.layout;
  //   setTextWidth(width);
  // };
  const [commentBoxopen, setcommentBoxopen] = useState(false);

  const GradientBorderTouchableOpacity = ({
    children,
    onPress,
  }: {
    children: any;
    onPress: any;
  }) => {
    return (
      <LinearGradient
        colors={['#F7E3FF', '#E195FF']} // Replace with your desired gradient colors
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          borderRadius: 100,
          borderWidth: 1,
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
          height: 45,
          width: 45,
          marginLeft: 5,
          position: 'absolute',
          top: hp(9),
        }}>
        <TouchableOpacity style={{}} onPress={onPress}>
          {children}
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  const GradientBorderView = ({children}: {children: any}) => {
    return (
      <LinearGradient
        colors={['#9FFFE0', '#F0FFF8']} // Replace with your desired gradient colors
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View>{children}</View>
      </LinearGradient>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShow: false,
      headerStyle: {
        backgroundColor: '#9FFFE0', // Specify the height of your custom header
      },
      headerTitle: ` ${params?.author?.name}`,
      headerRight: () => (
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 5,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'black'}}>
            @{params?.author?.screenName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <MaterialIcons name="arrow-back-ios-new" size={20} color="#000" />
          </TouchableOpacity>

          <GradientBorderTouchableOpacity
            onPress={() => {
              console.log(
                '======================================Item',
                JSON.stringify(item),
              );
              //navigation.navigate("TweetDetailsScreen",{item});
            }}
            style={{flexDirection: 'row', padding: 10}}>
            <Image
              source={{uri: params?.author?.avatar}} // Pass the URL as the 'uri' property
              style={{
                height: 35,
                width: 35,
                resizeMode: 'contain',
                marginTop: -10,
              }}
            />
          </GradientBorderTouchableOpacity>
        </View>
      ),
      //headerCenter: () => (<Text style={{color:"black"}}>Test</Text>)
      //headerShown: false
    });
  });
  const route = useRoute();
  const {params} = route;
  console.log('Prop ITEM Passed ===========>', JSON.stringify(params));
  // useEffect(() => {
  //   console.log('Prop ITEM Passed ===========>', JSON.stringify(params));
  // },[]);
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#F0FFF8', flexDirection: 'row'}}>
      <GradientBorderView
        style={{
          height: hp(100),
          width: wp(15),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: wp(15),
            height: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{position: 'absolute', top: hp(4)}}>
            <MaterialIcons name="arrow-back-ios-new" size={20} color="#000" />
          </TouchableOpacity>

          <GradientBorderTouchableOpacity
            // onPress={() => {
            //   console.log(
            //     '======================================Item',
            //     JSON.stringify(item),
            //   );
            //   //navigation.navigate("TweetDetailsScreen",{item});
            // }}
            style={{
              padding: 10,
              transform: [{rotate: '90deg'}],
              position: 'absolute',
            }}>
            <Image
              source={{uri: params?.author?.avatar}} // Pass the URL as the 'uri' property
              style={{
                height: 35,
                width: 35,
                resizeMode: 'contain',
                marginTop: -10,
              }}
            />
          </GradientBorderTouchableOpacity>
          <Text
            style={{
              transform: [{rotate: '90deg'}],
              width: wp(40),
              position: 'absolute',
              top: hp(25),
              color: 'black',
            }}>
            {params?.author?.name}
          </Text>

          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
              width: wp(40),
              transform: [{rotate: '90deg'}],
              position: 'absolute',
              //top:hp(`${params?.author?.name.toString().length * 3.55}`)
              bottom: hp(10),
            }}>
            <Text style={{color: 'black'}}>
              @{params?.author?.screenName}
            </Text>
          </View>
        </View>
      </GradientBorderView>
      <View style={{width: wp(85), height: hp(95)}}>
        <TweetContent
          tweet={params}
          comments={comments}
          setComments={setComments}
          setcommentBoxopen={setcommentBoxopen}
          commentBoxopen={commentBoxopen}
        />
      </View>
    </SafeAreaView>
  );
};
