// import React, { useEffect, useState } from 'react';
// import { View, Image, Text, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import Ionicons from 'react-native-vector-icons/dist/Ionicons';

// const CountryDetails = ({navigation}) => {

// const [stateList, setStateLsit] = useState([])
// //   useEffect(() => {
// //     var headers = new Headers();
// // headers.append("X-CSCAPI-KEY", "UWp2WnNUQ1pRbjlDd1JSSVRNclpqWW9KVFRPOUhoT01IQWRORHppdQ==");

// // var requestOptions = {
// //  method: 'GET',
// //  headers: headers,
// //  redirect: 'follow'
// // };

// // const res = fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
// // .then(response => response.text())
// // .then(result => console.log(result))
// // .catch(error => console.log('error', error));
// //   },[])

// const route = useRoute();


// useEffect(() => {
//   console.log("Route params " + JSON.stringify(route.params) )
//   const fetchData = async () => {
//     const apiKey = "UWp2WnNUQ1pRbjlDd1JSSVRNclpqWW9KVFRPOUhoT01IQWRORHppdQ==";
//     const url = `https://api.countrystatecity.in/v1/countries/${route.params.countryCode}/states`;

//     try {
//       const response = await axios.get(url, {
//         headers: {
//           "X-CSCAPI-KEY": apiKey,
//         }
//       });
//       console.log(response.data);
//       setStateLsit(response.data)
//     } catch (error) {
//       console.error('error', error);
//     }
//   };

//   fetchData();
// }, []);



//   return (
//     <View style={{ flex: 1 }}>
//       <TouchableOpacity
//             onPress={() => {
//               navigation.goBack();
//             }}
//             style={{position: 'absolute', zIndex:9999, top:10}}
//             >
//             <Ionicons name="arrow-back-circle" size={40} color="#000" />
//           </TouchableOpacity>
//       <Image
//         source={route.params.countryImage}
//         style={{ width: '100%', height: 200 }}
//         resizeMode="cover"
//         // sharedTransitionTag={route.params.sharedTransitionTag}
//       />
      
//       <View style={{ alignItems:'center', justifyContent:'center'}}>

//         <Text style={{ fontSize: 18, fontWeight: 'bold',color:'black', marginVertical:10 }}>States in {route.params.countryName}:</Text>
        
//         {stateList.length == 0 ? <ActivityIndicator/> : <FlatList
//         data={stateList}
//         keyExtractor={item => item.id.toString()}
//         numColumns={2}
//         style={{height:hp(65)}}
//         renderItem={({item}) => (
//           <View style={{width:wp(50), alignItems:'center', height:40, borderRadius:5, borderColor:"#9FFFE0", borderWidth:1, alignItems:'center', justifyContent:'center'}}>
//           <Text style={{ fontSize: 14, color:'black' }}>{item.name}</Text>
//           </View>
//         )}
//       />}
        
//       </View>
//     </View>
//   );
// };

// export default CountryDetails;



import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CountryDetails = () => {
  return (
    <View>
      <Text>CountryDetails</Text>
    </View>
  )
}

export default CountryDetails

const styles = StyleSheet.create({})