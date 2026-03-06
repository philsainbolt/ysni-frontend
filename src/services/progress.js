const STORAGE_KEY = 'pi-beaten-levels';

export function readLocalProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLocalProgress(levels) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(levels));
}

export function mergeProgress(localLevels, remoteLevels) {
  const merged = new Set([...(localLevels || []), ...(remoteLevels || [])]);
  return [...merged].sort((a, b) => Number(a) - Number(b));
}

export function isLevelUnlocked(levelId, beatenLevels) {
  if (String(levelId) === '1') return true;
  const previousId = String(Number(levelId) - 1);
  return beatenLevels.map(String).includes(previousId);
}
