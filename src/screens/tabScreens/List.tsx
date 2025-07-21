import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { RH, RW, SIZES } from '../../theme/fonts';
const hotelsData = require('../../data/hotels.json');

const List = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const hotels = hotelsData.filter((h: any) =>
    h.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarWrapper}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search hotels"
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {/* Section Title */}
      <Text style={styles.sectionTitle}>Popular Hotels</Text>
      {/* Hotel List */}
      <FlatList
        data={hotels}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('HotelDetails', item)}
            style={styles.hotelRow}
          >
            <Image source={{ uri: item.image }} style={styles.hotelImage} />
            <View style={styles.hotelInfo}>
              <Text style={styles.hotelTitle}>{item.name}</Text>
              <Text style={styles.hotelDesc}>
                ${item.roomTypes[0].price}/night · Rating: {item.rating}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: RW(16),
  },
  searchBarWrapper: {
    marginBottom: RH(18),
  },
  searchBar: {
    backgroundColor: '#F3F6F6',
    borderRadius: RW(14),
    paddingHorizontal: RW(16),
    paddingVertical: RH(10),
    fontSize: SIZES.sm,
    color: '#222',
  },
  sectionTitle: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: RH(18),
  },
  hotelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RH(18),
  },
  hotelImage: {
    width: RW(70),
    height: RH(50),
    borderRadius: RW(10),
    marginRight: RW(14),
    resizeMode: 'cover',
    backgroundColor: '#ddd',
  },
  hotelInfo: {
    flex: 1,
  },
  hotelTitle: {
    fontSize: SIZES.sm,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: RH(2),
  },
  hotelDesc: {
    fontSize: SIZES.s,
    color: '#666',
  },
});
