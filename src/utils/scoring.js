export function calculateQuizScore(answers, timeBonus = false) {
  let stars = 0;
  let xp = 0;
  let correct = 0;
  let wrong = 0;

  answers.forEach(a => {
    if (a.isCorrect) {
      stars += 5;
      xp += 20;
      correct++;
    } else if (a.isPartial) {
      stars += 3;
      xp += 10;
      correct++;
    } else {
      wrong++;
    }
  });

  if (timeBonus) {
    stars += 2;
    xp += 10;
  }

  const total = answers.length;
  const percentage = total > 0 ? (correct / total) * 100 : 0;
  const isPerfect = wrong === 0 && total > 0;

  return { stars, xp, correct, wrong, total, percentage, isPerfect };
}

export function calculateChallengeScore(result) {
  if (result === 'perfect') return { stars: 5, xp: 50, label: 'Perfect Solution!' };
  if (result === 'partial') return { stars: 3, xp: 25, label: 'Partially Correct' };
  return { stars: 0, xp: 5, label: 'Keep Trying!' };
}

export function formatStars(count) {
  return '⭐'.repeat(Math.min(count, 5));
}

export function getStarRating(score, maxScore) {
  const ratio = score / maxScore;
  if (ratio >= 1) return 5;
  if (ratio >= 0.8) return 4;
  if (ratio >= 0.6) return 3;
  if (ratio >= 0.4) return 2;
  if (ratio > 0) return 1;
  return 0;
}
