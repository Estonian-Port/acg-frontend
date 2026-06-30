import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Swords, ShieldOff, Loader2 } from 'lucide-react-native';
import UpcomingEventCard from '@/components/UpcomingEventCard';
import { getUpcomingEvents, UpcomingEvent } from '@/services/mockData';
import { COLORS } from '@/constants/theme';

export default function ProximasBatallasScreen() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  const loadData = useCallback(async () => {
    try {
      const data = await getUpcomingEvents();
      setEvents(data);
    } catch (err) {
      console.error('Error loading upcoming events:', err);
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

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <ShieldOff size={48} color={COLORS.grayLight} />
      </View>
      <Text style={styles.emptyTitle}>Los pibes están descansando</Text>
      <Text style={styles.emptyText}>No hay batallas próximas hoy.</Text>
      <Text style={styles.emptySubtext}>¡Vuelve pronto para apoyar a Argentina!</Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Swords size={24} color={COLORS.celeste} />
          <Text style={styles.headerTitle}>Próximas Batallas</Text>
        </View>
        <Text style={styles.headerCount}>{events.length} eventos</Text>
      </View>

      <View style={styles.divider} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBox}>
            <Loader2 size={40} color={COLORS.celeste} />
            <Text style={styles.loadingText}>Armando el calendario...</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <UpcomingEventCard event={item} />}
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
          ListEmptyComponent={renderEmpty}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.black,
  },
  headerCount: {
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: '500',
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
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 4,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.celeste,
    textAlign: 'center',
  },
});
