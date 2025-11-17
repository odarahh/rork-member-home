import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckSquare } from "lucide-react-native";
import Colors from "@/constants/colors";

interface TaskProgressProps {
  completed: number;
  total: number;
}

export default function TaskProgress({ completed, total }: TaskProgressProps) {
  const percentage = Math.round((completed / total) * 100);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <CheckSquare size={20} color={Colors.primary} strokeWidth={2} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Tarefas realizadas</Text>
          <Text style={styles.fraction}>
            {completed} / {total}
          </Text>
        </View>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${percentage}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "rgba(42, 42, 42, 0.3)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.3)",
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(64, 137, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.2)",
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.primary,
    opacity: 0.9,
  },
  fraction: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  percentage: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "rgba(51, 51, 51, 0.5)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
});
