import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS, RH, RW, SIZES} from '../theme';

export interface SwipeActionProps {
  onComplete: () => void;
  title?: string;
  subtitle?: string;
  iconName?: string;
  trackColor?: string;
  thumbColor?: string;
  iconColor?: string;
  completedText?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const SwipeAction: React.FC<SwipeActionProps> = ({
  onComplete,
  title,
  subtitle,
  iconName = 'arrow-forward',
  trackColor = COLORS.primaryLight0,
  thumbColor = COLORS.white,
  iconColor = COLORS.primaryDark,
  completedText,
  containerStyle,
}) => {
  const sliderWidthRef = useRef(0);
  const knobSize = RH(56);
  const translateX = useRef(new Animated.Value(0)).current;
  const currentTranslate = useRef(0);
  const [completed, setCompleted] = useState(false);

  const handleComplete = useCallback(() => {
    if (completed) {
      return;
    }
    setCompleted(true);
    onComplete();
  }, [completed, onComplete]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gesture) => {
          const max = Math.max(sliderWidthRef.current - knobSize, 0);
          const value = Math.min(Math.max(gesture.dx, 0), max);
          translateX.setValue(value);
          currentTranslate.current = value;
        },
        onPanResponderRelease: () => {
          const max = Math.max(sliderWidthRef.current - knobSize, 0);
          if (currentTranslate.current >= max * 0.85 && max > 0) {
            Animated.timing(translateX, {
              toValue: max,
              duration: 150,
              useNativeDriver: false,
            }).start(() => {
              handleComplete();
              Animated.timing(translateX, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
              }).start(() => {
                currentTranslate.current = 0;
                setCompleted(false);
              });
            });
          } else {
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: false,
              bounciness: 8,
            }).start(() => {
              currentTranslate.current = 0;
            });
          }
        },
      }),
    [handleComplete, knobSize, translateX],
  );

  const handleTrackLayout = (event: LayoutChangeEvent) => {
    sliderWidthRef.current = event.nativeEvent.layout.width;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <Text style={styles.subtitle}>
        {completed ? completedText ?? 'Completed' : subtitle}
      </Text>
      <View
        style={[styles.track, {backgroundColor: trackColor}]}
        onLayout={handleTrackLayout}>
        <Animated.View
          style={[
            styles.thumb,
            {
              width: knobSize,
              height: knobSize,
              borderRadius: knobSize / 2,
              backgroundColor: thumbColor,
              transform: [{translateX}],
            },
          ]}
          {...panResponder.panHandlers}>
          <MaterialIcons name={iconName} size={RW(24)} color={iconColor} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: RH(24),
    padding: RH(16),
    gap: RH(8),
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  title: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.s,
    color: COLORS.secondary,
  },
  subtitle: {
    fontFamily: FONTS.PR,
    fontSize: SIZES.xs,
    color: COLORS.textGray,
  },
  track: {
    marginTop: RH(10),
    borderRadius: RH(30),
    height: RH(64),
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    top: RH(4),
    left: RH(6),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
});
