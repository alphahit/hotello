// import React, {useContext, useEffect, useState} from 'react';
// import {
//   Text,
//   SafeAreaView,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   // FlatList,
//   // Image,
//   // Pressable,
//   // StyleSheet,
//   // View,
//   // TouchableOpacity,
//   // Button,
//   // TextInput
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

// import {SvgXml} from 'react-native-svg';
// import searchSvg from '../../assets/svg/search.svg';
// import plusSvg from '../../assets/svg/plus.svg';

// import { GlobalContext } from '../../context';
// import CreateGroupModal from '../../components/CreateModal';
// // import {tweets} from '../../data/tweets';
// // import {Tweet} from '../../components/Tweet';
// // import {useNavigation} from '@react-navigation/native';
// // import {useEffect, useLayoutEffect, useState} from 'react';
// // import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
// // import LinearGradient from 'react-native-linear-gradient';
// // import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
// // import AntDesign from 'react-native-vector-icons/dist/AntDesign';
// // import {
// //   widthPercentageToDP as wp,
// //   heightPercentageToDP as hp,
// // } from 'react-native-responsive-screen';
// // import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
// // import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

// export const Chat = () => {
//   const [text, onChangeText] = useState('');
//   const context = useContext(GlobalContext);

//   if (!context) {
//     throw new Error('GlobalContext must be used within a GlobalState provider');
//   }
// const {allChatRooms, setAllChatRooms, modalVisible, setModalVisible} = context
//   const GradientView = ({children}: {children: any}) => {
 

//     return (
//       <LinearGradient
//         colors={['#03A9F1', '#6F3689', '#A0025A']}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 0}}
//         style={{flex: 1}}>
//         <View>{children}</View>
//       </LinearGradient>
//     );
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://192.168.0.121:4000/api'); // Adjusted to target the '/api' endpoint.
//         const data = await response.json(); // Await the resolution of the .json() promise to get the actual data.
//         console.log("Data from HTTP call:", data);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       }
//     };
//     fetchData();
//   }, []);
  
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//       }}>
//       <GradientView>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             onChangeText={onChangeText}
//             value={text}
//             placeholder="Search..."
//           />
//           <View style={styles.searchContainer}>
//             <SvgXml width="20" height="20" xml={searchSvg} />
//           </View>
//           <TouchableOpacity onPress={()=>{setModalVisible(true)}} style={styles.plusContainer}>
//             <SvgXml width="20" height="20" xml={plusSvg} />
//           </TouchableOpacity>
//         </View>
//       </GradientView>
//       {modalVisible && <CreateGroupModal/>}

//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//     backgroundColor: 'black',
//     borderRadius: 10,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   searchContainer: {
//     backgroundColor: '#565E70',
//     height: 40,
//     width: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 10,
//   },
//   plusContainer: {backgroundColor: '#03A9F1',
//   height: 40,
//   width: 40,
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderRadius: 10,}
// });




import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Chat = () => {
  return (
    <View>
      <Text>Chat</Text>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({})