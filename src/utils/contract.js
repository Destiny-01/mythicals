import MythToken from "../contract/abi/MythToken.json";
import Myth from "../contract/abi/Myth.json";
import { ethers, providers, utils } from "ethers";

const provider = window.provider
  ? window.provider
  : new providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
export const tokenContract = new ethers.Contract(
  MythToken.address,
  MythToken.abi,
  signer
);
export const contract = new ethers.Contract(Myth.address, Myth.abi, signer);

export const initialMint = async () => {
  try {
    const res = await contract.initialMint();
    await res.wait();
    if (res.transactionHash) {
      return res.transactionHash;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getBalance = async (address) => {
  try {
    const res = await tokenContract.balanceOf(address);
    console.log(res);

    return utils.formatEther(res.toString());
  } catch (err) {
    console.log(err);
    return null;
  }
};

// export const getGuessStatuses = (result) => {
//   const statuses = Array.from(Array(result.length));

//   result.forEach((sol) => {
//     const soln = sol.toString();
//     const solnMap = soln.split("");
//     switch (solnMap[0]) {
//       case "3":
//         statuses[solnMap[1]] = "dead";
//         break;
//       case "5":
//         statuses[solnMap[1]] = "injured";
//         break;
//       case "6":
//         statuses[solnMap[1]] = "safe";
//         break;
//       default:
//         break;
//     }
//   });

//   return statuses;
// };

// export const getGame = async (id) => {
//   if (!window.ethereum.selectedAddress) {
//     window.ethereum.selectedAddress = signer.address;
//   }
//   const game = await contract.getGame(id);
//   return game;
// };

// export const getPlayer = async () => {
//   const player = await contract.getPlayer();
//   return player;
// };

// export const guessCode = async (id, guess) => {
//   try {
//     const game = await getGame(id);
//     let salt;
//     let solution;
//     let hash;
//     if (
//       window.ethereum.selectedAddress.toUpperCase() ===
//       game.player1.toUpperCase()
//     ) {
//       solution = BigNumber.from(game.solution2).toString();
//       salt = BigNumber.from(game.salt2).toString();
//       hash = BigNumber.from(game.hash2).toString();
//     } else {
//       solution = BigNumber.from(game.solution1).toString();
//       salt = BigNumber.from(game.salt1).toString();
//       hash = BigNumber.from(game.hash1).toString();
//     }
//     console.log(solution);

//     const solutionArr = String(solution)
//       .split("")
//       .map((currentGuess) => {
//         return Number(currentGuess);
//       });
//     solutionArr.length < 5 && solutionArr.unshift(0);
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         guess,
//         solution: solutionArr,
//         hash,
//         salt,
//       }),
//     };
//     const data = await fetch("/proof", options);
//     const { input, response } = await data.json();
//     const tx = await contract.guessCode(
//       id,
//       guess.join(""),
//       response,
//       input[0],
//       input[1],
//       input[2],
//       input[3]
//     );
//     const receipt = await tx.wait();
//     console.log(tx, receipt);
//     const statuses = getGuessStatuses(response);
//     return statuses;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const convert = (guesses) => {
//   const string = [];
//   guesses.forEach((g) => {
//     string.push(g.toString());
//   });
//   return string;
// };
