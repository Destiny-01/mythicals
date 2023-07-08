exports.getStatus = (guess, solution) => {
  let guessArr = guess.toString().split("");
  let solutionArr = solution.toString().split("");
  let result = "";
  let injured = 0;

  for (let i = 0; i < guessArr.length; i++) {
    if (guessArr[i] === solutionArr[i]) {
      result += "dead ";
    } else if (solutionArr.includes(guessArr[i])) {
      injured++;
    } else {
      result += "safe ";
    }
  }

  return { status: result.trim(), injured };
};
