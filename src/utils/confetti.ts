import confetti from 'canvas-confetti';

export const triggerCelebration = () => {
  const count = 150;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#10B981', '#3B82F6', '#F59E0B'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#6366F1', '#EC4899', '#14B8A6'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const triggerSmallCelebration = () => {
  confetti({
    particleCount: 50,
    spread: 50,
    origin: { y: 0.8 },
    colors: ['#10B981', '#064E3B', '#34D399'],
    zIndex: 9999,
  });
};
