import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Heart, Star, Award, Play, X } from "lucide-react-native";
import Colors from "@/constants/colors";

interface Content {
  id: string;
  title: string;
  banner: string;
  progress: number;
  currentLesson: number;
  totalLessons: number;
  isLiked: boolean;
  isFavorited: boolean;
  userRating?: number;
}

interface ContinueWatchingCardProps {
  content: Content;
  onAccessContent?: (contentId: string) => void;
  onToggleLike?: (contentId: string) => void;
  onToggleFavorite?: (contentId: string) => void;
  onRate?: (contentId: string, rating: number, comment: string) => void;
  onGetCertificate?: (contentId: string) => void;
}

export default function ContinueWatchingCard({
  content,
  onAccessContent,
  onToggleLike,
  onToggleFavorite,
  onRate,
  onGetCertificate,
}: ContinueWatchingCardProps) {
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(content.userRating || 0);
  const [comment, setComment] = useState("");

  const handleToggleLike = () => {
    console.log(`Toggling like for content: ${content.id}`);
    onToggleLike?.(content.id);
  };

  const handleToggleFavorite = () => {
    console.log(`Toggling favorite for content: ${content.id}`);
    onToggleFavorite?.(content.id);
  };



  const handleSubmitRating = () => {
    if (selectedRating > 0) {
      onRate?.(content.id, selectedRating, comment);
      setRatingModalVisible(false);
    }
  };

  const handleAccessContent = () => {
    onAccessContent?.(content.id);
  };

  const handleGetCertificate = () => {
    onGetCertificate?.(content.id);
  };

  const isCompleted = content.progress >= 100;

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
                source={{ uri: content.banner }}
                style={styles.banner}
                resizeMode="cover"
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.9)"]}
                style={styles.bannerOverlay}
              />
              <View style={styles.playIconOverlay}>
                <View style={styles.playIconBackground}>
                  <Play size={28} color="white" strokeWidth={2.5} fill="white" />
                </View>
              </View>
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>{content.title}</Text>

              <View style={styles.progressSection}>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressText}>
                    {content.currentLesson}/{content.totalLessons} aulas
                  </Text>
                  <Text style={styles.progressPercentage}>{content.progress}%</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBarBackground}>
                    <LinearGradient
                      colors={[Colors.primary, Colors.primaryLight]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[styles.progressBar, { width: `${content.progress}%` }]}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.actionsRow}>
                <View style={styles.iconsContainer}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={handleToggleLike}
                    activeOpacity={0.7}
                  >
                    <Heart
                      size={22}
                      color={content.isLiked ? "#FF6B6B" : Colors.text.secondary}
                      strokeWidth={2}
                      fill={content.isLiked ? "#FF6B6B" : "transparent"}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={handleToggleFavorite}
                    activeOpacity={0.7}
                  >
                    <Star
                      size={22}
                      color={content.isFavorited ? "#FFB800" : Colors.text.secondary}
                      strokeWidth={2}
                      fill={content.isFavorited ? "#FFB800" : "transparent"}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonsContainer}>
                  {isCompleted && (
                    <TouchableOpacity
                      style={styles.certificateButton}
                      onPress={handleGetCertificate}
                      activeOpacity={0.8}
                    >
                      <Award size={18} color={Colors.primary} strokeWidth={2.5} />
                      <Text style={styles.certificateButtonText}>Certificado</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={styles.accessButton}
                    onPress={handleAccessContent}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={[Colors.primary, Colors.primaryLight]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.buttonGradient}
                    >
                      <Text style={styles.accessButtonText}>Acessar</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </BlurView>
        </LinearGradient>
      </View>

      <Modal
        visible={ratingModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setRatingModalVisible(false)}
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
                  <Text style={styles.modalTitle}>Avaliar Conteúdo</Text>
                  <TouchableOpacity
                    onPress={() => setRatingModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <X size={24} color={Colors.text.secondary} strokeWidth={2} />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity
                        key={star}
                        onPress={() => setSelectedRating(star)}
                        activeOpacity={0.7}
                        style={styles.starButton}
                      >
                        <Star
                          size={40}
                          color={star <= selectedRating ? "#FFB800" : Colors.text.secondary}
                          strokeWidth={2}
                          fill={star <= selectedRating ? "#FFB800" : "transparent"}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.commentContainer}>
                    <Text style={styles.commentLabel}>Comentário (opcional)</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.commentInput}
                        placeholder="Compartilhe sua opinião sobre o conteúdo..."
                        placeholderTextColor={Colors.text.secondary}
                        value={comment}
                        onChangeText={setComment}
                        multiline={true}
                        numberOfLines={4}
                        textAlignVertical="top"
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.submitButton,
                      selectedRating === 0 && styles.submitButtonDisabled,
                    ]}
                    onPress={handleSubmitRating}
                    activeOpacity={0.8}
                    disabled={selectedRating === 0}
                  >
                    <LinearGradient
                      colors={
                        selectedRating === 0
                          ? ["rgba(64, 137, 255, 0.3)", "rgba(96, 165, 255, 0.3)"]
                          : [Colors.primary, Colors.primaryLight]
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.submitButtonGradient}
                    >
                      <Text
                        style={[
                          styles.submitButtonText,
                          selectedRating === 0 && styles.submitButtonTextDisabled,
                        ]}
                      >
                        Enviar Avaliação
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
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
  },
  bannerContainer: {
    height: 180,
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
    height: 100,
  },
  playIconOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  playIconBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(64, 137, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.5,
    lineHeight: 24,
  },
  progressSection: {
    gap: 8,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressText: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.text.secondary,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primary,
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
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(42, 42, 42, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.3)",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
    flexShrink: 1,
  },
  certificateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "rgba(64, 137, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.3)",
  },
  certificateButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primary,
  },
  accessButton: {
    borderRadius: 14,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  accessButtonText: {
    fontSize: 13,
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
    marginBottom: 32,
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
    gap: 28,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  starButton: {
    padding: 4,
  },
  commentContainer: {
    gap: 12,
  },
  commentLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  inputWrapper: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.3)",
    backgroundColor: "rgba(42, 42, 42, 0.3)",
    overflow: "hidden",
  },
  commentInput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.text.primary,
    minHeight: 100,
  },
  submitButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    letterSpacing: -0.3,
  },
  submitButtonTextDisabled: {
    opacity: 0.6,
  },
});
