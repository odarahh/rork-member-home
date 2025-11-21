import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Star, Play, Trophy, CheckSquare } from "lucide-react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface MyProgressCardProps {
  level: number;
  progress: number;
  points: number;
  watchedClasses: number;
  ranking: number;
  tasksCompleted: number;
  totalTasks: number;
}

export default function MyProgressCard({
  level,
  progress,
  points,
  watchedClasses,
  ranking,
  tasksCompleted,
  totalTasks,
}: MyProgressCardProps) {
  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedValue]);

  const progressOffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  const tasksPercentage = Math.round((tasksCompleted / totalTasks) * 100);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.iconBadge}>
            <Text style={styles.iconText}>P</Text>
          </View>
          <Text style={styles.title}>Meu progresso</Text>
        </View>
      </View>

      <View style={styles.levelSection}>
        <Text style={styles.levelText}>Nível {level}</Text>
        
        <View style={styles.circularProgressContainer}>
          <Svg width={size} height={size} style={styles.svg}>
            <Defs>
              <LinearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#4089FF" stopOpacity="1" />
                <Stop offset="100%" stopColor="#60a5ff" stopOpacity="1" />
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
          
          <View style={styles.medalContainer}>
            <View style={styles.medalBadge}>
              <Text style={styles.medalEmoji}>🏅</Text>
            </View>
          </View>
        </View>

        <View style={styles.progressTextContainer}>
          <Text style={styles.progressLabel}>Progresso</Text>
          <Text style={styles.progressDot}> • </Text>
          <Text style={styles.progressValue}>{progress}%</Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Star size={18} color="#4089FF" fill="#4089FF" strokeWidth={2} />
          </View>
          <Text style={styles.statLabel}>Pontuação</Text>
          <Text style={styles.statValue}>{points}</Text>
        </View>

        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Play size={18} color="#4089FF" fill="#4089FF" strokeWidth={2} />
          </View>
          <Text style={styles.statLabel}>Aulas assistidas</Text>
          <Text style={styles.statValue}>{watchedClasses}</Text>
        </View>

        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Trophy size={18} color="#4089FF" strokeWidth={2} />
          </View>
          <Text style={styles.statLabel}>Ranking</Text>
          <Text style={styles.statValue}>{ranking}° lugar</Text>
        </View>
      </View>

      <View style={styles.tasksSection}>
        <View style={styles.tasksHeader}>
          <View style={styles.tasksIconContainer}>
            <CheckSquare size={16} color="#4089FF" strokeWidth={2} />
          </View>
          <Text style={styles.tasksTitle}>Tarefas realizadas</Text>
        </View>
        
        <View style={styles.tasksProgressContainer}>
          <Text style={styles.tasksFraction}>
            {tasksCompleted} / {totalTasks}
          </Text>
          <View style={styles.tasksProgressBar}>
            <View
              style={[
                styles.tasksProgressFill,
                { width: `${tasksPercentage}%` },
              ]}
            />
          </View>
          <Text style={styles.tasksPercentage}>{tasksPercentage}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(42, 42, 42, 0.5)",
    gap: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(64, 137, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.3)",
  },
  iconText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4089FF",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.95)",
    letterSpacing: 0.3,
  },
  levelSection: {
    alignItems: "center",
    gap: 16,
  },
  levelText: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    letterSpacing: 0.5,
  },
  circularProgressContainer: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  svg: {
    position: "absolute",
  },
  medalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  medalBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(42, 42, 42, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(51, 51, 51, 0.4)",
  },
  medalEmoji: {
    fontSize: 32,
  },
  progressTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  progressLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.7)",
  },
  progressDot: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
  },
  progressValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4089FF",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(64, 137, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
  },
  statValue: {
    fontSize: 17,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.95)",
    letterSpacing: -0.5,
  },
  tasksSection: {
    backgroundColor: "rgba(42, 42, 42, 0.3)",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.3)",
  },
  tasksHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tasksIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(64, 137, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  tasksTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.85)",
  },
  tasksProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  tasksFraction: {
    fontSize: 15,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.95)",
    minWidth: 52,
  },
  tasksProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(51, 51, 51, 0.5)",
    borderRadius: 3,
    overflow: "hidden",
  },
  tasksProgressFill: {
    height: "100%",
    backgroundColor: "#4089FF",
    borderRadius: 3,
  },
  tasksPercentage: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4089FF",
    minWidth: 46,
    textAlign: "right",
  },
});
