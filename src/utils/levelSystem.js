// XP thresholds for each level
// Formula: level N requires N * 100 * 1.2^(N/10) total XP
const XP_TABLE = [];
let cumulative = 0;
for (let i = 1; i <= 100; i++) {
  const needed = Math.floor(i * 100 * Math.pow(1.15, Math.floor(i / 10)));
  cumulative += needed;
  XP_TABLE.push({ level: i, xpNeeded: needed, totalXp: cumulative });
}

export const LEVEL_TITLES = {
  1: 'Beginner',
  5: 'Novice Coder',
  10: 'Junior Developer',
  15: 'Rising Star',
  20: 'Intermediate Developer',
  25: 'Code Warrior',
  30: 'Advanced Developer',
  35: 'Senior Coder',
  40: 'Expert Developer',
  45: 'Code Architect',
  50: 'Python Master',
  60: 'Python Guru',
  70: 'Code Wizard',
  80: 'Python Sage',
  90: 'Code Legend',
  100: 'CreoLab Legend',
};

export function getLevelInfo(totalXp) {
  let level = 1;
  for (let i = 0; i < XP_TABLE.length; i++) {
    if (totalXp >= XP_TABLE[i].totalXp) {
      level = i + 2;
    } else {
      break;
    }
  }
  level = Math.min(level, 100);

  const currentLevelData = XP_TABLE[level - 1] || XP_TABLE[0];
  const prevLevelData = level > 1 ? XP_TABLE[level - 2] : { totalXp: 0 };
  const xpInCurrentLevel = totalXp - prevLevelData.totalXp;
  const xpNeededForNext = currentLevelData.xpNeeded;
  const progress = Math.min((xpInCurrentLevel / xpNeededForNext) * 100, 100);

  return {
    level,
    title: getLevelTitle(level),
    xpInCurrentLevel,
    xpNeededForNext,
    progress,
    totalXp,
  };
}

export function getLevelTitle(level) {
  const titles = Object.entries(LEVEL_TITLES).sort((a, b) => Number(b[0]) - Number(a[0]));
  for (const [minLevel, title] of titles) {
    if (level >= Number(minLevel)) return title;
  }
  return 'Beginner';
}

export function getLevelColor(level) {
  if (level >= 80) return '#ef4444';
  if (level >= 60) return '#8b5cf6';
  if (level >= 40) return '#3b82f6';
  if (level >= 20) return '#06b6d4';
  if (level >= 10) return '#10b981';
  return '#22c55e';
}

export { XP_TABLE };
