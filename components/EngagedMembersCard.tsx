import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Trophy, Info, X } from "lucide-react-native";
import Colors from "@/constants/colors";

interface Member {
  id: string;
  name: string;
  points: number;
  avatar: string;
  rank: number;
}

interface EngagedMembersCardProps {
  onViewFullRanking?: () => void;
}

const MOCK_MEMBERS: Member[] = [
  {
    id: "1",
    name: "Ana Silva",
    points: 2845,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    rank: 1,
  },
  {
    id: "2",
    name: "Carlos Souza",
    points: 2634,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    rank: 2,
  },
  {
    id: "3",
    name: "Marina Costa",
    points: 2401,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    rank: 3,
  },
  {
    id: "4",
    name: "Rafael Lima",
    points: 2187,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    rank: 4,
  },
  {
    id: "5",
    name: "Juliana Reis",
    points: 1956,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    rank: 5,
  },
];

const PERIODS = ["Semana", "Mês", "Trimestre", "Anual"] as const;
type Period = (typeof PERIODS)[number];

export default function EngagedMembersCard({
  onViewFullRanking,
}: EngagedMembersCardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("Semana");
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  const renderMemberItem = (member: Member) => {
    const isTopThree = member.rank <= 3;

    return (
      <View key={member.id} style={styles.memberItem}>
        <View style={styles.memberRank}>
          <Text style={styles.rankText}>{member.rank}º</Text>
        </View>

        <View style={[styles.avatarWrapper, isTopThree && styles.topThreeAvatar]}>
          {isTopThree && (
            <View style={styles.dottedBorder}>
              <View style={styles.dottedCircle} />
            </View>
          )}
          <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
        </View>

        <Text style={styles.memberName}>{member.name}</Text>

        <View style={styles.pointsBadge}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.pointsGradient}
          >
            <Text style={styles.pointsText}>{member.points.toLocaleString()} XP</Text>
          </LinearGradient>
        </View>
      </View>
    );
  };

  return (
    <>
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
              <View style={styles.titleContainer}>
                <View style={styles.iconWrapper}>
                  <View style={styles.iconGlow} />
                  <Trophy size={20} color={Colors.primary} strokeWidth={2.5} />
                </View>
                <Text style={styles.title}>Mais Engajados</Text>
              </View>

              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => setInfoModalVisible(true)}
                activeOpacity={0.7}
              >
                <Info size={20} color={Colors.text.secondary} strokeWidth={2} />
              </TouchableOpacity>
            </View>

            <View style={styles.filtersContainer}>
              {PERIODS.map((period) => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.filterButton,
                    selectedPeriod === period && styles.filterButtonActive,
                  ]}
                  onPress={() => setSelectedPeriod(period)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.filterText,
                      selectedPeriod === period && styles.filterTextActive,
                    ]}
                  >
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.membersContainer}>
              {MOCK_MEMBERS.map(renderMemberItem)}
            </View>

            <TouchableOpacity
              style={styles.viewRankingButton}
              onPress={onViewFullRanking}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.primaryLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Ver o Ranking Completo</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </LinearGradient>
      </View>

      <Modal
        visible={infoModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setInfoModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setInfoModalVisible(false)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <LinearGradient
              colors={[
                "rgba(26, 26, 26, 0.98)",
                "rgba(30, 30, 30, 0.98)",
                "rgba(22, 22, 22, 0.98)",
              ]}
              style={styles.modalGradient}
            >
              <BlurView intensity={80} style={styles.modalBlur}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Regras da Gamificação</Text>
                  <TouchableOpacity
                    onPress={() => setInfoModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <X size={24} color={Colors.text.secondary} strokeWidth={2} />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.ruleItem}>
                    <View style={styles.ruleDot} />
                    <Text style={styles.ruleText}>
                      Complete tarefas e aulas para ganhar XP
                    </Text>
                  </View>

                  <View style={styles.ruleItem}>
                    <View style={styles.ruleDot} />
                    <Text style={styles.ruleText}>
                      Quanto mais ativo, mais pontos você acumula
                    </Text>
                  </View>

                  <View style={styles.ruleItem}>
                    <View style={styles.ruleDot} />
                    <Text style={styles.ruleText}>
                      O ranking é atualizado em tempo real
                    </Text>
                  </View>

                  <View style={styles.ruleItem}>
                    <View style={styles.ruleDot} />
                    <Text style={styles.ruleText}>
                      Os 3 primeiros colocados recebem destaque especial
                    </Text>
                  </View>

                  <View style={styles.ruleItem}>
                    <View style={styles.ruleDot} />
                    <Text style={styles.ruleText}>
                      Participe de eventos para ganhar pontos extras
                    </Text>
                  </View>
                </View>
              </BlurView>
            </LinearGradient>
          </Pressable>
        </Pressable>
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
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(64, 137, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.2)",
    position: "relative",
  },
  iconGlow: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    opacity: 0.15,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  infoButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(42, 42, 42, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.3)",
  },
  filtersContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(42, 42, 42, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.3)",
  },
  filterButtonActive: {
    backgroundColor: "rgba(64, 137, 255, 0.15)",
    borderColor: "rgba(64, 137, 255, 0.3)",
  },
  filterText: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.text.secondary,
  },
  filterTextActive: {
    color: Colors.primary,
    fontWeight: "600",
  },
  membersContainer: {
    gap: 12,
    marginBottom: 20,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  memberRank: {
    width: 32,
    alignItems: "flex-start",
  },
  rankText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.secondary,
  },
  avatarWrapper: {
    position: "relative",
    width: 48,
    height: 48,
  },
  topThreeAvatar: {
    width: 52,
    height: 52,
  },
  dottedBorder: {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 28,
    overflow: "hidden",
  },
  dottedCircle: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: "dashed",
  },
  memberAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    backgroundColor: "#1a1a1a",
  },
  memberName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: Colors.text.primary,
  },
  pointsBadge: {
    borderRadius: 20,
    overflow: "hidden",
  },
  pointsGradient: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  pointsText: {
    fontSize: 13,
    fontWeight: "600",
    color: "white",
  },
  viewRankingButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
    letterSpacing: -0.3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.2)",
  },
  modalGradient: {
    padding: 2,
  },
  modalBlur: {
    borderRadius: 22,
    overflow: "hidden",
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(42, 42, 42, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.3)",
  },
  modalBody: {
    gap: 20,
  },
  ruleItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  ruleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 6,
  },
  ruleText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "400",
    color: Colors.text.secondary,
    lineHeight: 22,
  },
});
