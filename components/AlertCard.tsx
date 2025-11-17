import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { AlertCircle, X } from "lucide-react-native";
import Colors from "@/constants/colors";

interface Alert {
  title: string;
  description: string;
}

interface AlertCardProps {
  alerts: Alert[];
}

export default function AlertCard({ alerts }: AlertCardProps) {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mural de avisos</Text>
      </View>

      <View style={styles.card}>
        <LinearGradient
          colors={[
            "rgba(26, 26, 26, 0.8)",
            "rgba(30, 30, 30, 0.6)",
            "rgba(22, 22, 22, 0.8)",
          ]}
          style={styles.cardGradient}
        >
          <BlurView intensity={20} style={styles.blurContainer}>
            <View style={styles.alertsContainer}>
              {alerts.map((alert, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity 
                      style={styles.alertItem}
                      onPress={() => setSelectedAlert(alert)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.iconContainer}>
                        <AlertCircle size={18} color={Colors.primary} strokeWidth={2.5} />
                      </View>
                      
                      <View style={styles.alertContent}>
                        <Text style={styles.alertTitle}>
                          {alert.title}
                        </Text>
                        <Text style={styles.alertDescription} numberOfLines={2}>
                          {alert.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    
                    {index < alerts.length - 1 && (
                      <View style={styles.divider} />
                    )}
                  </View>
                );
              })}
            </View>
          </BlurView>
        </LinearGradient>
      </View>

      <Modal
        visible={selectedAlert !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedAlert(null)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setSelectedAlert(null)}
        >
          <Pressable 
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <LinearGradient
              colors={["rgba(26, 26, 26, 0.98)", "rgba(30, 30, 30, 0.98)", "rgba(22, 22, 22, 0.98)"]}
              style={styles.modalGradient}
            >
              <BlurView intensity={50} style={styles.modalBlur}>
                <View style={styles.modalHeader}>
                  <View style={styles.modalIconContainer}>
                    <View style={styles.modalIconGlow} />
                    <AlertCircle size={28} color={Colors.primary} strokeWidth={2.5} />
                  </View>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setSelectedAlert(null)}
                    activeOpacity={0.7}
                  >
                    <X size={24} color={Colors.text.primary} strokeWidth={2} />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <Text style={styles.modalTitle}>
                    {selectedAlert?.title}
                  </Text>

                  <View style={styles.modalDivider} />

                  <Text style={styles.modalDescription}>
                    {selectedAlert?.description}
                  </Text>
                </View>
              </BlurView>
            </LinearGradient>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  card: {
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
  alertsContainer: {
    gap: 0,
  },
  alertItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    paddingVertical: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "rgba(64, 137, 255, 0.15)",
  },
  alertContent: {
    flex: 1,
    gap: 6,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.3,
    lineHeight: 22,
    color: Colors.primary,
  },
  alertDescription: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.text.secondary,
    lineHeight: 20,
    letterSpacing: -0.1,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(51, 51, 51, 0.3)",
    marginLeft: 50,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 480,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.3)",
  },
  modalGradient: {
    padding: 2,
  },
  modalBlur: {
    borderRadius: 22,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    paddingBottom: 16,
  },
  modalIconContainer: {
    position: "relative",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(64, 137, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.2)",
  },
  modalIconGlow: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    opacity: 0.2,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(64, 137, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.2)",
  },
  modalBody: {
    padding: 24,
    paddingTop: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  modalDivider: {
    height: 1,
    backgroundColor: "rgba(64, 137, 255, 0.2)",
    marginVertical: 20,
  },
  modalDescription: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.text.primary,
    lineHeight: 24,
    opacity: 0.9,
  },
});
