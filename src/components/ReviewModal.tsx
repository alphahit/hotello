import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS, FONTS, RH, RW, SIZES } from '../theme';

const ReviewModal = ({ visible, onClose, onSave }: {
  visible: boolean;
  onClose: () => void;
  onSave: (reviewText: string, starRating: number) => void;
}) => {
  const [reviewText, setReviewText] = useState('');
  const [starRating, setStarRating] = useState(0);

  const handleSave = () => {
    onSave(reviewText, starRating);
    setReviewText('');
    setStarRating(0);
  };

  const handleClose = () => {
    onClose();
    setReviewText('');
    setStarRating(0);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Write a Review</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="Share your experience..."
            placeholderTextColor={COLORS.textGray}
            value={reviewText}
            onChangeText={setReviewText}
            multiline
            numberOfLines={4}
            maxLength={300}
          />
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
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
            <Text style={styles.closeBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
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