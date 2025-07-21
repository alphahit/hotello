import {
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';

import { hotelReviews } from '../../data/tweets';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import RetweetModal from '../../components/RetweetModal';
import React from 'react';
import GradientBorderTouchableOpacity from '../../components/GradientBorderTouchableOpacity';
import { COLORS, FONTS, RH, RW, RPH, RHA, SIZES } from '../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReviewModal from '../../components/ReviewModal';

export default function Feed() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { name } = (route as any)?.params || {};

  // Star rating render
  const renderStars = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: RH(10) }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => setStarRating(star)}>
          <FontAwesome
            name={starRating >= star ? 'star' : 'star-o'}
            size={SIZES.l}
            color={starRating >= star ? COLORS.warning : COLORS.gray}
            style={{ marginHorizontal: RW(4) }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderFeed = (item: {
    author: any;
    id?: string;
    reviewText: any;
    shareCount?: number;
    commentCount?: number;
    comments?: {
      comment_id: string;
      user_id: string;
      user_name: string;
      comment_text: string;
      timestamp: string;
    }[];
    likeCount?: number;
  }) => {
    return (
      <GradientBorderTouchableOpacity
        onPress={() => {
          navigation.navigate('TweetDetailsScreen', item);
        }}
      >
        <View style={styles.animatedView}>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={{ uri: item?.author?.avatar }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={styles.authorContainer}>
            <Text style={styles.authorName}>{item?.author?.name}</Text>
          </View>
        </View>
        <View style={styles.textContent}>
          <Text style={styles.text}>{item?.reviewText}</Text>
        </View>
      </GradientBorderTouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: RH(10),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Icon name="chevron-left" size={RW(24)} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name}</Text>
      </View>

      <FlatList
        data={hotelReviews}
        keyExtractor={item => item.id}
        renderItem={({ item }) => renderFeed(item)}
      />

      {/* <RetweetModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onRetweet={handleRetweet}
      /> */}

      {/* Floating + Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setReviewModalVisible(true)}
        activeOpacity={0.8}
      >
        <FontAwesome name="plus" size={SIZES.xl} color={COLORS.white} />
      </TouchableOpacity>

      {/* Review Modal */}
      <ReviewModal
        visible={reviewModalVisible}
        onClose={() => setReviewModalVisible(false)}
        onSave={() => setReviewModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DDD',
  },
  animatedView: {
    flexDirection: 'row',
    width: RW(375),
    alignItems: 'center',
    padding: RH(5),
  },
  avatarContainer: {
    height: RH(45),
    width: RH(45),
    borderRadius: RH(22.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: RH(35),
    width: RH(35),
    resizeMode: 'contain',
    marginTop: -RH(10),
  },
  authorContainer: {
    flexDirection: 'row',
    width: RW(375),
    alignItems: 'center',
  },
  authorName: {
    color: 'black',
    fontSize: SIZES.s,
  },
  textContent: {
    marginHorizontal: RW(20),
    marginBottom: RH(10),
  },
  text: {
    color: 'black',
    fontSize: SIZES.sm,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: RW(375),
    alignItems: 'center',
    marginBottom: RH(10),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: 'black',
    fontSize: SIZES.xs,
  },
  backBtn: {
    marginRight: RW(10),
    padding: RH(4),
  },
  headerTitle: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.PB,
    color: COLORS.black,
  },
  fab: {
    position: 'absolute',
    bottom: RH(32),
    right: RW(24),
    backgroundColor: COLORS.primaryDark,
    width: RW(56),
    height: RW(56),
    borderRadius: RW(28),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RW(18),
    borderTopRightRadius: RW(18),
    padding: RW(24),
    alignItems: 'center',
    minHeight: RH(320),
  },
  modalTitle: {
    fontSize: SIZES.l,
    fontFamily: FONTS.PB,
    color: COLORS.black,
    marginBottom: RH(12),
  },
  reviewInput: {
    width: '100%',
    minHeight: RH(80),
    backgroundColor: COLORS.gray3,
    borderRadius: RW(12),
    padding: RW(14),
    fontSize: SIZES.sm,
    color: COLORS.black,
    marginBottom: RH(16),
    textAlignVertical: 'top',
  },
  saveBtn: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: RW(20),
    paddingVertical: RH(12),
    paddingHorizontal: RW(32),
    marginTop: RH(8),
    marginBottom: RH(4),
  },
  saveBtnText: {
    color: COLORS.white,
    fontFamily: FONTS.PB,
    fontSize: SIZES.m,
  },
  closeBtn: {
    marginTop: RH(2),
    padding: RH(6),
  },
  closeBtnText: {
    color: COLORS.textGray,
    fontFamily: FONTS.PB,
    fontSize: SIZES.s,
  },
});
