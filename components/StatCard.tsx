import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/colors";
import { LucideIcon } from "lucide-react-native";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconColor?: string;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  iconColor = Colors.primary,
}: StatCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon size={24} color={iconColor} strokeWidth={2} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(64, 137, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.2)",
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.text.secondary,
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
});
