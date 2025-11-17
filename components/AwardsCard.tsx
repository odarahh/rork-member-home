import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Award, CheckCircle, Calendar, Trophy, Gift, Star } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Colors from "@/constants/colors";

interface AwardItem {
  id: string;
  icon: "trophy" | "gift" | "star" | "award";
  name: string;
  redeemDate: string;
  available: boolean;
}

const ICON_MAP = {
  trophy: Trophy,
  gift: Gift,
  star: Star,
  award: Award,
};

const mockAwards: AwardItem[] = [
  {
    id: "1",
    icon: "trophy",
    name: "Mentoria individual",
    redeemDate: "13/04/24",
    available: false,
  },
  {
    id: "2",
    icon: "star",
    name: "Conteúdo exclusivo",
    redeemDate: "",
    available: true,
  },
  {
    id: "3",
    icon: "gift",
    name: "Aula ao vivo",
    redeemDate: "",
    available: true,
  },
  {
    id: "4",
    icon: "award",
    name: "Link de recompensa",
    redeemDate: "",
    available: true,
  },
];

export default function AwardsCard() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(26, 26, 26, 0.8)", "rgba(30, 30, 30, 0.6)", "rgba(22, 22, 22, 0.8)"]}
        style={styles.cardGradient}
      >
        <BlurView intensity={30} style={styles.blurContainer}>
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <View style={styles.iconGlow} />
              <Award size={20} color={Colors.primary} strokeWidth={2.5} />
            </View>
            <Text style={styles.headerTitle}>Premiações</Text>
          </View>

          <View style={styles.divider} />

          <ScrollView 
            style={styles.awardsList}
            showsVerticalScrollIndicator={false}
          >
            {mockAwards.map((award, index) => {
              const IconComponent = ICON_MAP[award.icon];
              const isLast = index === mockAwards.length - 1;

              return (
                <View key={award.id}>
                  <View style={styles.awardItem}>
                    <View style={styles.awardIconContainer}>
                      <View
                        style={[
                          styles.awardIconWrapper,
                          award.available && styles.awardIconWrapperAvailable,
                        ]}
                      >
                        <IconComponent
                          size={20}
                          color={award.available ? Colors.primary : Colors.text.secondary}
                          strokeWidth={2.5}
                        />
                      </View>
                    </View>

                    <View style={styles.awardContent}>
                      <View style={styles.awardTextContainer}>
                        <Text style={styles.awardName}>{award.name}</Text>

                        {award.redeemDate ? (
                          <View style={styles.awardDateRow}>
                            <Calendar
                              size={12}
                              color={Colors.text.secondary}
                              strokeWidth={2.5}
                            />
                            <Text style={styles.awardDate}>
                              Capturada {award.redeemDate}
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.availabilityBadge}>
                            <View style={styles.availabilityDot} />
                            <Text style={styles.availabilityText}>Disponível</Text>
                          </View>
                        )}
                      </View>

                      {!award.available && (
                        <View style={styles.checkmarkContainer}>
                          <CheckCircle
                            size={20}
                            color={Colors.primary}
                            strokeWidth={2.5}
                          />
                        </View>
                      )}
                    </View>
                  </View>

                  {!isLast && <View style={styles.itemDivider} />}
                </View>
              );
            })}
          </ScrollView>
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
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(64, 137, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.2)",
    position: "relative",
  },
  iconGlow: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    opacity: 0.15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(51, 51, 51, 0.3)",
    marginVertical: 20,
  },
  awardsList: {
    maxHeight: 400,
  },
  awardItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 12,
  },
  awardIconContainer: {
    width: 48,
    height: 48,
  },
  awardIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(51, 51, 51, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.5)",
  },
  awardIconWrapperAvailable: {
    backgroundColor: "rgba(64, 137, 255, 0.1)",
    borderColor: "rgba(64, 137, 255, 0.3)",
  },
  awardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  awardTextContainer: {
    flex: 1,
    gap: 6,
  },
  awardName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
    letterSpacing: -0.3,
  },
  awardDateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  awardDate: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.text.secondary,
    opacity: 0.7,
  },
  availabilityBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(64, 137, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.2)",
  },
  availabilityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  checkmarkContainer: {
    marginLeft: 8,
  },
  itemDivider: {
    height: 1,
    backgroundColor: "rgba(51, 51, 51, 0.2)",
    marginLeft: 64,
  },
});
