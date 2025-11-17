import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import { Target, Users, X } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Colors from "@/constants/colors";

interface ChallengeActivity {
  id: string;
  name: string;
  completed: boolean;
}

interface Challenge {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  bannerImage: string;
  progress: number;
  activities: ChallengeActivity[];
  rules: string[];
  participants: number;
  color: string;
  isParticipating: boolean;
}

interface ChallengeCardProps {
  challenge: Challenge;
  onParticipate?: (challengeId: string) => void;
}

export default function ChallengeCard({
  challenge,
  onParticipate,
}: ChallengeCardProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleButtonPress = () => {
    setModalVisible(true);
  };

  const handleParticipate = () => {
    onParticipate?.(challenge.id);
    setModalVisible(false);
  };

  const completedActivities = challenge.activities.filter(a => a.completed).length;
  const totalActivities = challenge.activities.length;

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          colors={["rgba(26, 26, 26, 0.8)", "rgba(30, 30, 30, 0.6)", "rgba(22, 22, 22, 0.8)"]}
          style={styles.cardGradient}
        >
          <BlurView intensity={30} style={styles.blurContainer}>
            <View style={styles.bannerContainer}>
              <Image
                source={{ uri: challenge.bannerImage }}
                style={styles.banner}
                resizeMode="cover"
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
                style={styles.bannerOverlay}
              />
            </View>

            <View style={styles.content}>
              <View style={styles.titleSection}>
                <Text style={styles.title}>{challenge.name}</Text>
                <Text style={styles.subtitle}>{challenge.subtitle}</Text>
              </View>

              {challenge.isParticipating && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>Progresso</Text>
                    <Text style={styles.progressValue}>{challenge.progress}%</Text>
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarBackground}>
                      <LinearGradient
                        colors={[challenge.color, `${challenge.color}CC`]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.progressBar, { width: `${challenge.progress}%` }]}
                      />
                    </View>
                  </View>
                </View>
              )}

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <View style={[styles.statIcon, { backgroundColor: `${challenge.color}1A` }]}>
                    <Target size={16} color={challenge.color} strokeWidth={2.5} />
                  </View>
                  <View style={styles.statTextContainer}>
                    <Text style={styles.statLabel}>Missões</Text>
                    <Text style={styles.statValue}>
                      {completedActivities}/{totalActivities}
                    </Text>
                  </View>
                </View>

                <View style={styles.statItem}>
                  <View style={[styles.statIcon, { backgroundColor: `${challenge.color}1A` }]}>
                    <Users size={16} color={challenge.color} strokeWidth={2.5} />
                  </View>
                  <View style={styles.statTextContainer}>
                    <Text style={styles.statLabel}>Participantes</Text>
                    <Text style={styles.statValue}>
                      {challenge.participants.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: `${challenge.color}1A` }]}
                onPress={handleButtonPress}
                activeOpacity={0.7}
              >
                <Text style={[styles.buttonText, { color: challenge.color }]}>
                  Ver Desafio
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </LinearGradient>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={40} style={styles.modalBlur}>
            <View style={styles.modalContainer}>
              <LinearGradient
                colors={["rgba(26, 26, 26, 0.95)", "rgba(30, 30, 30, 0.95)", "rgba(22, 22, 22, 0.95)"]}
                style={styles.modalGradient}
              >
                <ScrollView
                  style={styles.modalScroll}
                  contentContainerStyle={styles.modalContent}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.modalHeader}>
                    <View style={styles.modalBannerContainer}>
                      <Image
                        source={{ uri: challenge.bannerImage }}
                        style={styles.modalBanner}
                        resizeMode="cover"
                      />
                      <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.9)"]}
                        style={styles.modalBannerOverlay}
                      />
                    </View>

                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalVisible(false)}
                      activeOpacity={0.7}
                    >
                      <X size={20} color={Colors.text.primary} strokeWidth={2.5} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.modalBody}>
                    <Text style={styles.modalTitle}>{challenge.name}</Text>
                    <Text style={styles.modalSubtitle}>{challenge.subtitle}</Text>

                    <View style={styles.divider} />

                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Descrição</Text>
                      <Text style={styles.sectionText}>{challenge.description}</Text>
                    </View>

                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Missões e Atividades</Text>
                      <View style={styles.activitiesList}>
                        {challenge.activities.map((activity, index) => (
                          <View key={activity.id} style={styles.activityItem}>
                            <View
                              style={[
                                styles.activityBullet,
                                {
                                  backgroundColor: activity.completed
                                    ? challenge.color
                                    : "rgba(51, 51, 51, 0.5)",
                                },
                              ]}
                            />
                            <Text
                              style={[
                                styles.activityText,
                                activity.completed && styles.activityTextCompleted,
                              ]}
                            >
                              {activity.name}
                            </Text>
                          </View>
                        ))}
                      </View>
                      <Text style={styles.activitiesCount}>
                        {completedActivities} de {totalActivities} concluídas
                      </Text>
                    </View>

                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Regras</Text>
                      <View style={styles.rulesList}>
                        {challenge.rules.map((rule, index) => (
                          <View key={index} style={styles.ruleItem}>
                            <Text style={styles.ruleNumber}>{index + 1}.</Text>
                            <Text style={styles.ruleText}>{rule}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    <View style={styles.section}>
                      <View style={styles.participantsContainer}>
                        <View style={[styles.participantsIcon, { backgroundColor: `${challenge.color}1A` }]}>
                          <Users size={20} color={challenge.color} strokeWidth={2.5} />
                        </View>
                        <View>
                          <Text style={styles.participantsLabel}>Participantes</Text>
                          <Text style={styles.participantsValue}>
                            {challenge.participants.toLocaleString()} membros
                          </Text>
                        </View>
                      </View>
                    </View>

                    {!challenge.isParticipating && (
                      <TouchableOpacity
                        style={[styles.participateButton, { backgroundColor: challenge.color }]}
                        onPress={handleParticipate}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.participateButtonText}>Participar do Desafio</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </ScrollView>
              </LinearGradient>
            </View>
          </BlurView>
        </View>
      </Modal>
    </>
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
  },
  bannerContainer: {
    height: 160,
    position: "relative",
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  titleSection: {
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text.secondary,
  },
  progressContainer: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.text.secondary,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text.primary,
  },
  progressBarContainer: {
    height: 6,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "rgba(51, 51, 51, 0.3)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  statsRow: {
    flexDirection: "row",
    gap: 16,
  },
  statItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  statTextContainer: {
    flex: 1,
    gap: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: Colors.text.secondary,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text.primary,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalBlur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 500,
    maxHeight: "90%",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.2)",
  },
  modalGradient: {
    flex: 1,
  },
  modalScroll: {
    flex: 1,
  },
  modalContent: {
    paddingBottom: 20,
  },
  modalHeader: {
    position: "relative",
  },
  modalBannerContainer: {
    height: 200,
  },
  modalBanner: {
    width: "100%",
    height: "100%",
  },
  modalBannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalBody: {
    padding: 24,
    gap: 20,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  modalSubtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(51, 51, 51, 0.3)",
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.3,
  },
  sectionText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  activitiesList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  activityBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activityText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text.secondary,
    flex: 1,
  },
  activityTextCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  activitiesCount: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
    marginTop: 4,
  },
  rulesList: {
    gap: 12,
  },
  ruleItem: {
    flexDirection: "row",
    gap: 8,
  },
  ruleNumber: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primary,
    width: 20,
  },
  ruleText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.text.secondary,
    lineHeight: 22,
    flex: 1,
  },
  participantsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: "rgba(42, 42, 42, 0.3)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.3)",
  },
  participantsIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  participantsLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.text.secondary,
  },
  participantsValue: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text.primary,
  },
  participateButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  participateButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
});
