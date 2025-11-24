import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  PanResponder,
  Animated,
} from "react-native";
import { List, Info, X } from "lucide-react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

type FilterType = "all" | "open" | "completed";

const defaultTasks: Task[] = [
  { id: "1", title: "Revisar documentação do projeto", description: "Revisar e atualizar toda a documentação técnica do projeto, incluindo diagramas de arquitetura, APIs e guias de uso.", completed: false },
  { id: "2", title: "Implementar autenticação OAuth", description: "Integrar sistema de autenticação OAuth 2.0 para login social com Google e Facebook.", completed: false },
  { id: "3", title: "Criar testes unitários", description: "Desenvolver testes unitários para os principais módulos do sistema, garantindo cobertura mínima de 80%.", completed: false },
  { id: "4", title: "Otimizar performance do banco", description: "Analisar e otimizar queries lentas, adicionar índices necessários e implementar cache de dados.", completed: false },
  { id: "5", title: "Atualizar dependências do projeto", description: "Atualizar todas as dependências para suas versões mais recentes, testando compatibilidade e corrigindo breaking changes.", completed: false },
  { id: "6", title: "Implementar sistema de notificações", description: "Criar sistema completo de notificações push e in-app com personalização por usuário.", completed: false },
  { id: "7", title: "Refatorar componentes legados", description: "Refatorar componentes antigos para usar hooks modernos do React e melhorar a manutenibilidade.", completed: false },
  { id: "8", title: "Configurar CI/CD pipeline", description: "Configurar pipeline de integração e entrega contínua com testes automatizados e deploy automático.", completed: false },
  { id: "9", title: "Desenvolver dashboard analytics", description: "Criar dashboard completo com métricas e gráficos de uso da aplicação em tempo real.", completed: false },
  { id: "10", title: "Implementar dark mode", description: "Adicionar suporte completo a tema escuro em toda a aplicação com persistência de preferência do usuário.", completed: false },
];

export default function TaskListCard() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastY = useRef(0);
  const containerHeight = useRef(0);
  const contentHeight = useRef(0);

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "open") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const openTasksCount = tasks.filter((t) => !t.completed).length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const totalTasksCount = tasks.length;
  const progressPercentage = Math.round(
    (completedTasksCount / totalTasksCount) * 100
  );

  const size = 60;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset =
    circumference - (progressPercentage / 100) * circumference;

  const openTaskDetail = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        scrollY.stopAnimation((value) => {
          lastY.current = value;
        });
      },
      onPanResponderMove: (_, gestureState) => {
        const newY = lastY.current - gestureState.dy;
        const maxScroll = Math.max(0, contentHeight.current - containerHeight.current);
        const clampedY = Math.max(0, Math.min(newY, maxScroll));
        scrollY.setValue(clampedY);
      },
      onPanResponderRelease: (_, gestureState) => {
        const velocity = -gestureState.vy;
        const maxScroll = Math.max(0, contentHeight.current - containerHeight.current);
        
        if (Math.abs(velocity) > 0.5) {
          const deceleration = 0.995;
          const maxVelocity = Math.min(Math.abs(velocity), 4);
          const finalVelocity = velocity > 0 ? maxVelocity : -maxVelocity;
          
          scrollY.stopAnimation((currentValue) => {
            lastY.current = currentValue;
            Animated.decay(scrollY, {
              velocity: finalVelocity * 1000,
              deceleration,
              useNativeDriver: true,
            }).start(({ finished }) => {
              if (finished) {
                scrollY.stopAnimation((finalValue) => {
                  const clampedValue = Math.max(0, Math.min(finalValue, maxScroll));
                  scrollY.setValue(clampedValue);
                  lastY.current = clampedValue;
                });
              }
            });
          });
        } else {
          lastY.current = Math.max(0, Math.min(lastY.current - gestureState.dy, maxScroll));
        }
      },
      onPanResponderTerminate: () => {
        scrollY.stopAnimation((value) => {
          lastY.current = value;
        });
      },
    })
  ).current;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <View style={styles.iconContainer}>
            <List size={20} color="#4089FF" strokeWidth={2.5} />
          </View>
          <View>
            <Text style={styles.title}>Lista de Tarefas</Text>
            <Text style={styles.subtitle}>
              {completedTasksCount} de {totalTasksCount} concluídas
            </Text>
          </View>
        </View>

        <View style={styles.progressCircle}>
          <Svg width={size} height={size}>
            <Defs>
              <LinearGradient
                id="taskProgressGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <Stop offset="0%" stopColor="#4089FF" stopOpacity="1" />
                <Stop offset="100%" stopColor="#60a5ff" stopOpacity="1" />
              </LinearGradient>
            </Defs>

            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#333333"
              strokeWidth={strokeWidth}
              fill="none"
              opacity={0.3}
            />

            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#taskProgressGradient)"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>
          <Text style={styles.progressText}>{progressPercentage}%</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.filterActive]}
          onPress={() => setFilter("all")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "all" && styles.filterTextActive,
            ]}
          >
            Todas
          </Text>
          <Text
            style={[
              styles.filterCount,
              filter === "all" && styles.filterCountActive,
            ]}
          >
            ({totalTasksCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "open" && styles.filterActive,
          ]}
          onPress={() => setFilter("open")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "open" && styles.filterTextActive,
            ]}
          >
            Em aberto
          </Text>
          <Text
            style={[
              styles.filterCount,
              filter === "open" && styles.filterCountActive,
            ]}
          >
            ({openTasksCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "completed" && styles.filterActive,
          ]}
          onPress={() => setFilter("completed")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "completed" && styles.filterTextActive,
            ]}
          >
            Concluídas
          </Text>
          <Text
            style={[
              styles.filterCount,
              filter === "completed" && styles.filterCountActive,
            ]}
          >
            ({completedTasksCount})
          </Text>
        </TouchableOpacity>
      </View>

      <View 
        style={styles.taskListWrapper}
        onLayout={(e) => {
          containerHeight.current = e.nativeEvent.layout.height;
        }}
      >
        <View style={styles.taskList}>
          <View {...panResponder.panHandlers} style={styles.scrollContainer}>
            <Animated.View
              style={[{
                transform: [{ translateY: Animated.multiply(scrollY, -1) }],
              }]}
              onLayout={(e) => {
                contentHeight.current = e.nativeEvent.layout.height;
              }}
            >
            {filteredTasks.map((task, index) => (
              <View key={task.id} style={[
                styles.taskItem,
                index === filteredTasks.length - 1 && styles.taskItemLast
              ]}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => toggleTask(task.id)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      task.completed && styles.checkboxChecked,
                    ]}
                  >
                    {task.completed && (
                      <View style={styles.checkmark}>
                        <Text style={styles.checkmarkText}>✓</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>

                <View style={styles.taskTitleContainer}>
                  <Text
                    style={[
                      styles.taskTitle,
                      task.completed && styles.taskTitleCompleted,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {task.title}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => openTaskDetail(task)}
                >
                  <Info size={18} color="#4089FF" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            ))}
            </Animated.View>
          </View>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detalhes da Tarefa</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeModal}
              >
                <X size={24} color="rgba(255, 255, 255, 0.7)" strokeWidth={2} />
              </TouchableOpacity>
            </View>

            {selectedTask && (
              <View style={styles.modalBody}>
                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Título</Text>
                  <Text style={styles.modalValue}>{selectedTask.title}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Descrição</Text>
                  <Text style={styles.modalDescription}>
                    {selectedTask.description}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    if (selectedTask) {
                      toggleTask(selectedTask.id);
                    }
                    closeModal();
                  }}
                >
                  <Text style={styles.modalButtonText}>
                    {selectedTask.completed
                      ? "Marcar como pendente"
                      : "Marcar como concluída"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 420,
    backgroundColor: "#1a1a1a",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(42, 42, 42, 0.5)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(64, 137, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.3)",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.95)",
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: 2,
  },
  progressCircle: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    position: "absolute",
    fontSize: 14,
    fontWeight: "700",
    color: "#4089FF",
  },
  filterContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    justifyContent: "center",
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 22,
    backgroundColor: "rgba(42, 42, 42, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.3)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minHeight: 44,
  },
  filterActive: {
    backgroundColor: "rgba(64, 137, 255, 0.2)",
    borderColor: "rgba(64, 137, 255, 0.4)",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.6)",
  },
  filterTextActive: {
    color: "#4089FF",
    fontWeight: "600",
  },
  filterCount: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.4)",
  },
  filterCountActive: {
    color: "#4089FF",
  },
  taskListWrapper: {
    flex: 1,
    backgroundColor: "rgba(42, 42, 42, 0.2)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.3)",
    overflow: "hidden",
  },
  taskList: {
    flex: 1,
    overflow: "hidden",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(51, 51, 51, 0.3)",
    gap: 12,
    minHeight: 52,
  },
  taskItemLast: {
    borderBottomWidth: 0,
    marginBottom: 8,
  },
  checkboxContainer: {
    padding: 2,
    flexShrink: 0,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#4089FF",
    borderColor: "#4089FF",
  },
  checkmark: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
  },
  taskTitleContainer: {
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.85)",
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  taskTitleCompleted: {
    color: "rgba(255, 255, 255, 0.4)",
    textDecorationLine: "line-through",
  },
  infoButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "rgba(64, 137, 255, 0.1)",
    minWidth: 36,
    minHeight: 36,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "90%",
    maxWidth: 500,
    backgroundColor: "#1a1a1a",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(42, 42, 42, 0.5)",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.95)",
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    gap: 20,
  },
  modalSection: {
    gap: 8,
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.5)",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  modalValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.95)",
    letterSpacing: 0.2,
  },
  modalDescription: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 20,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  statusBadgeCompleted: {
    backgroundColor: "rgba(64, 137, 255, 0.2)",
  },
  statusBadgeOpen: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },
  statusTextCompleted: {
    color: "#4089FF",
  },
  statusTextOpen: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  modalButton: {
    backgroundColor: "#4089FF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
    minHeight: 52,
    justifyContent: "center",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    letterSpacing: 0.3,
  },
});
