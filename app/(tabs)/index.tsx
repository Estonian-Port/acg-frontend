import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ExpoLinking from 'expo-linking';
import { Flame, Loader2 } from 'lucide-react-native';
import AchievementCard from '@/components/AchievementCard';
import Confetti from '@/components/Confetti';
import { getLatestAchievements, Achievement } from '@/services/mockData';
import { COLORS } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function CoronacionesScreen() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const insets = useSafeAreaInsets();

  const loadData = useCallback(async () => {
    try {
      const data = await getLatestAchievements();
      setAchievements(data);
    } catch (err) {
      console.error('Error loading achievements:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleGoldPress = (achievement: Achievement) => {
    if (achievement.medalType === 'gold') {
      setConfettiActive(true);
    }
  };

  const handleConfettiComplete = () => {
    setConfettiActive(false);
  };

  const handleCafecito = () => {
    ExpoLinking.openURL('https://cafecito.app/placeholder');
  };

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingBox}>
        <Loader2 size={40} color={COLORS.celeste} />
        <Text style={styles.loadingText}>Preparando el mate...</Text>
        <Text style={styles.loadingSubtext}>Recopilando coronaciones argentinas</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Confetti active={confettiActive} onComplete={handleConfettiComplete} />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>ACG</Text>
          <Text style={styles.headerSubtitle}>Another Coronación de Gloria</Text>
        </View>
        <TouchableOpacity style={styles.cafecitoButton} onPress={handleCafecito} activeOpacity={0.8}>
          <Flame size={16} color={COLORS.gold} />
          <Text style={styles.cafecitoText}>Invitame un chori</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {loading ? (
        renderLoading()
      ) : (
        <FlatList
          data={achievements}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AchievementCard
              achievement={item}
              onGoldPress={handleGoldPress}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.celeste}
              colors={[COLORS.celeste]}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay coronaciones aún</Text>
              <Text style={styles.emptySubtext}>¡Vamos Argentina!</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteOff,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.celeste,
    letterSpacing: -1,
  },
  headerSubtitle: {
    fontSize: 11,
    color: COLORS.gray,
    fontWeight: '500',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  cafecitoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.black,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  cafecitoText: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.grayLight,
    marginHorizontal: 16,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBox: {
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.celeste,
  },
  loadingSubtext: {
    fontSize: 14,
    color: COLORS.gray,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
    gap: 8,
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.gray,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.celeste,
  },
});
