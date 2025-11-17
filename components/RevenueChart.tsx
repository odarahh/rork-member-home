import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Plus, DollarSign, Calendar, Upload, X, CheckCircle2, TrendingDown } from "lucide-react-native";
import Svg, { Path, Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from "react-native-svg";
import Colors from "@/constants/colors";
import * as ImagePicker from "expo-image-picker";

interface Revenue {
  id: string;
  value: number;
  date: string;
  document?: string;
  status: "pending" | "approved" | "rejected";
}

export default function RevenueChart() {
  const [revenues, setRevenues] = useState<Revenue[]>([
    { id: "1", value: 5000, date: "2025-01-10", status: "approved" },
    { id: "2", value: 3500, date: "2025-02-15", status: "approved" },
    { id: "3", value: 4200, date: "2025-03-20", status: "approved" },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [revenueValue, setRevenueValue] = useState("");
  const [revenueDate, setRevenueDate] = useState("");
  const [document, setDocument] = useState<string | undefined>();

  const approvedRevenues = revenues.filter((r) => r.status === "approved");
  const totalRevenue = approvedRevenues.reduce((sum, r) => sum + r.value, 0);
  const maxRevenue = Math.max(...approvedRevenues.map((r) => r.value), 1);

  const previousTotal = approvedRevenues.length > 1 
    ? approvedRevenues.slice(0, -1).reduce((sum, r) => sum + r.value, 0)
    : totalRevenue;
  const changePercent = previousTotal > 0 
    ? ((totalRevenue - previousTotal) / previousTotal * 100).toFixed(1)
    : "0.0";
  const isNegative = parseFloat(changePercent) < 0;

  const chartWidth = 300;
  const chartHeight = 150;
  const padding = 20;
  const innerWidth = chartWidth - padding * 2;
  const innerHeight = chartHeight - padding * 2;

  const sortedRevenues = [...approvedRevenues].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const points = sortedRevenues.map((revenue, index) => {
    const x = padding + (innerWidth / (sortedRevenues.length - 1 || 1)) * index;
    const y = padding + innerHeight - (revenue.value / maxRevenue) * innerHeight;
    return { x, y, value: revenue.value };
  });

  const generatePathData = () => {
    if (points.length === 0) return "";
    
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  const generateAreaPath = () => {
    if (points.length === 0) return "";
    
    let path = `M ${points[0].x} ${chartHeight - padding}`;
    path += ` L ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    
    path += ` L ${points[points.length - 1].x} ${chartHeight - padding}`;
    path += ` Z`;
    return path;
  };

  const pickDocument = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setDocument(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    const value = parseFloat(revenueValue.replace(/[^0-9.,]/g, "").replace(",", "."));
    
    if (value && revenueDate) {
      const newRevenue: Revenue = {
        id: Date.now().toString(),
        value,
        date: revenueDate,
        document,
        status: "pending",
      };
      
      setRevenues([...revenues, newRevenue]);
      setShowAddModal(false);
      setShowConfirmModal(true);
      
      setRevenueValue("");
      setRevenueDate("");
      setDocument(undefined);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIcon}>
            <View style={styles.iconGlow} />
            <DollarSign size={20} color={Colors.primary} strokeWidth={2.5} />
          </View>
          <View>
            <Text style={styles.title}>Faturamento</Text>
            <View style={styles.valueRow}>
              <Text style={styles.mainValue}>
                R$ {(totalRevenue / 1000).toFixed(3).replace('.', ',')}
              </Text>
              <View style={[styles.changeIndicator, isNegative && styles.changeIndicatorNegative]}>
                <TrendingDown size={12} color={isNegative ? "#FF6B6B" : "#4CAF50"} />
                <Text style={[styles.changeText, isNegative && styles.changeTextNegative]}>
                  {changePercent}%
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
          <Plus size={18} color="white" strokeWidth={2.5} />
          <Text style={styles.addButtonText}>Adicionar Faturamento</Text>
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={["rgba(26, 26, 26, 0.8)", "rgba(30, 30, 30, 0.6)", "rgba(22, 22, 22, 0.8)"]}
        style={styles.cardGradient}
      >
        <BlurView intensity={30} style={styles.blurContainer}>
          <View style={styles.chartWrapper}>
            <View style={styles.yAxisLabels}>
              <Text style={styles.yAxisLabel}>{(maxRevenue / 1000).toFixed(0)}k</Text>
              <Text style={styles.yAxisLabel}>{(maxRevenue / 2000).toFixed(0)}k</Text>
              <Text style={styles.yAxisLabel}>0k</Text>
            </View>

            <View style={styles.chartArea}>
              <Svg width={chartWidth} height={chartHeight}>
                <Defs>
                  <SvgLinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0%" stopColor={Colors.primary} stopOpacity="0.3" />
                    <Stop offset="100%" stopColor={Colors.primary} stopOpacity="0.05" />
                  </SvgLinearGradient>
                  <SvgLinearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0%" stopColor={Colors.primary} stopOpacity="1" />
                    <Stop offset="100%" stopColor={Colors.primaryLight} stopOpacity="1" />
                  </SvgLinearGradient>
                </Defs>

                {points.length > 0 && (
                  <>
                    <Path
                      d={generateAreaPath()}
                      fill="url(#areaGradient)"
                    />
                    <Path
                      d={generatePathData()}
                      stroke="url(#lineGradient)"
                      strokeWidth={2.5}
                      fill="none"
                    />
                    {points.map((point, index) => (
                      <Circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r={4}
                        fill={Colors.primary}
                        stroke="#0a0a0a"
                        strokeWidth={2}
                      />
                    ))}
                  </>
                )}
              </Svg>

              <View style={styles.xAxisLabels}>
                {sortedRevenues.map((revenue, index) => {
                  const date = new Date(revenue.date + "T12:00:00");
                  const month = date.toLocaleDateString("pt-BR", { month: "short" });
                  return (
                    <Text key={revenue.id} style={styles.xAxisLabel}>
                      {month}.
                    </Text>
                  );
                })}
              </View>
            </View>
          </View>
        </BlurView>
      </LinearGradient>

      <Modal
        visible={showAddModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={20} style={styles.modalBlur}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Adicionar faturamento</Text>
                <TouchableOpacity
                  onPress={() => setShowAddModal(false)}
                  style={styles.closeButton}
                >
                  <X size={24} color={Colors.text.secondary} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Valor do faturamento</Text>
                  <View style={styles.inputWrapper}>
                    <DollarSign
                      size={20}
                      color={Colors.text.secondary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="R$ 0,00"
                      placeholderTextColor={Colors.text.tertiary}
                      value={revenueValue}
                      onChangeText={setRevenueValue}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Data do faturamento</Text>
                  <View style={styles.inputWrapper}>
                    <Calendar
                      size={20}
                      color={Colors.text.secondary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="AAAA-MM-DD"
                      placeholderTextColor={Colors.text.tertiary}
                      value={revenueDate}
                      onChangeText={setRevenueDate}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Documento comprobatório (opcional)
                  </Text>
                  <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
                    <Upload size={20} color={Colors.primary} />
                    <Text style={styles.uploadText}>
                      {document ? "Documento selecionado" : "Selecionar documento"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryLight]}
                  style={styles.saveGradient}
                >
                  <Text style={styles.saveText}>Salvar faturamento</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </Modal>

      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={20} style={styles.modalBlur}>
            <View style={styles.confirmModal}>
              <View style={styles.confirmIconContainer}>
                <View style={styles.confirmIconGlow} />
                <CheckCircle2 size={48} color={Colors.primary} strokeWidth={2} />
              </View>
              
              <Text style={styles.confirmTitle}>Faturamento enviado!</Text>
              
              <Text style={styles.confirmMessage}>
                Estamos analisando o seu faturamento. Assim que for aprovado, ele será
                incluído no seu relatório de faturamento. Caso contrário, ele será
                desconsiderado, sem impactar no gráfico.
              </Text>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setShowConfirmModal(false)}
              >
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryLight]}
                  style={styles.confirmGradient}
                >
                  <Text style={styles.confirmButtonText}>Concordar e fechar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIcon: {
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
    transform: [{ scale: 1.2 }],
  },
  title: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: Colors.text.primary,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mainValue: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  changeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },
  changeIndicatorNegative: {
    backgroundColor: "rgba(255, 107, 107, 0.1)",
  },
  changeText: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: "#4CAF50",
  },
  changeTextNegative: {
    color: "#FF6B6B",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.primary,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "white",
    letterSpacing: -0.2,
  },
  cardGradient: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(42, 42, 42, 0.5)",
  },
  blurContainer: {
    padding: 24,
    borderRadius: 18,
    overflow: "hidden",
  },
  chartWrapper: {
    flexDirection: "row",
    gap: 12,
  },
  yAxisLabels: {
    justifyContent: "space-between",
    paddingVertical: 20,
    width: 35,
  },
  yAxisLabel: {
    fontSize: 11,
    fontWeight: "500" as const,
    color: Colors.primary,
    letterSpacing: 0.3,
  },
  chartArea: {
    flex: 1,
  },
  xAxisLabels: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  xAxisLabel: {
    fontSize: 11,
    fontWeight: "500" as const,
    color: Colors.primary,
    letterSpacing: 0.3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalBlur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(26, 26, 26, 0.95)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(42, 42, 42, 0.5)",
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(51, 51, 51, 0.3)",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    padding: 24,
    maxHeight: 400,
  },
  inputGroup: {
    marginBottom: 20,
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "500" as const,
    color: Colors.text.secondary,
    letterSpacing: 0.3,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(42, 42, 42, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.3)",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500" as const,
    color: Colors.text.primary,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "rgba(64, 137, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(64, 137, 255, 0.2)",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.primary,
  },
  saveButton: {
    margin: 24,
    marginTop: 0,
    borderRadius: 12,
    overflow: "hidden",
  },
  saveGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "white",
    letterSpacing: -0.3,
  },
  confirmModal: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "rgba(26, 26, 26, 0.95)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(42, 42, 42, 0.5)",
    padding: 32,
    alignItems: "center",
    gap: 20,
  },
  confirmIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(64, 137, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  confirmIconGlow: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    opacity: 0.2,
    transform: [{ scale: 1.3 }],
  },
  confirmTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: Colors.text.primary,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  confirmMessage: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: Colors.text.secondary,
    lineHeight: 22,
    textAlign: "center",
  },
  confirmButton: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 8,
  },
  confirmGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "white",
    letterSpacing: -0.3,
  },
});
