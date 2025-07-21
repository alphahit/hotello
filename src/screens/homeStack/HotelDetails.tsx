import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { COLORS } from '../../theme/colors';
import { FONTS, SIZES, RH, RW } from '../../theme/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Carousel from 'pinar';

// Types for navigation params
interface RoomType {
  name: string;
  desc: string;
  price: number;
}

interface HotelDetailsParams {
  image: any;
  name: string;
  rating: number;
  reviews: string;
  description: string;
  images: any[];
  roomTypes: RoomType[];
}

type RouteParams = {
  params: HotelDetailsParams;
};

const HotelDetails = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'params'>>();

  console.log("route.params====",route.params);
  const { image, name, rating, reviews, description, images, roomTypes } =
    route.params;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: RH(24) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRowJustified}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
            >
              <Icon name="chevron-left" size={24} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{name}</Text>
          </View>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('Ratings', {name});
          }} style={[styles.reviewBtn, styles.ratingRow]}>
            {/* <Text style={styles.reviewBtnText}>{reviews} reviews</Text> */}

            <Icon name="star" size={18} color={COLORS.warning} />
            <Text style={styles.ratingText}>
              {rating}
              {/* <Text style={styles.reviewsText}>({reviews} reviews)</Text> */}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Main Image */}
        <View style={styles.mainImageWrapper}>
          <Image source={{ uri: image }} style={styles.mainImage} />
          {/* <View style={styles.mainImageOverlay}>
            <Text style={styles.hotelName}>{name}</Text>
            <View style={styles.ratingRow}>
              <Icon name="star" size={18} color={COLORS.warning} />
              <Text style={styles.ratingText}>{rating} <Text style={styles.reviewsText}>({reviews} reviews)</Text></Text>
            </View>
          </View> */}
        </View>
        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{description}</Text>
        {/* Images Gallery */}
        <View style={{paddingHorizontal: RW(18)}}>
        <Carousel
          loop={true}
          autoplay={true}
          showsControls={true}
          style={{ height: RH(160), marginBottom: RH(18) }}
        >
          {images.map((img, idx) => (
            <View key={idx} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image source={{ uri: img }} style={styles.galleryImage} />
            </View>
          ))}
        </Carousel>
        </View>
       
        {/* Room Types */}
        <Text style={styles.sectionTitle}>Room Types</Text>
        {roomTypes.map((room, idx) => (
          <View key={room.name} style={styles.roomCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.roomName}>{room.name}</Text>
              <Text style={styles.roomDesc}>{room.desc}</Text>
            </View>
            <View style={styles.priceCol}>
              <Text style={styles.priceText}>${room.price}</Text>
              <Text style={styles.nightText}>/night</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* Book Now Button */}
      <TouchableOpacity
        style={styles.bookBtn}
        onPress={() => navigation.navigate('BookNow', { hotelName: name })}
      >
        <Text style={styles.bookBtnText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HotelDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RH(16),
    marginBottom: RH(10),
    paddingHorizontal: RH(16),
  },
  backBtn: {
    marginRight: RH(10),
    // padding: RH(4),
  },
  headerTitle: {
    fontSize: SIZES.l,
    fontFamily: FONTS.PB,
    color: COLORS.black,
    width: '65%'
  },
  mainImageWrapper: {
    marginHorizontal: RH(16),
    marginBottom: RH(18),
    borderRadius: RH(18),
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: RH(180),
    borderRadius: RH(18),
    resizeMode: 'cover',
  },
  mainImageOverlay: {
    position: 'absolute',
    left: RH(16),
    bottom: RH(16),
  },
  hotelName: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.PB,
    color: COLORS.white,
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: SIZES.m,
    color: COLORS.white,
    fontFamily: FONTS.PB,
    marginLeft: 6,
  },
  reviewsText: {
    fontFamily: FONTS.PR,
    color: COLORS.white,
    fontSize: SIZES.s,
  },
  sectionTitle: {
    fontSize: SIZES.l,
    fontFamily: FONTS.PB,
    color: COLORS.black,
    marginLeft: RH(16),
    marginBottom: 4,
    marginTop: RH(10),
  },
  description: {
    fontSize: SIZES.s,
    color: COLORS.textGray,
    fontFamily: FONTS.PR,
    marginHorizontal: RH(16),
    marginBottom: RH(10),
  },
  galleryImage: {
    width: '100%',
    height: RH(180),
    borderRadius: RW(5),
    resizeMode: 'cover',
    overflow:'hidden',
    backgroundColor: COLORS.gray3,
  },
  roomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RH(12),
    marginHorizontal: RH(16),
    marginBottom: RH(12),
    padding: RH(14),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  roomName: {
    fontSize: SIZES.m,
    fontFamily: FONTS.PB,
    color: COLORS.black,
    marginBottom: 2,
  },
  roomDesc: {
    fontSize: SIZES.s,
    color: COLORS.textGray,
    fontFamily: FONTS.PR,
  },
  priceCol: {
    alignItems: 'flex-end',
    marginLeft: RH(10),
  },
  priceText: {
    fontSize: SIZES.l,
    fontFamily: FONTS.PB,
    color: COLORS.primaryDark,
  },
  nightText: {
    fontSize: SIZES.s,
    color: COLORS.textGray,
    fontFamily: FONTS.PR,
  },
  bookBtn: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: RH(12),
    margin: RH(16),
    paddingVertical: RH(12),
    alignItems: 'center',
  },
  bookBtnText: {
    color: COLORS.white,
    fontFamily: FONTS.PB,
    fontSize: SIZES.m,
  },
  headerRowJustified: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RH(16),
    marginBottom: RH(10),
    paddingHorizontal: RH(16),
  },
  reviewBtn: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: RH(8),
    paddingVertical: RH(6),
    paddingHorizontal: RH(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewBtnText: {
    color: COLORS.white,
    fontFamily: FONTS.PB,
    fontSize: SIZES.s,
  },
});
