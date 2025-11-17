import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { MapPin, Calendar, Clock, Link as LinkIcon } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Colors from "@/constants/colors";

interface EventCardProps {
  title: string;
  description: string;
  link: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function EventCard({
  title,
  description,
  link,
  location,
  date,
  startTime,
  endTime,
}: EventCardProps) {
  const handleLinkPress = () => {
    if (link) {
      Linking.openURL(link);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(26, 26, 26, 0.8)", "rgba(30, 30, 30, 0.6)", "rgba(22, 22, 22, 0.8)"]}
        style={styles.cardGradient}
      >
        <BlurView intensity={30} style={styles.blurContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            
            <Text style={styles.description}>{description}</Text>
            
            <View style={styles.divider} />
            
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                  <MapPin size={16} color={Colors.primary} strokeWidth={2.5} />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Local</Text>
                  <Text style={styles.infoValue}>{location}</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                  <Calendar size={16} color={Colors.primary} strokeWidth={2.5} />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Data do evento</Text>
                  <Text style={styles.infoValue}>{date}</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                  <Clock size={16} color={Colors.primary} strokeWidth={2.5} />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Horário</Text>
                  <Text style={styles.infoValue}>
                    Começo: {startTime} • Término: {endTime}
                  </Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.linkButton} 
              onPress={handleLinkPress}
              activeOpacity={0.7}
            >
              <View style={styles.linkIconContainer}>
                <LinkIcon size={16} color={Colors.primary} strokeWidth={2.5} />
              </View>
              <View style={styles.linkTextContainer}>
                <Text style={styles.linkLabel}>Link</Text>
                <Text style={styles.linkValue} numberOfLines={1}>
                  {link}
                </Text>
              </View>
            </TouchableOpacity>
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
  content: {
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(51, 51, 51, 0.3)",
    marginVertical: 8,
  },
  infoSection: {
    gap: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(64, 137, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.2)",
  },
  infoTextContainer: {
    flex: 1,
    gap: 2,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.text.secondary,
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.primary,
    lineHeight: 20,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 4,
  },
  linkIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(64, 137, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.2)",
  },
  linkTextContainer: {
    flex: 1,
    gap: 2,
  },
  linkLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.text.secondary,
    opacity: 0.7,
  },
  linkValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
    textDecorationLine: "underline",
  },
});
