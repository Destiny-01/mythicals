import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
// import Web3 from "web3";
import { testnet } from "./chains";

const chain = testnet;
const { ethereum } = window;
export const metamaskConnect = () => {
  if (!ethereum) {
    window
      .open(
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
        "_blank"
      )
      .focus();
    return;
  }
  ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
    ethereum.request({ method: "eth_chainId" }).then((chainId) => {
      // if (chainId !== chain.chainId) {
      //   changeChainId();
      //   return;
      // }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      console.log(accounts[0]);
    });
  });
};

export const walletConnect = async () => {
  const provider = new WalletConnectProvider({
    rpc: {
      4: "https://rinkeby.infura.io/v3/f500f72e49b840e5bcfef67115e6023a",
    },
  });

  await provider.enable();
  provider.on("accountsChanged", (accounts) => {
    console.log(accounts);
    localStorage.setItem("_metamask", accounts[0]);
  });
  const providerr = new providers.Web3Provider(provider);
  window.provider = providerr;
};

// const changeChainId = async () => {
//   let chainId = await ethereum.request({ method: "eth_chainId" });
//   let isCorrectChain = chainId === chain.chainId;

//   console.log("target chain: ", chain.chainId);
//   console.log("current chain: ", chainId);

//   if (chainId !== chain.chainId) {
//     try {
//       await ethereum.request({
//         method: "wallet_switchEthereumChain",
//         params: [
//           {
//             chainId: chain.chainId,
//           },
//         ],
//       });
//       chainId = await ethereum.request({ method: "eth_chainId" });
//     } catch (error) {
//       if (error.code === 4902) {
//         try {
//           await ethereum.request({
//             method: "wallet_addEthereumChain",
//             params: [chain],
//           });
//         } catch (addError) {
//           console.error(addError);
//         }
//       }
//       console.error(error);
//     }
//   }
//   const accounts = await ethereum.request({
//     method: "eth_requestAccounts",
//   });
//   localStorage.setItem("_metamask", accounts[0]);
//   setTimeout(() => {
//     window.location.reload();
//   }, 2000);
//   isCorrectChain = chainId === chain.chainId;
// };
