import Web3 from "web3";
import Dead from "./Dead.json";

export const web3 = new Web3(window.ethereum);

const address = "0xEB3904586B7670605Ec649d3Db8be46520f895Ee";
const contract = new web3.eth.Contract(Dead.abi, address);

const subscription = web3.eth.subscribe(
  "logs",
  { address },
  function (error, result) {
    if (!error) console.log(result, "result");
  }
);

export const startGame = (id, solution, sol1, sol2, sol3, sol4, action) => {
  const salt = web3.utils.hexToBytes(web3.utils.randomHex(16));
  if (action === "create") {
    contract.methods
      .startGame(id, salt.join(2), solution, sol1, sol2, sol3, sol4)
      .send({ from: window.ethereum.selectedAddress })
      .on("transactionHash", function (hash) {})
      .on("confirmation", function (confirmationNumber, receipt) {})
      .on("receipt", function (receipt) {
        console.log(receipt.events.GameCreated.returnValues._hash, "reciept");
        window.location.href = `/room/${id}`;
      });
  } else {
    contract.methods
      .joinGame(id, salt.join(2), solution, sol1, sol2, sol3, sol4)
      .send({ from: window.ethereum.selectedAddress })
      .on("transactionHash", function (hash) {
        console.log(hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        console.log(receipt.events.GameJoined.returnValues._hash, "reciept");
        window.location.href = `/room/${id}`;
      });
  }
};

export const getGame = async (id) => {
  const game = await contract.methods.getGame(id).call();
  return game;
};
export const call = () => {
  contract.getPastEvents(
    "GameJoined",
    {
      fromBlock: 0,
      toBlock: "latest",
    },
    function (error, result) {
      console.log(result, "Store");
    }
  );
};
