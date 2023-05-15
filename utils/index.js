exports.getStatus = (guess, solution) => {
  let guessArr = guess.toString().split("");
  let solutionArr = solution.toString().split("");
  let result = "";

  for (let i = 0; i < guessArr.length; i++) {
    if (guessArr[i] === solutionArr[i]) {
      result += "dead ";
    } else if (solutionArr.includes(guessArr[i])) {
      result += "injured ";
    } else {
      result += "safe ";
    }
  }

  return result.trim();
};
