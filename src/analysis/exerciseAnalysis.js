// Local, rule-based performance review — no API calls, no cost.
// Looks at every set of the exercise (not just the last one) to spot
// trends like fatigue across sets, not just a single number.
export function analyzeExercisePerformance(exercise, log) {
  const totalTarget = log.reduce((sum, s) => sum + s.targetReps, 0);
  const totalDone = log.reduce((sum, s) => sum + s.completedReps, 0);
  const hitCount = log.filter((s) => s.completedReps >= s.targetReps).length;
  const missCount = log.length - hitCount;

  const firstHalf = log.slice(0, Math.ceil(log.length / 2));
  const secondHalf = log.slice(Math.ceil(log.length / 2));
  const firstAvg =
    firstHalf.reduce((sum, s) => sum + s.completedReps, 0) / firstHalf.length;
  const secondAvg =
    secondHalf.length > 0
      ? secondHalf.reduce((sum, s) => sum + s.completedReps, 0) / secondHalf.length
      : firstAvg;
  const fadedLate = secondAvg < firstAvg - 1;

  const pctOfTarget = Math.round((totalDone / totalTarget) * 100);

  const totalVolume = log.reduce((sum, s) => sum + s.completedReps * (s.weight || 0), 0);
  const avgWeight = log.reduce((sum, s) => sum + (s.weight || 0), 0) / log.length;
  const usedWeight = avgWeight > 0;

  let right, wrong, tip;

  if (hitCount === log.length) {
    right = `You hit every target rep across all ${log.length} sets of ${exercise.name}${
      usedWeight ? ` at ${avgWeight.toFixed(1)} (total volume: ${totalVolume.toFixed(0)})` : ""
    } — full marks on volume.`;
  } else if (hitCount >= log.length / 2) {
    right = `You hit target reps on ${hitCount} of ${log.length} sets — solid overall output (${pctOfTarget}% of total target volume${
      usedWeight ? `, ${totalVolume.toFixed(0)} total load lifted` : ""
    }).`;
  } else {
    right = `You completed ${totalDone} of ${totalTarget} total reps (${pctOfTarget}%) — you showed up and pushed through every set.`;
  }

  if (missCount === 0) {
    wrong = "No real weak point here — this exercise is dialed in.";
  } else if (fadedLate) {
    wrong = `Reps dropped off in the later sets (avg ${firstAvg.toFixed(1)} early vs ${secondAvg.toFixed(1)} late) — that's a fatigue pattern, not a strength ceiling.`;
  } else {
    wrong = `You missed target on ${missCount} set${missCount > 1 ? "s" : ""}, without a clear early/late pattern — could be the weight is set slightly too high right now.`;
  }

  if (hitCount === log.length) {
    tip = usedWeight
      ? `Next session, bump the weight to about ${(avgWeight * 1.025).toFixed(1)}-${(avgWeight * 1.05).toFixed(1)} and keep the same rep target.`
      : "Next session, bump the weight by about 2.5-5% and keep the same rep target.";
  } else if (fadedLate) {
    tip = "Try adding 60-90 seconds more rest between sets, or trim one set, to protect quality on the later reps.";
  } else {
    tip = usedWeight
      ? `Drop the weight to around ${(avgWeight * 0.9).toFixed(1)} next session so every set lands closer to target — consistency beats one heroic set.`
      : "Drop the weight slightly (or the rep target) next session so every set lands closer to target — consistency beats one heroic set.";
  }

  return `${right} ${wrong} ${tip}`;
}

// Counts consecutive calendar days with a saved workout, ending at
// the most recent one — e.g. worked out Mon/Tue/Wed = streak of 3.
export function getCurrentStreak(history) {
  if (history.length === 0) return 0;

  const uniqueDates = [...new Set(history.map((h) => h.date.slice(0, 10)))].sort().reverse();

  let streak = 1;
  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const current = new Date(uniqueDates[i]);
    const prev = new Date(uniqueDates[i + 1]);
    const diffDays = Math.round((current - prev) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}