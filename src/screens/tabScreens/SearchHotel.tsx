import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FilterModal from '../../components/FilterModal';
import { RH, RW, SIZES } from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme';
const hotelsData = require('../../data/hotels.json');

const SearchHotel = () => {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openCheckOut, setOpenCheckOut] = useState(false);
  const hotels: any[] = hotelsData;
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<any>(null);
  const [filteredHotels, setFilteredHotels] = useState<any[]>(hotels);

  // Filtering logic
  const applyFilters = (filterObj: any) => {
    setFilters(filterObj);
    setFilterModalVisible(false);
    let result = hotels;
    // Price range
    if (filterObj.priceRange) {
      result = result.filter((hotel: any) => {
        // Find min and max price from roomTypes
        const prices = hotel.roomTypes.map((rt: any) => rt.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        return (
          maxPrice >= filterObj.priceRange[0] && minPrice <= filterObj.priceRange[1]
        );
      });
    }
    // Beds
    if (filterObj.beds && filterObj.beds !== 'Any') {
      result = result.filter((hotel: any) => hotel.beds === filterObj.beds);
    }
    // Bathrooms
    if (filterObj.baths && filterObj.baths !== 'Any') {
      result = result.filter((hotel: any) => hotel.bathrooms === filterObj.baths);
    }
    // Amenities
    if (filterObj.amenities && filterObj.amenities.length > 0) {
      result = result.filter((hotel: any) =>
        filterObj.amenities.every((a: any) => hotel.amenities.includes(a))
      );
    }
    setFilteredHotels(result);
  };

  const clearFilters = () => {
    setFilters(null);
    setFilteredHotels(hotels);
  };

  // Search by city (optional, not in filter modal)
  const handleSearch = () => {
    if (!city) {
      setFilteredHotels(filters ? filteredHotels : hotels);
      return;
    }
    const base = filters ? filteredHotels : hotels;
    setFilteredHotels(
      base.filter((hotel: any) =>
        hotel.city && hotel.city.toLowerCase().includes(city.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if(city.length === 0){
      setFilteredHotels(hotels)
    }
  },[city, hotels])
  const navigation = useNavigation();
  const renderHotel = ({ item }: any) => (
    <TouchableOpacity 
    
    onPress={() => navigation.navigate('HotelDetails', item)}
    style={styles.hotelItem}>
      <Image source={{ uri: item.image }} style={styles.hotelImage} />
      <View style={{ flex: 1, marginLeft: RW(12) }}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <Text style={styles.hotelInfo}>${item.price || (item.roomTypes && item.roomTypes[0]?.price)}/night · Rating: {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    
      
      <View style={styles.row}>
        {/* Check-in Button and DatePicker */}
        <TouchableOpacity style={styles.dateInput} onPress={() => setOpenCheckIn(true)}>
          <Text style={styles.dateText}>{checkIn ? checkIn.toDateString() : 'Check-in'}</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={openCheckIn}
          date={checkIn ?? new Date()}
          onConfirm={(date) => {
            setOpenCheckIn(false);
            setCheckIn(date);
          }}
          onCancel={() => {
            setOpenCheckIn(false);
          }}
        />
        {/* Check-out Button and DatePicker */}
        <TouchableOpacity style={styles.dateInput} onPress={() => setOpenCheckOut(true)}>
          <Text style={styles.dateText}>{checkOut ? checkOut.toDateString() : 'Check-out'}</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={openCheckOut}
          date={checkOut ?? new Date()}
          onConfirm={(date) => {
            setOpenCheckOut(false);
            setCheckOut(date);
          }}
          onCancel={() => {
            setOpenCheckOut(false);
          }}
        />
      </View>
      <View style={{alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor={COLORS.gray}
          value={city}
          onChangeText={setCity}
        />
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      </View>
   
     
      <FlatList
        data={filteredHotels}
        keyExtractor={item => item.id}
        renderItem={renderHotel}
        contentContainerStyle={{ paddingBottom: RH(100) }}
      />
      {/* Floating Filter Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setFilterModalVisible(true)}
      >
        {/* <Text style={{ fontSize: 28, color: '#fff' }}>⚙️</Text> */}
        <Ionicons name={'filter-sharp'} size={SIZES.xl}  color={'black'} />
      </TouchableOpacity>
      {/* Filter Modal Integration */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={applyFilters}
        onClear={clearFilters}
      />
    </View>
  );
};

export default SearchHotel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: RW(16),
    paddingTop: RH(32),
  },
  header: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: RH(16),
  },
  inputBox: {
    backgroundColor: '#F3F6F6',
    borderRadius: RW(14),
    marginBottom: RH(12),
    paddingHorizontal: RW(8),
    width: '65%',
  },
  input: {
    height: RH(48),
    fontSize: SIZES.sm,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RH(12),
  },
  dateInput: {
    flex: 1,
    backgroundColor: '#F3F6F6',
    borderRadius: RW(14),
    marginRight: RW(8),
    height: RH(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: COLORS.gray,
    fontSize: SIZES.sm,
  },
  searchButton: {
    backgroundColor: '#19C37D',
    borderRadius: RW(24),
    alignItems: 'center',
    paddingVertical: RH(14),
    marginBottom: RH(18),
    width: '30%',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SIZES.sm,
  },
  hotelsTitle: {
    fontSize: SIZES.l,
    fontWeight: 'bold',
    marginBottom: RH(10),
  },
  hotelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RH(18),
    backgroundColor: '#F8F8F8',
    borderRadius: RW(12),
    padding: RW(10),
  },
  hotelImage: {
    width: RW(80),
    height: RH(60),
    borderRadius: RW(8),
    backgroundColor: '#ddd',
  },
  hotelName: {
    fontSize: SIZES.sm,
    fontWeight: 'bold',
    marginBottom: RH(2),
  },
  hotelInfo: {
    color: '#6B7B7B',
    fontSize: SIZES.s,
  },
  fab: {
    position: 'absolute',
    bottom: RH(32),
    right: RW(24),
    backgroundColor: '#19C37D',
    width: RW(50),
    height: RW(50),
    borderRadius: RW(30),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: RW(18),
    borderTopRightRadius: RW(18),
    padding: RW(24),
    alignItems: 'center',
  },
  closeModalBtn: {
    marginTop: RH(24),
    backgroundColor: '#19C37D',
    borderRadius: RW(18),
    paddingHorizontal: RW(24),
    paddingVertical: RH(10),
  },
});