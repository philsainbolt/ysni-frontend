const levelThemes = {
  1: {
    name: 'The Green Haven',
    subtitle: 'Where the journey begins',
    atmosphere:
      'The rolling hills stretch endlessly, dotted with lantern-lit windows and winding paths. The air is warm and inviting. But even here, in this gentle place, secrets hide behind simple words...',
    colors: {
      bg: '#1a2e1a',
      surface: '#2d4a2d',
      primary: '#7bc67b',
      accent: '#d4a843',
      border: '#3d6b3d',
      text: '#e8f0e8',
      muted: '#8fb88f',
    },
    gradient:
      'radial-gradient(ellipse at 20% 80%, rgba(45,120,45,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(212,168,67,0.08) 0%, transparent 40%), linear-gradient(175deg, #1a2e1a 0%, #0f1f0f 50%, #162316 100%)',
    particles: null,
    passColor: 'text-emerald-300',
    failColor: 'text-rose-300',
  },
  2: {
    name: 'The Whispering Wild',
    subtitle: 'Something watches from the trees',
    atmosphere:
      'The path narrows between ancient oaks whose branches claw at the fading sky. Torchlight flickers at the edges of your vision. The wind carries whispers — fragments of old instructions, half-remembered rules...',
    colors: {
      bg: '#1a1a2e',
      surface: '#252547',
      primary: '#6b7fd4',
      accent: '#c7a84e',
      border: '#3a3a6b',
      text: '#d4d8f0',
      muted: '#7e84a8',
    },
    gradient:
      'radial-gradient(ellipse at 50% 0%, rgba(107,127,212,0.1) 0%, transparent 50%), radial-gradient(ellipse at 10% 90%, rgba(199,168,78,0.06) 0%, transparent 40%), linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 60%, #1a1525 100%)',
    particles: null,
    passColor: 'text-emerald-300',
    failColor: 'text-rose-300',
  },
  3: {
    name: 'The Shattered Pass',
    subtitle: 'The mountain does not forgive',
    atmosphere:
      'The path narrows to a ledge carved into the mountainside. Wind howls through the pass, carrying ice and loose stone. One misstep means the fall. The defenses here are layered like the rock itself — ancient, deliberate, and unforgiving...',
    colors: {
      bg: '#1a1714',
      surface: '#2e2822',
      primary: '#d4953a',
      accent: '#e8c547',
      border: '#5c4a36',
      text: '#e8dcc8',
      muted: '#a89878',
    },
    gradient:
      'radial-gradient(ellipse at 50% 30%, rgba(212,149,58,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(196,78,61,0.05) 0%, transparent 40%), linear-gradient(170deg, #1a1714 0%, #120f0c 50%, #1e1812 100%)',
    particles: null,
    passColor: 'text-emerald-300',
    failColor: 'text-rose-300',
  },
  4: {
    name: 'The Dead Marshes',
    subtitle: 'Trust nothing at face value',
    atmosphere:
      'The ground squelches with each step. Pale lights drift beneath the surface of stagnant water — not guides, but traps. The air is thick with decay and misdirection. Every instruction here is layered with false paths...',
    colors: {
      bg: '#0d0f0a',
      surface: '#1a1f14',
      primary: '#6b8c3a',
      accent: '#8b4513',
      border: '#3a4a2a',
      text: '#c8ccb8',
      muted: '#6b7060',
    },
    gradient:
      'radial-gradient(ellipse at 30% 70%, rgba(74,122,90,0.08) 0%, transparent 45%), radial-gradient(ellipse at 70% 30%, rgba(107,140,58,0.05) 0%, transparent 40%), linear-gradient(180deg, #0d0f0a 0%, #080a06 50%, #0f120a 100%)',
    particles: null,
    passColor: 'text-emerald-300',
    failColor: 'text-rose-300',
  },
  5: {
    name: 'The Ashen Peak',
    subtitle: 'Where words are forged and broken',
    atmosphere:
      'The sky is black with ash. Cracks in the earth glow with molten fury. This is the end of the road — the final defense, forged in fire and designed to break all who reach it. Only the sharpest blade of language will cut through...',
    colors: {
      bg: '#0a0000',
      surface: '#1a0a0a',
      primary: '#e84520',
      accent: '#ffb833',
      border: '#5a1a0a',
      text: '#f0d8c8',
      muted: '#8a6050',
    },
    gradient:
      'radial-gradient(ellipse at 50% 100%, rgba(232,69,32,0.12) 0%, transparent 50%), radial-gradient(ellipse at 20% 60%, rgba(255,106,0,0.06) 0%, transparent 40%), radial-gradient(ellipse at 80% 40%, rgba(255,32,32,0.04) 0%, transparent 45%), linear-gradient(0deg, #1a0800 0%, #0a0000 40%, #0d0204 100%)',
    particles: { type: 'ember', count: 12, colors: ['#ffb833', '#e84520', '#ff6a00'] },
    passColor: 'text-emerald-300',
    failColor: 'text-rose-300',
  },
};

export function getTheme(level) {
  return levelThemes[level] || levelThemes[1];
}

export default levelThemes;
