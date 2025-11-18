/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {
  NavigationContainer,
  // DrawerActions,
  // useNavigation,
} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {Travel} from './screens/tabScreens/Travel';
import Settings from './screens/tabScreens/Settings';
import React, {useContext} from 'react';

// import {createDrawerNavigator} from '@react-navigation/drawer';
// import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
// import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';

import Ionicons from 'react-native-vector-icons/Ionicons';

// import {
//   Text,
//   SafeAreaView,
//   FlatList,
//   Image,
//   Pressable,
//   StyleSheet,
//   View,
//   TouchableOpacity,
// } from 'react-native';
import {TweetDetailsScreen} from './screens/homeStack/TweetDetailsScreen';
// import {Bookmarks} from './screens/drawerScreens/Bookmarks';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import {Chat} from './screens/tabScreens/Chat';
// import {Following} from './screens/tabScreens/Following';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
import {SignInScreen} from './screens/signinScreen/SignInScreen';
import CountryDetails from './screens/homeStack/CountryDetails';
import {SplashScreen} from './screens/homeStack/Splash';
import GlobalState, {GlobalContext} from './context';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import List from './screens/tabScreens/List';
import HotelDetails from './screens/homeStack/HotelDetails';
import BookNow from './screens/homeStack/BookNow';
import OrderComplete from './screens/homeStack/OrderComplete';
import Bookings from './screens/tabScreens/Bookings';
import {COLORS, RH} from './theme';
import Home from './screens/home/Home';
import ChatHome from './screens/chat/ChatHome';
import Order from './screens/order/Order';
import OrderDetails from './screens/order/OrderDetails';
import ChatInbox from './screens/chat/ChatInbox';


const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'default', // or 'slide_from_right' for iOS-like
      }}>
      <HomeStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="BottomTabGroup"
        component={BottomTabGroup}
        options={{
          headerShown: false,
        }}
      />
      
      <HomeStack.Screen
        name="OrderComplete"
        component={OrderComplete}
        options={{
          headerShown: false,
        }}
      />
     
      <HomeStack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ChatInbox"
        component={ChatInbox}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function BottomTabGroup() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('GlobalContext must be used within a GlobalState provider');
  }

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.primaryDark5,
        tabBarInactiveTintColor: COLORS.secondary,
        tabBarStyle: styles.tabBar,
        tabBarButton: props => <TabBarButton {...props} />,
        tabBarIcon: ({color, size}) => {
          let icon: string = 'home';
          if (route.name === 'Home') icon = 'home';
          else if (route.name === 'Orders') icon = 'receipt';
          else if (route.name === 'Chat') icon = 'chatbubbles';
          else if (route.name === 'Account') icon = 'person';
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Orders"
        component={Order}
        options={{tabBarLabel: 'Order'}}
      />
      <Tab.Screen
        name="Chat"
        component={ChatHome}
        options={{tabBarLabel: 'Chat'}}
      />
      <Tab.Screen
        name="Account"
        component={Settings}
        options={{tabBarLabel: 'Account'}}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <GlobalState>
      <NavigationContainer>
        <HomeStackGroup />
      </NavigationContainer>
    </GlobalState>
  );
}

function TabBarButton({
  children,
  accessibilityState,
  onPress,
}: BottomTabBarButtonProps) {
  const focused = accessibilityState?.selected ?? false;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.tabButton, focused && styles.tabButtonActive]}>
      {children}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.primaryLight0,
    height: RH(60),
    borderTopWidth: 0,         // remove default border
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RH(8),
  },
  tabButtonActive: {
    borderTopWidth: 2,
    borderTopColor: COLORS.primaryDark,
  },
});
