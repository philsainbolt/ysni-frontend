const PARTICLE_CONFIGS = {
  firefly: {
    sizeRange: [2, 4],
    yDirection: 'float',
    durationRange: [8, 14],
    opacityRange: [0.2, 0.8],
    shape: 'round',
  },
  ember: {
    sizeRange: [2, 4],
    yDirection: 'rise',
    durationRange: [4, 8],
    opacityRange: [0.6, 1],
    shape: 'round',
  },
  wisp: {
    sizeRange: [4, 8],
    yDirection: 'float',
    durationRange: [6, 12],
    opacityRange: [0.15, 0.5],
    shape: 'blurred',
  },
  dust: {
    sizeRange: [1, 2],
    yDirection: 'fall',
    durationRange: [12, 22],
    opacityRange: [0.08, 0.2],
    shape: 'round',
  },
  fog: {
    sizeRange: [80, 160],
    yDirection: 'drift',
    durationRange: [18, 28],
    opacityRange: [0.02, 0.06],
    shape: 'blurred',
  },
};

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function buildParticleStyle(config, colors, index) {
  const size = randomBetween(...config.sizeRange);
  const duration = randomBetween(...config.durationRange);
  const delay = randomBetween(0, duration);
  const left = randomBetween(5, 95);
  const color = colors[index % colors.length] || '#ffb833';
  const drift = randomBetween(-40, 40);

  const base = {
    position: 'fixed',
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    pointerEvents: 'none',
    zIndex: 0,
    borderRadius: config.shape === 'blurred' ? '50%' : '50%',
    filter: config.shape === 'blurred' ? `blur(${size * 0.6}px)` : 'none',
    background: config.shape === 'blurred'
      ? `radial-gradient(circle, ${color}, transparent)`
      : color,
    '--duration': `${duration}s`,
    '--drift': `${drift}px`,
  };

  if (config.yDirection === 'rise') {
    return {
      ...base,
      bottom: '-5%',
      animationName: 'ember-rise',
      animationDuration: `${duration}s`,
      animationTimingFunction: 'ease-out',
      animationIterationCount: 'infinite',
      animationDelay: `${delay}s`,
    };
  }
  if (config.yDirection === 'fall') {
    return {
      ...base,
      top: '-5%',
      animationName: 'dust-fall',
      animationDuration: `${duration}s`,
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      animationDelay: `${delay}s`,
    };
  }
  if (config.yDirection === 'float') {
    const startY = randomBetween(10, 90);
    return {
      ...base,
      top: `${startY}%`,
      '--float-y': `${randomBetween(-30, -50)}px`,
      '--float-x': `${randomBetween(-20, 20)}px`,
      '--float-y2': `${randomBetween(-10, -25)}px`,
      '--float-x2': `${randomBetween(-15, 15)}px`,
      '--float-y3': `${randomBetween(-35, -55)}px`,
      '--float-x3': `${randomBetween(-25, 25)}px`,
      animationName: 'firefly-float',
      animationDuration: `${duration}s`,
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
      animationDelay: `${delay}s`,
    };
  }
  if (config.yDirection === 'drift') {
    const startY = randomBetween(60, 90);
    return {
      ...base,
      top: `${startY}%`,
      left: '-20%',
      animationName: 'fog-drift',
      animationDuration: `${duration}s`,
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      animationDelay: `${delay}s`,
    };
  }

  return base;
}

export default function EmberParticles({ type = 'ember', count = 8, colors = ['#ffb833', '#e84520'] }) {
  const config = PARTICLE_CONFIGS[type] || PARTICLE_CONFIGS.ember;

  const particles = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      style={buildParticleStyle(config, colors, i)}
      aria-hidden="true"
    />
  ));

  return <>{particles}</>;
}
