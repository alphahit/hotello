import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const AMENITIES = ['Wifi', 'Kitchen', 'Washer'];
const BED_OPTIONS = [1, 2, 3, 4, 5];
const BATH_OPTIONS = [1, 2, 3, 4, 5];

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  onClear: () => void;
};

const FilterModal = ({
  visible = false,
  onClose = () => {},
  onApply = () => {},
  onClear = () => {},
}: FilterModalProps) => {
  // State for filters
  const [priceRange, setPriceRange] = useState<[number, number]>([55, 525]);
  const [beds, setBeds] = useState<string | number>('Any');
  const [baths, setBaths] = useState<string | number>('Any');
  const [amenities, setAmenities] = useState<string[]>([]);

  // Handlers
  const handleAmenityToggle = (amenity: string) => {
    setAmenities((prev: string[]) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleClear = () => {
    setPriceRange([55, 525]);
    setBeds('Any');
    setBaths('Any');
    setAmenities([]);
    onClear();
  };

  const handleApply = () => {
    onApply({
      priceRange,
      beds,
      baths,
      amenities,
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onClose} hitSlop={{top:10,left:10,right:10,bottom:10}}>
              <Text style={styles.closeIcon}>×</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Filters</Text>
            <View style={{width:24}} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
         
            <Text style={styles.label}>Price range</Text>
            <View style={{marginTop: 8, marginBottom: 8, alignSelf:'center'}}>
              <MultiSlider
                values={priceRange}
                min={55}
                max={525}
                step={5}
                onValuesChange={(values: number[]) => setPriceRange([values[0], values[1]])}
                sliderLength={260}
                selectedStyle={{backgroundColor: '#222'}}
                unselectedStyle={{backgroundColor: '#E5E8E6'}}
                markerStyle={{backgroundColor: '#222'}}
              />
              <View style={styles.priceLabelsRow}>
                <Text style={styles.priceLabel}>${priceRange[0]}</Text>
                <Text style={styles.priceLabel}>${priceRange[1]}</Text>
              </View>
            </View>
            {/* Rooms and beds */}
            <Text style={styles.sectionTitle}>Rooms and beds</Text>
            <Text style={styles.label}>Beds</Text>
            <View style={styles.optionsRow}>
              <Pressable
                style={[styles.optionBtn, beds === 'Any' && styles.optionBtnActive]}
                onPress={() => setBeds('Any')}
              >
                <Text style={styles.optionText}>Any</Text>
              </Pressable>
              {BED_OPTIONS.map((num) => (
                <Pressable
                  key={num}
                  style={[styles.optionBtn, beds === num && styles.optionBtnActive]}
                  onPress={() => setBeds(num)}
                >
                  <Text style={styles.optionText}>{num}</Text>
                </Pressable>
              ))}
            </View>
            <Text style={styles.label}>Bathrooms</Text>
            <View style={styles.optionsRow}>
              <Pressable
                style={[styles.optionBtn, baths === 'Any' && styles.optionBtnActive]}
                onPress={() => setBaths('Any')}
              >
                <Text style={styles.optionText}>Any</Text>
              </Pressable>
              {BATH_OPTIONS.map((num) => (
                <Pressable
                  key={num}
                  style={[styles.optionBtn, baths === num && styles.optionBtnActive]}
                  onPress={() => setBaths(num)}
                >
                  <Text style={styles.optionText}>{num}</Text>
                </Pressable>
              ))}
            </View>
            {/* Amenities */}
            <Text style={styles.sectionTitle}>Amenities</Text>
            {AMENITIES.map((amenity) => (
              <View key={amenity} style={styles.amenityRow}>
                <Text style={styles.amenityLabel}>{amenity}</Text>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => handleAmenityToggle(amenity)}
                >
                  {amenities.includes(amenity) && <View style={styles.checkboxChecked} />}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          {/* Footer buttons */}
          <View style={styles.footerRow}>
            <TouchableOpacity style={styles.showBtn} onPress={handleApply}>
              <Text style={styles.showBtnText}>Show results</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClear}>
              <Text style={styles.clearText}>Clear all</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    minHeight: 540,
    maxHeight: '90%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  closeIcon: {
    fontSize: 28,
    color: '#222',
    fontWeight: '400',
    width: 24,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#181C1C',
    marginTop: 18,
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
    marginTop: 8,
    fontWeight: '500',
  },
  priceLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginHorizontal: 2,
  },
  priceLabel: {
    fontSize: 16,
    color: '#222',
  },
  optionsRow: {
    flexDirection: 'row',
    marginBottom: 8,
    marginTop: 2,
    flexWrap: 'wrap',
    gap: 8,
  },
  optionBtn: {
    backgroundColor: '#F3F6F6',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 6,
  },
  optionBtnActive: {
    backgroundColor: '#E5E8E6',
  },
  optionText: {
    fontSize: 16,
    color: '#222',
  },
  amenityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 2,
  },
  amenityLabel: {
    fontSize: 17,
    color: '#222',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: '#C7D1D1',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    width: 16,
    height: 16,
    backgroundColor: '#19C37D',
    borderRadius: 4,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  showBtn: {
    backgroundColor: '#19C37D',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  showBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  clearText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
});