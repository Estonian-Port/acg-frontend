import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { COLORS } from '@/constants/theme';

interface ParticleProps {
  delay: number;
  x: number;
  onComplete: () => void;
}

function Particle({ delay, x, onComplete }: ParticleProps) {
  const translateY = useSharedValue(-100);
  const translateX = useSharedValue(x);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0);

  const colors = [COLORS.celeste, COLORS.celesteLight, COLORS.gold, COLORS.white, COLORS.celesteDark];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const shape = Math.random() > 0.5 ? 'circle' : 'rect';
  const size = 6 + Math.random() * 8;

  React.useEffect(() => {
    const drift = (Math.random() - 0.5) * 200;

    scale.value = withTiming(1, { duration: 200, delay } as any);
    translateY.value = withSequence(
      withTiming(0, { duration: 0, delay } as any),
      withTiming(300 + Math.random() * 200, {
        duration: 2000 + Math.random() * 1000,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      })
    );
    translateX.value = withTiming(x + drift, {
      duration: 2000 + Math.random() * 1000,
      easing: Easing.linear,
    });
    rotation.value = withRepeat(
      withTiming(360 + Math.random() * 360, { duration: 1500 + Math.random() * 1000 }),
      2,
      false
    );
    opacity.value = withSequence(
      withTiming(1, { duration: 100, delay: delay + 100 } as any),
      withTiming(0, { duration: 500, delay: 2000 } as any)
    );

    const timer = setTimeout(() => {
      onComplete();
    }, 3000 + delay);

    return () => clearTimeout(timer);
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        style,
        {
          position: 'absolute',
          top: 0,
          width: size,
          height: shape === 'circle' ? size : size * 0.6,
          borderRadius: shape === 'circle' ? size / 2 : 2,
          backgroundColor: color,
        },
      ]}
    />
  );
}

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
}

export default function Confetti({ active, onComplete }: ConfettiProps) {
  const [particles, setParticles] = React.useState<number[]>([]);
  const [activeId, setActiveId] = React.useState(0);
  const completedCount = React.useRef(0);

  React.useEffect(() => {
    if (active) {
      completedCount.current = 0;
      setActiveId((id) => id + 1);
      const count = 40;
      const newParticles = Array.from({ length: count }, (_, i) => i);
      setParticles(newParticles);
    }
  }, [active]);

  const handleParticleComplete = useCallback(() => {
    completedCount.current += 1;
    if (completedCount.current >= particles.length && particles.length > 0) {
      setParticles([]);
      onComplete?.();
    }
  }, [particles.length, onComplete]);

  if (!active && particles.length === 0) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((i) => (
        <Particle
          key={`${activeId}-${i}`}
          delay={i * 30}
          x={Math.random() * 350 - 175}
          onComplete={handleParticleComplete}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    alignItems: 'center',
  },
});
