function countAllAnswers(exercise) {
    return exercise.stages.length;
}

function countCorrectAnswers(exercise) {
    return exercise.stages.filter(s => s.correctAnswer).length;
}

export function exerciseScore(exercise) {
    const all = countAllAnswers(exercise);
    return all === 0 ? "-" : countCorrectAnswers(exercise) + " / " + all;
}

export function exerciseScorePercent(exercise) {
    const all = countAllAnswers(exercise);
    return all === 0 ? "-" : (100 * countCorrectAnswers(exercise) / all).toFixed(0) + "%";
}
