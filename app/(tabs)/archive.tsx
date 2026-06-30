import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Pressable,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Filter, X, Calendar, Tag, Loader2, FileSearch } from 'lucide-react-native';
import AchievementCard from '@/components/AchievementCard';
import Confetti from '@/components/Confetti';
import { getHistoricalArchive, getAllSports, getAllYears, Achievement } from '@/services/mockData';
import { COLORS, SPORT_COLORS } from '@/constants/theme';

export default function ArchivoScreen() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filtered, setFiltered] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [sports, setSports] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const insets = useSafeAreaInsets();

  const loadData = useCallback(async () => {
    try {
      const [data, allSports, allYears] = await Promise.all([
        getHistoricalArchive(),
        Promise.resolve(getAllSports()),
        Promise.resolve(getAllYears()),
      ]);
      setAchievements(data);
      setFiltered(data);
      setSports(allSports);
      setYears(allYears);
    } catch (err) {
      console.error('Error loading archive:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    let result = [...achievements];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.athleteName.toLowerCase().includes(q) ||
          a.sport.toLowerCase().includes(q) ||
          a.achievement.toLowerCase().includes(q) ||
          a.eventName.toLowerCase().includes(q)
      );
    }

    if (selectedYear) {
      result = result.filter((a) => a.year === selectedYear);
    }

    if (selectedSport) {
      result = result.filter((a) => a.sport === selectedSport);
    }

    setFiltered(result);
  }, [searchQuery, selectedYear, selectedSport, achievements]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedYear(null);
    setSelectedSport(null);
    setShowFilters(false);
    Keyboard.dismiss();
  };

  const handleGoldPress = (achievement: Achievement) => {
    if (achievement.medalType === 'gold') {
      setConfettiActive(true);
    }
  };

  const handleConfettiComplete = () => {
    setConfettiActive(false);
  };

  const hasActiveFilters = searchQuery || selectedYear || selectedSport;

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <FileSearch size={48} color={COLORS.grayLight} />
      <Text style={styles.emptyTitle}>No encontramos nada</Text>
      <Text style={styles.emptyText}>Prueba con otros filtros o términos de búsqueda.</Text>
      {hasActiveFilters && (
        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
          <Text style={styles.clearButtonText}>Limpiar filtros</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Confetti active={confettiActive} onComplete={handleConfettiComplete} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>El Archivo</Text>
        <Text style={styles.headerCount}>{filtered.length} registros</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={18} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar atleta, deporte, evento..."
            placeholderTextColor={COLORS.grayLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={16} color={COLORS.gray} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[styles.filterToggle, showFilters && styles.filterToggleActive]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} color={showFilters ? COLORS.white : COLORS.celeste} />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersPanel}>
          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <Calendar size={14} color={COLORS.gray} />
              <Text style={styles.filterLabel}>Año</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterChips}>
                {years.map((year) => (
                  <Pressable
                    key={year}
                    style={[styles.chip, selectedYear === year && styles.chipActive]}
                    onPress={() => setSelectedYear(selectedYear === year ? null : year)}
                  >
                    <Text style={[styles.chipText, selectedYear === year && styles.chipTextActive]}>
                      {year}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <Tag size={14} color={COLORS.gray} />
              <Text style={styles.filterLabel}>Deporte</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterChips}>
                {sports.map((sport) => (
                  <Pressable
                    key={sport}
                    style={[
                      styles.chip,
                      selectedSport === sport && {
                        backgroundColor: SPORT_COLORS[sport] || COLORS.celeste,
                        borderColor: SPORT_COLORS[sport] || COLORS.celeste,
                      },
                    ]}
                    onPress={() => setSelectedSport(selectedSport === sport ? null : sport)}
                  >
                    <Text
                      style={[styles.chipText, selectedSport === sport && styles.chipTextActive]}
                    >
                      {sport}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          {hasActiveFilters && (
            <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
              <X size={14} color={COLORS.error} />
              <Text style={styles.clearFiltersText}>Limpiar todos los filtros</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.divider} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBox}>
            <Loader2 size={40} color={COLORS.celeste} />
            <Text style={styles.loadingText}>Abriendo el archivo...</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AchievementCard achievement={item} onGoldPress={handleGoldPress} />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.black,
    padding: 0,
  },
  filterToggle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.celeste,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterToggleActive: {
    backgroundColor: COLORS.celeste,
    borderColor: COLORS.celeste,
  },
  filtersPanel: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  filterSection: {
    marginBottom: 14,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.grayDark,
  },
  filterChips: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 16,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.whiteOff,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  chipActive: {
    backgroundColor: COLORS.celeste,
    borderColor: COLORS.celeste,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.grayDark,
  },
  chipTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  clearFiltersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  clearFiltersText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.error,
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
    marginTop: 80,
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    marginTop: 8,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
  },
  clearButton: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: COLORS.celeste + '15',
  },
  clearButtonText: {
    color: COLORS.celesteDark,
    fontWeight: '600',
    fontSize: 14,
  },
});
