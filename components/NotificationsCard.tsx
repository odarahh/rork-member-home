import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";
import Colors from "@/constants/colors";

interface Notification {
  id: string;
  memberName: string;
  memberImage: string;
  courseName: string;
  postText: string;
  timeAgo: string;
  isRead: boolean;
  category: "community" | "course";
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    memberName: "Ana Silva",
    memberImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    courseName: "React Avançado",
    postText: "Acabei de implementar um hook customizado para gerenciar estado complexo...",
    timeAgo: "5 min",
    isRead: false,
    category: "course",
  },
  {
    id: "2",
    memberName: "Carlos Mendoza",
    memberImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    courseName: "JavaScript ES6+",
    postText: "Compartilhando uma dica sobre destructuring que descobri hoje...",
    timeAgo: "12 min",
    isRead: false,
    category: "course",
  },
  {
    id: "3",
    memberName: "Julia Fernandes",
    memberImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    courseName: "Comunidade Geral",
    postText: "Evento de networking tech na próxima semana! Quem vai participar?",
    timeAgo: "4h",
    isRead: false,
    category: "community",
  },
  {
    id: "4",
    memberName: "Rafael Lima",
    memberImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    courseName: "TypeScript Masterclass",
    postText: "Dúvida sobre generics em TypeScript. Alguém pode ajudar com um exemplo?",
    timeAgo: "15 min",
    isRead: true,
    category: "course",
  },
  {
    id: "5",
    memberName: "Marina Costa",
    memberImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    courseName: "Node.js Backend",
    postText: "Implementei uma API REST completa com autenticação JWT. Compartilhando o código...",
    timeAgo: "1h",
    isRead: true,
    category: "course",
  },
  {
    id: "6",
    memberName: "Pedro Santos",
    memberImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    courseName: "Comunidade Geral",
    postText: "Quem está participando do hackathon deste mês? Vamos formar equipes!",
    timeAgo: "2h",
    isRead: true,
    category: "community",
  },
];

type TabType = "unread" | "all" | "community" | "courses";

export default function NotificationsCard() {
  const [activeTab, setActiveTab] = useState<TabType>("unread");
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const filteredNotifications = MOCK_NOTIFICATIONS.filter((notification) => {
    if (activeTab === "unread") return !notification.isRead;
    if (activeTab === "all") return true;
    if (activeTab === "community") return notification.category === "community";
    if (activeTab === "courses") return notification.category === "course";
    return true;
  });

  const tabs = [
    { id: "unread" as TabType, label: "Não lidas" },
    { id: "all" as TabType, label: "Todas" },
    { id: "community" as TabType, label: "Comunidade" },
    { id: "courses" as TabType, label: "Cursos" },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(26, 26, 26, 0.8)", "rgba(30, 30, 30, 0.6)", "rgba(22, 22, 22, 0.8)"]}
        style={styles.cardGradient}
      >
        <BlurView intensity={30} style={styles.blurContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsContainer}
            contentContainerStyle={styles.tabsContent}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  activeTab === tab.id && styles.tabActive,
                ]}
                onPress={() => setActiveTab(tab.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab.id && styles.tabTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.divider} />

          <ScrollView
            style={styles.notificationsContainer}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {filteredNotifications.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  Nenhuma notificação encontrada
                </Text>
              </View>
            ) : (
              filteredNotifications.map((notification, index) => (
                <View key={notification.id}>
                  <NotificationItem 
                    notification={notification} 
                    onPress={() => setSelectedNotification(notification)}
                  />
                  {index < filteredNotifications.length - 1 && (
                    <View style={styles.notificationDivider} />
                  )}
                </View>
              ))
            )}
          </ScrollView>
        </BlurView>
      </LinearGradient>

      <Modal
        visible={selectedNotification !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedNotification(null)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setSelectedNotification(null)}
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
                    <Image
                      source={{ uri: selectedNotification?.memberImage }}
                      style={styles.modalMemberImage}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setSelectedNotification(null)}
                    activeOpacity={0.7}
                  >
                    <X size={24} color={Colors.text.primary} strokeWidth={2} />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <Text style={styles.modalTitle}>
                    {selectedNotification?.memberName}
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    Nova postagem em{" "}
                    <Text style={styles.modalCourseName}>
                      {selectedNotification?.courseName}
                    </Text>
                  </Text>

                  <View style={styles.modalDivider} />

                  <Text style={styles.modalDescription}>
                    {selectedNotification?.postText}
                  </Text>

                  <View style={styles.modalFooter}>
                    <Text style={styles.modalTime}>
                      {selectedNotification?.timeAgo}
                    </Text>
                  </View>
                </View>
              </BlurView>
            </LinearGradient>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function NotificationItem({ 
  notification, 
  onPress 
}: { 
  notification: Notification;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity 
      style={styles.notificationItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.memberImageContainer}>
        <Image
          source={{ uri: notification.memberImage }}
          style={styles.memberImage}
        />
        {!notification.isRead && <View style={styles.unreadBadge} />}
      </View>

      <View style={styles.notificationContent}>
        <Text style={styles.memberName}>{notification.memberName}</Text>
        <Text style={styles.postInfo}>
          Nova postagem publicada em{" "}
          <Text style={styles.courseName}>{notification.courseName}</Text>
        </Text>
        <Text style={styles.postText} numberOfLines={2}>
          {notification.postText}
        </Text>
        <Text style={styles.timeAgo}>{notification.timeAgo}</Text>
      </View>
    </TouchableOpacity>
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
  tabsContainer: {
    marginBottom: 16,
    flexGrow: 0,
  },
  tabsContent: {
    gap: 8,
    paddingHorizontal: 4,
    justifyContent: "center",
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(42, 42, 42, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.3)",
    minWidth: 90,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "rgba(64, 137, 255, 0.15)",
    borderColor: "rgba(64, 137, 255, 0.3)",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.secondary,
  },
  tabTextActive: {
    color: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(51, 51, 51, 0.3)",
    marginBottom: 20,
  },
  notificationsContainer: {
    maxHeight: 500,
  },
  notificationItem: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 12,
  },
  memberImageContainer: {
    position: "relative",
  },
  memberImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1a1a1a",
    borderWidth: 2,
    borderColor: "rgba(42, 42, 42, 0.5)",
  },
  unreadBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: "#1a1a1a",
  },
  notificationContent: {
    flex: 1,
    gap: 4,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.3,
  },
  postInfo: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  courseName: {
    color: Colors.primary,
    fontWeight: "600",
  },
  postText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.text.secondary,
    lineHeight: 20,
    marginTop: 2,
  },
  timeAgo: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.text.secondary,
    opacity: 0.6,
    marginTop: 4,
  },
  notificationDivider: {
    height: 1,
    backgroundColor: "rgba(51, 51, 51, 0.2)",
    marginLeft: 60,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text.secondary,
    opacity: 0.6,
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalIconGlow: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    opacity: 0.2,
  },
  modalMemberImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1a1a1a",
    borderWidth: 2,
    borderColor: "rgba(64, 137, 255, 0.3)",
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
  modalSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  modalCourseName: {
    color: Colors.primary,
    fontWeight: "600",
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
  modalFooter: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(64, 137, 255, 0.1)",
  },
  modalTime: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.primary,
    opacity: 0.8,
  },
});
