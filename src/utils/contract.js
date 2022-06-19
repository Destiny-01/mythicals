import Web3 from "web3";
import Dead from "./Dead.json";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "wss://rinkeby.infura.io/ws/v3/f500f72e49b840e5bcfef67115e6023a"
  )
);

const address = "0xEB3904586B7670605Ec649d3Db8be46520f895Ee";
const contract = new web3.eth.Contract(Dead.abi, address);

const subscription = web3.eth
  .subscribe(
    "logs",
    {
      address: window.ethereum.selectedAddress,
    },
    function (error, result) {
      if (!error) console.log(result, "result");
    }
  )
  .on("connected", function (subscriptionId) {
    console.log(subscriptionId, "connected");
  })
  .on("data", function (log) {
    console.log(log, "log");
  })
  .on("changed", function (log) {});

export { contract, subscription };
