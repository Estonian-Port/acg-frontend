import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Calendar, Clock, Tv } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { UpcomingEvent } from '@/services/mockData';
import { COLORS, SPORT_COLORS } from '@/constants/theme';

interface UpcomingEventCardProps {
  event: UpcomingEvent;
  onPress?: (event: UpcomingEvent) => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function UpcomingEventCard({ event, onPress }: UpcomingEventCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { stiffness: 300, damping: 20 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { stiffness: 300, damping: 20 });
  };

  const sportColor = SPORT_COLORS[event.sport] || COLORS.celeste;
  const daysUntil = Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const daysText = daysUntil <= 0 ? '¡Hoy!' : daysUntil === 1 ? 'Mañana' : `En ${daysUntil} días`;

  return (
    <AnimatedTouchable
      style={[styles.container, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onPress?.(event)}
      activeOpacity={0.9}
    >
      <View style={[styles.header, { backgroundColor: sportColor }]}>
        <Text style={styles.sportText}>{event.sport}</Text>
        <Text style={styles.daysText}>{daysText}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.athleteName}>{event.athleteOrTeam}</Text>
        <Text style={styles.eventName}>{event.eventName}</Text>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <MapPin size={14} color={COLORS.gray} />
            <Text style={styles.detailText}>{event.location}, {event.country}</Text>
          </View>
          <View style={styles.detailRow}>
            <Calendar size={14} color={COLORS.gray} />
            <Text style={styles.detailText}>{formatDate(event.date)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Clock size={14} color={COLORS.gray} />
            <Text style={styles.detailText}>{event.time} hs</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.streamButton} activeOpacity={0.8}>
          <Tv size={14} color={COLORS.celesteDark} />
          <Text style={styles.streamButtonText}>Ver transmisión</Text>
        </TouchableOpacity>
      </View>
    </AnimatedTouchable>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sportText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  daysText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    fontWeight: '600',
  },
  body: {
    padding: 16,
  },
  athleteName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 4,
  },
  eventName: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 14,
  },
  details: {
    gap: 6,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: COLORS.grayDark,
  },
  streamButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: COLORS.celeste,
    borderRadius: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(117,170,219,0.08)',
  },
  streamButtonText: {
    color: COLORS.celesteDark,
    fontSize: 14,
    fontWeight: '600',
  },
});
