import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { Button } from '../components/Button';
import TaskAPIService from '../services/TaskAPIService';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { tasks, loading, fetchTasks } = useAppContext();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    upcoming: 0,
    progress: 0,
  });

  useEffect(() => {
    loadTasksAndStats();
  }, []);

  const loadTasksAndStats = async () => {
    try {
      await fetchTasks();
      const taskStats = await TaskAPIService.getTaskStats();
      setStats(taskStats);
    } catch (error) {
      console.error('Failed to load home screen data:', error);
    }
  };

  // Calculate stats from local tasks
  useEffect(() => {
    const completed = tasks.filter((t) => t.completed).length;
    const upcoming = tasks.filter(
      (t) => !t.completed && t.dueDate && new Date(t.dueDate) > new Date()
    ).length;
    const progress = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

    setStats({
      total: tasks.length,
      completed,
      upcoming,
      progress,
    });
  }, [tasks]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome, corybatabob@gmail.com! 👋</Text>
          <Text style={styles.lastActivity}>Last activity: 1/4/2026</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <View style={styles.statsRow}>
              <View style={styles.statCardWrapper}>
                <StatCard icon="✓" label="Total Tasks" value={stats.total} color="#2196F3" />
              </View>
              <View style={styles.statCardWrapper}>
                <StatCard icon="✔" label="Completed" value={stats.completed} color="#4CAF50" />
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statCardWrapper}>
                <StatCard icon="📈" label="Upcoming" value={stats.upcoming} color="#FF9800" />
              </View>
              <View style={styles.statCardWrapper}>
                <StatCard
                  icon=""
                  label="Progress"
                  value={`${stats.progress}%`}
                  color="#2196F3"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.buttonsContainer}>
            <Button
              title="VIEW ALL TASKS"
              variant="primary"
              onPress={() => navigation.navigate('Tasks')}
            />
            <Button
              title="CREATE NEW TASK"
              variant="secondary"
              onPress={() => navigation.navigate('Tasks')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  lastActivity: {
    fontSize: 14,
    color: '#999',
  },
  statsSection: {
    padding: 16,
  },
  statsGrid: {
    gap: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCardWrapper: {
    flex: 1,
  },
  quickActionsSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
});
