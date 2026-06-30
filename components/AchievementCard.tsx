import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Trophy, Medal, Award } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Achievement } from '@/services/mockData';
import { COLORS, SPORT_COLORS } from '@/constants/theme';

interface AchievementCardProps {
  achievement: Achievement;
  onPress?: (achievement: Achievement) => void;
  onGoldPress?: (achievement: Achievement) => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function AchievementCard({ achievement, onPress, onGoldPress }: AchievementCardProps) {
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

  const handlePress = () => {
    if (achievement.medalType === 'gold' && onGoldPress) {
      onGoldPress(achievement);
    }
    onPress?.(achievement);
  };

  const sportColor = SPORT_COLORS[achievement.sport] || COLORS.celeste;

  const medalIcon = () => {
    switch (achievement.medalType) {
      case 'gold':
        return <Trophy size={18} color={COLORS.gold} />;
      case 'silver':
        return <Medal size={18} color={COLORS.silver} />;
      case 'bronze':
        return <Award size={18} color={COLORS.bronze} />;
      default:
        return null;
    }
  };

  const medalText = () => {
    switch (achievement.medalType) {
      case 'gold':
        return styles.goldText;
      case 'silver':
        return styles.silverText;
      case 'bronze':
        return styles.bronzeText;
      default:
        return styles.neutralText;
    }
  };

  return (
    <AnimatedTouchable
      style={[styles.container, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={[styles.imageWrapper, { borderColor: sportColor }]}>
        <Image source={{ uri: achievement.imageUrl }} style={styles.image} resizeMode="cover" />
        <View style={[styles.sportTag, { backgroundColor: sportColor }]}>
          <Text style={styles.sportTagText}>{achievement.sport}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.athleteName} numberOfLines={1}>
          {achievement.athleteName}
        </Text>

        <View style={styles.achievementRow}>
          {medalIcon()}
          <Text style={[styles.achievementText, medalText()]} numberOfLines={1}>
            {achievement.achievement}
          </Text>
        </View>

        <Text style={styles.eventName} numberOfLines={1}>
          {achievement.eventName}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.date}>{formatDate(achievement.date)}</Text>
          <Text style={styles.location} numberOfLines={1}>
            {achievement.location}
          </Text>
        </View>
      </View>
    </AnimatedTouchable>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
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
  imageWrapper: {
    position: 'relative',
    borderBottomWidth: 3,
  },
  image: {
    width: '100%',
    height: 160,
  },
  sportTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  sportTagText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  content: {
    padding: 16,
  },
  athleteName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 6,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  achievementText: {
    fontSize: 14,
    fontWeight: '600',
  },
  goldText: {
    color: COLORS.goldDark,
  },
  silverText: {
    color: COLORS.gray,
  },
  bronzeText: {
    color: COLORS.bronze,
  },
  neutralText: {
    color: COLORS.celesteDark,
  },
  eventName: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
    paddingTop: 10,
  },
  date: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '500',
  },
  location: {
    fontSize: 12,
    color: COLORS.gray,
    maxWidth: 160,
  },
});
