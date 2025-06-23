function simulateMatch() {
  const ratingA = parseInt(document.getElementById("ratingA").value);
  const ratingB = parseInt(document.getElementById("ratingB").value);
  const homeAdvantageChecked = document.getElementById("homeAdvantage").checked;

  const differenceRaw = Math.abs(ratingA - ratingB);
  const differenceNorm = differenceRaw / 22;
  const totalGoals = 1 + (differenceNorm * 2) * 5;
  const goalDifferenceFactor = Math.max(0.05, 1 - (differenceNorm * 2));

  let teamAStrength = ratingA / (ratingA + ratingB);
  let teamBStrength = ratingB / (ratingA + ratingB);

  if (homeAdvantageChecked) {
    teamAStrength += 0.05;
  }

  // Normalize so total strength = 1
  const totalStrength = teamAStrength + teamBStrength;
  teamAStrength /= totalStrength;
  teamBStrength /= totalStrength;

  let goalsA = totalGoals * teamAStrength;
  let goalsB = totalGoals * teamBStrength;

  // Weaker team goal reduction
  const weaker = ratingA < ratingB ? 'A' : 'B';
  if (weaker === 'A') {
    goalsA *= goalDifferenceFactor;
  } else {
    goalsB *= goalDifferenceFactor;
  }

  goalsA = Math.round(goalsA);
  goalsB = Math.round(goalsB);

  document.getElementById("result").innerText =
    `Score: Team A ${goalsA} - ${goalsB} Team B`;
}
