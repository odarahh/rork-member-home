import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import Colors from "@/constants/colors";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
  showLevel?: boolean;
  level?: number;
}

export default function CircularProgress({
  progress,
  size = 160,
  strokeWidth = 8,
  children,
  showLevel = false,
  level = 1,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressOffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Defs>
          <LinearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={Colors.primary} stopOpacity="1" />
            <Stop offset="100%" stopColor={Colors.primaryLight} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#333333"
          strokeWidth={strokeWidth}
          fill="none"
          opacity={0.3}
        />
        
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      
      <View style={styles.innerContent}>
        {children}
        {showLevel && (
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Nível {level}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  svg: {
    position: "absolute",
  },
  innerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  levelBadge: {
    position: "absolute",
    top: -40,
  },
  levelText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
    letterSpacing: 0.5,
  },
});
