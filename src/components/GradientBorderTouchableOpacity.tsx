import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../theme';

const GradientBorderTouchableOpacity = ({
    children,
    onPress,
  }: {
    children: any;
    onPress: any;
  }) => {
    // const scale = useSharedValue(1);
    // const animatedStyle = useAnimatedStyle(() => {
    //   return {
    //     transform: [{scale: scale.value}],
    //   };
    // });

    return (
      <LinearGradient
        colors={[COLORS.primaryLight1, COLORS.white]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ borderRadius: 10, borderWidth: 1 }}
      >
        <View>
          <TouchableOpacity
            style={{}}
            onPress={onPress}
            // onPressIn={() => {
            //   scale.value = withSpring(0.95);
            // }}
            // onPressOut={() => {
            //   scale.value = withSpring(1);
            // }}
          >
            {children}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

export default GradientBorderTouchableOpacity

const styles = StyleSheet.create({})