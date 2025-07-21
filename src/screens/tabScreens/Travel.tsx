import {
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';

// import {tweets} from '../../data/tweets';
// import {Tweet} from '../../components/Tweet';

import React, {useEffect, useLayoutEffect, useState} from 'react';
// import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
// import LinearGradient from 'react-native-linear-gradient';
// import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
// import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';


export const Travel = ({navigation}: {navigation: any}) => {
  const [countries, setCountries] = useState([
    {
      id: 1,
      name: 'India',
      states: ['Maharashtra', 'Uttar Pradesh', 'Karnataka'],
      img: require('../../assets/images/country/india.jpg'),
      iso2: 'IN',
    },

    {
      id: 2,
      name: 'Canada',
      states: ['Ontario', 'Quebec', 'British Columbia'],
      img: require('../../assets/images/country/canada.jpg'),
      iso2: 'CA',
    },
    {
      id: 3,
      name: 'Australia',
      states: ['New South Wales', 'Victoria', 'Queensland'],
      img: require('../../assets/images/country/australia.jpg'),
      iso2: 'AU',
    },
    {
      id: 4,
      name: 'Germany',
      states: ['Berlin', 'Bavaria', 'Hamburg'],
      img: require('../../assets/images/country/germany.jpeg'),
      iso2: 'DE',
    },
    {
      id: 5,
      name: 'USA',
      states: ['California', 'New York', 'Texas'],
      img: require('../../assets/images/country/usa.png'),
      iso2: 'US',
    },
  ]);

  const [newCountry, setNewCountry] = useState('');
  const [newState, setNewState] = useState('');

  const addCountry = () => {
    const newId = countries.length + 1;
    setCountries([
      ...countries,
      {id: newId, name: newCountry, states: [], img: '', iso2: ''},
    ]);
    setNewCountry('');
  };

  const addStateToCountry = (countryIndex: any) => {
    const updatedCountries = [...countries];
    updatedCountries[countryIndex].states.push(newState);
    setCountries(updatedCountries);
    setNewState('');
  };

  const deleteCountry = (countryIndex: any) => {
    const updatedCountries = countries.filter(
      country => country.id !== countryIndex,
    );
    setCountries(updatedCountries);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F9F9F9',
      }}>
      <TextInput
        placeholder="Enter Country Name"
        value={newCountry}
        onChangeText={text => setNewCountry(text)}
        style={{
          backgroundColor: '#FFF',
          marginHorizontal: 20,
          marginBottom: 10,
          color: '#333',
          fontSize: 16,
          borderWidth: 0, // No borders
          borderRadius: 25,
          padding: 15,
          marginTop: 15,
          shadowColor: '#000', // Adding shadow to input
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        }}
        placeholderTextColor={'#A9A9A9'}
      />
      <TouchableOpacity
        onPress={addCountry}
        style={{
          backgroundColor: '#4ECCA3',
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginHorizontal: 20,
          marginBottom: 10,
          borderRadius: 30,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Text style={{color: '#FFF', fontSize: 16, fontWeight: '600'}}>
          Add New Country
        </Text>
      </TouchableOpacity>

      <FlatList
        data={countries}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{
          justifyContent: 'space-between', // This will space out the items evenly
        }}
        renderItem={({item}) => (
          <View
            style={{
              width: wp('48%'),
              backgroundColor: '#FFF',
              marginHorizontal: wp('1%'),
              borderRadius: 15,
              marginVertical: 5,
              padding: 10,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}>
            <TouchableOpacity
              style={{
                //width: wp(50),
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('CountryDetails', {
                  countryCode: item.iso2,
                  countryImage: item.img,
                  countryName: item.name,

                  //sharedTransitionTag: item.id + 'image',
                });
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: 5,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: '#333',
                    fontSize: 16,
                    fontWeight: '600',
                    flex: 1,
                    textAlign: 'center',
                  }}>
                  {item.name.toUpperCase()}
                </Text>

                <TouchableOpacity
                  onPress={() => deleteCountry(item.id)}
                  style={{
                    backgroundColor: '#E8FFFA',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: 'red',
                    borderRadius: 10,
                    borderWidth: 1,
                    padding: 5,
                    position: 'absolute',
                    right: 0,
                  }}>
                  <Ionicons name="trash-bin" size={13} color="#000" />
                </TouchableOpacity>
              </View>

              <Image
                style={{width: '100%', height: 90, borderRadius: 10}}
                resizeMode="cover"
                source={item.img}
                //sharedTransitionTag={item.id + 'image'}
              />

              <TextInput
                placeholder="Enter State Name"
                value={newState}
                onChangeText={text => setNewState(text)}
                style={{
                  color: 'black',
                  fontSize: 14,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: 'grey',
                  height: 40,
                  padding: 0,
                  paddingLeft: 2,
                  width: '80%',
                  alignSelf: 'center',
                  marginTop: 10,
                }}
                placeholderTextColor={'lightgrey'}
              />
              <TouchableOpacity
                onPress={() => addStateToCountry(item.id - 1)}
                style={{
                  backgroundColor: '#E8FFFA',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: 5,
                }}>
                <Text style={{color: 'black', fontSize: 14}}>Add State</Text>
              </TouchableOpacity>
              <FlatList
                data={item.states}
                keyExtractor={state => state}
                renderItem={({item: state, index}) => (
                  <Text style={{color: 'black', fontSize: 14}} key={index}>
                    {state}
                  </Text>
                )}
                style={{marginVertical: 5, paddingLeft: 2}}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
