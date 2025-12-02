import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Colors from "@/constants/colors";

interface CalendarEvent {
  date: number;
  type: "current" | "selected" | "event";
}

export default function CalendarCard() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 5));

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const isCurrentDay = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === 5 &&
      currentDate.getMonth() === 10 &&
      currentDate.getFullYear() === 2025
    );
  };

  const isSelectedDay = (day: number | null) => {
    if (!day) return false;
    return day === 17;
  };

  const hasEvent = (day: number | null) => {
    if (!day) return false;
    return day === 18;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(26, 26, 26, 0.8)",
          "rgba(30, 30, 30, 0.6)",
          "rgba(22, 22, 22, 0.8)",
        ]}
        style={styles.cardGradient}
      >
        <BlurView intensity={30} style={styles.blurContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handlePrevMonth}
              style={styles.navButton}
              activeOpacity={0.7}
            >
              <ChevronLeft size={20} color={Colors.text.primary} strokeWidth={2.5} />
            </TouchableOpacity>

            <Text style={styles.monthYear}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>

            <TouchableOpacity
              onPress={handleNextMonth}
              style={styles.navButton}
              activeOpacity={0.7}
            >
              <ChevronRight size={20} color={Colors.text.primary} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          <View style={styles.calendar}>
            <View style={styles.weekDays}>
              {daysOfWeek.map((day) => (
                <View key={day} style={styles.weekDayCell}>
                  <Text style={styles.weekDayText}>{day}</Text>
                </View>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {days.map((day, index) => {
                const isCurrent = isCurrentDay(day);
                const isSelected = isSelectedDay(day);
                const hasEventIndicator = hasEvent(day);

                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.dayCell}
                    activeOpacity={day ? 0.7 : 1}
                    disabled={!day}
                  >
                    {day ? (
                      <View style={styles.dayContent}>
                        {isCurrent && (
                          <View style={styles.currentDayCircle}>
                            <Text style={styles.currentDayText}>{day}</Text>
                          </View>
                        )}
                        {isSelected && (
                          <View style={styles.selectedDayCircle}>
                            <Text style={styles.selectedDayText}>{day}</Text>
                            {hasEventIndicator && (
                              <View style={styles.eventDot} />
                            )}
                          </View>
                        )}
                        {hasEventIndicator && !isSelected && (
                          <View style={styles.eventDayCircle}>
                            <Text style={styles.eventDayText}>{day}</Text>
                            <View style={styles.eventDot} />
                          </View>
                        )}
                        {!isCurrent && !isSelected && !hasEventIndicator && (
                          <Text style={styles.dayText}>{day}</Text>
                        )}
                      </View>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </BlurView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(42, 42, 42, 0.5)",
  },
  cardGradient: {
    padding: 2,
  },
  blurContainer: {
    borderRadius: 22,
    overflow: "hidden",
    padding: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(64, 137, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.1)",
  },
  monthYear: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  calendar: {
    gap: 16,
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 8,
  },
  weekDayCell: {
    width: 36,
    alignItems: "center",
  },
  weekDayText: {
    fontSize: 11,
    fontWeight: "500",
    color: Colors.text.secondary,
    opacity: 0.6,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
  },
  dayCell: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  dayContent: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text.primary,
  },
  currentDayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(42, 42, 42, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.2)",
  },
  currentDayText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  selectedDayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  selectedDayText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
  },
  eventDayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  eventDayText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
  },
  eventDot: {
    position: "absolute",
    bottom: 3,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ffffff",
  },
});
