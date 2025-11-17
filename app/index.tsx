import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyProgressCard from "@/components/MyProgressCard";
import EventCard from "@/components/EventCard";
import NotificationsCard from "@/components/NotificationsCard";
import RevenueChart from "@/components/RevenueChart";
import CalendarCard from "@/components/CalendarCard";
import AwardsCard from "@/components/AwardsCard";
import AlertCard from "@/components/AlertCard";
import EngagedMembersCard from "@/components/EngagedMembersCard";
import ChallengeCard from "@/components/ChallengeCard";
import ContinueWatchingCard from "@/components/ContinueWatchingCard";
import Colors from "@/constants/colors";

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const userProgress = 44;
  const userLevel = 6;
  const userScore = 620;
  const classesWatched = 10;

  const tasksCompleted = 9;
  const totalTasks = 18;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#0a0a0a", "#0f0f0f", "#0a0a0a"]}
          style={styles.gradient}
        >
          <View style={styles.progressCardSection}>
            <MyProgressCard
              level={userLevel}
              progress={userProgress}
              points={userScore}
              watchedClasses={classesWatched}
              ranking={15}
              tasksCompleted={tasksCompleted}
              totalTasks={totalTasks}
            />
          </View>

          <View style={styles.eventsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Próximo evento</Text>
            </View>
            <EventCard
              title="Tech Conference 2025"
              description="Participe do maior evento de tecnologia do ano com palestrantes renomados, networking e workshops práticos sobre as últimas tendências em desenvolvimento."
              link="https://exemplo.com/evento-tech-2025"
              location="Centro de Convenções - São Paulo, SP"
              date="15 de Dezembro, 2025"
              startTime="09:00"
              endTime="18:00"
            />
          </View>

          <View style={styles.notificationsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Notificações</Text>
            </View>
            <NotificationsCard />
          </View>

          <View style={styles.revenueSection}>
            <RevenueChart />
          </View>

          <View style={styles.calendarSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Calendário</Text>
            </View>
            <CalendarCard />
          </View>

          <View style={styles.awardsSection}>
            <AwardsCard />
          </View>

          <View style={styles.alertsSection}>
            <AlertCard
              alerts={[
                {
                  title: "Informação Importante",
                  description:
                    "Este é um card de aviso informativo. Use para comunicar informações gerais e atualizações aos membros da comunidade.",
                },
                {
                  title: "Operação Concluída com Sucesso",
                  description:
                    "Suas alterações foram salvas com sucesso. Todas as informações foram atualizadas no sistema.",
                },
                {
                  title: "Atenção Necessária",
                  description:
                    "Seu plano atual está próximo do limite. Considere fazer upgrade para continuar acessando todos os recursos.",
                },
                {
                  title: "Erro na Operação",
                  description:
                    "Não foi possível completar a operação. Verifique sua conexão e tente novamente em alguns instantes.",
                },
                {
                  title: "Nova Atualização Disponível",
                  description:
                    "Uma nova versão do sistema está disponível com melhorias de performance e novos recursos.",
                },
              ]}
            />
          </View>

          <View style={styles.engagedMembersSection}>
            <EngagedMembersCard
              onViewFullRanking={() => console.log('Ver ranking completo')}
            />
          </View>

          <View style={styles.continueWatchingSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Continuar Assistindo</Text>
            </View>
            <ContinueWatchingCard
              content={{
                id: "1",
                title: "Desenvolvimento Web Completo 2024",
                banner: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
                progress: 65,
                currentLesson: 13,
                totalLessons: 20,
                isLiked: true,
                userRating: 5,
              }}
              onAccessContent={(id) => console.log('Acessar conteúdo:', id)}
              onToggleLike={(id) => console.log('Toggle like:', id)}
              onRate={(id, rating, comment) => console.log('Avaliar:', id, rating, comment)}
              onGetCertificate={(id) => console.log('Obter certificado:', id)}
            />

            <View style={{ marginTop: 16 }}>
              <ContinueWatchingCard
                content={{
                  id: "2",
                  title: "React Native: Do Zero ao Avançado",
                  banner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
                  progress: 100,
                  currentLesson: 32,
                  totalLessons: 32,
                  isLiked: false,
                  userRating: 0,
                }}
                onAccessContent={(id) => console.log('Acessar conteúdo:', id)}
                onToggleLike={(id) => console.log('Toggle like:', id)}
                onRate={(id, rating, comment) => console.log('Avaliar:', id, rating, comment)}
                onGetCertificate={(id) => console.log('Obter certificado:', id)}
              />
            </View>
          </View>

          <View style={styles.challengeSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Desafios</Text>
            </View>
            <ChallengeCard
              challenge={{
                id: "1",
                name: "30 Dias de Fitness",
                subtitle: "Transforme seu corpo em 30 dias",
                description: "Participe do desafio de 30 dias de fitness e transforme seu corpo com treinos diários, alimentação balanceada e hábitos saudáveis. Ganhe pontos a cada missão concluída e suba no ranking!",
                bannerImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=400&fit=crop",
                progress: 65,
                activities: [
                  { id: "1", name: "Complete 5 treinos na semana", completed: true },
                  { id: "2", name: "Beba 2L de água por dia", completed: true },
                  { id: "3", name: "Faça 30 min de cardio", completed: true },
                  { id: "4", name: "Registre suas refeições", completed: false },
                  { id: "5", name: "Durma 8 horas por noite", completed: false },
                ],
                rules: [
                  "Complete todas as missões diárias para ganhar pontos",
                  "Missões devem ser concluídas dentro do prazo de 24 horas",
                  "Compartilhe seu progresso nas redes sociais para ganhar pontos extras",
                  "Participe da comunidade e incentive outros membros",
                ],
                participants: 12847,
                color: "#4089FF",
                isParticipating: true,
              }}
              onParticipate={(id) => console.log('Participar do desafio:', id)}
            />

            <View style={{ marginTop: 16 }}>
              <ChallengeCard
                challenge={{
                  id: "2",
                  name: "Meditação 21 Dias",
                  subtitle: "Crie o hábito da meditação diária",
                  description: "Desenvolva uma prática diária de meditação durante 21 dias. Aprenda técnicas de mindfulness, reduza o estresse e melhore seu bem-estar mental.",
                  bannerImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
                  progress: 0,
                  activities: [
                    { id: "1", name: "Medite 10 minutos pela manhã", completed: false },
                    { id: "2", name: "Pratique respiração consciente", completed: false },
                    { id: "3", name: "Faça um diário de gratidão", completed: false },
                    { id: "4", name: "Participe de sessão guiada", completed: false },
                  ],
                  rules: [
                    "Medite pelo menos 10 minutos por dia",
                    "Use o app para registrar suas sessões",
                    "Complete o diário de gratidão semanalmente",
                    "Participe de pelo menos uma sessão em grupo",
                  ],
                  participants: 8432,
                  color: "#9B59B6",
                  isParticipating: false,
                }}
                onParticipate={(id) => console.log('Participar do desafio:', id)}
              />
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  gradient: {
    flex: 1,
  },
  progressCardSection: {
    marginBottom: 20,
  },
  eventsSection: {
    marginTop: 24,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },

  notificationsSection: {
    marginTop: 24,
  },
  revenueSection: {
    marginTop: 24,
  },
  calendarSection: {
    marginTop: 24,
  },
  awardsSection: {
    marginTop: 24,
  },
  alertsSection: {
    marginTop: 24,
  },
  engagedMembersSection: {
    marginTop: 24,
  },
  continueWatchingSection: {
    marginTop: 24,
  },
  challengeSection: {
    marginTop: 24,
  },
});
