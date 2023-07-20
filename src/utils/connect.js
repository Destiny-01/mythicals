import WalletConnectProvider from "@walletconnect/web3-provider";
import axios from "../config/axios";
import { providers, Wallet } from "ethers";
import { mumbai } from "./chains";

const chain = mumbai;
const { ethereum } = window;
export const wcProvider = new WalletConnectProvider({
  rpc: {
    80001:
      "https://polygon-mumbai.g.alchemy.com/v2/-D6q_IdN2AiCh4k44LnX3R8CJnoOv4jG",
    1666900000: "https://api.s0.ps.hmny.io",
    137: "https://matic-mainnet.chainstacklabs.com",
  },
});
export const metamaskConnect = async () => {
  if (!ethereum) {
    window
      .open(
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
        "_blank"
      )
      .focus();
    return;
  }
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  const chainId = await ethereum.request({ method: "eth_chainId" });

  if (chainId !== chain.chainId) {
    return await changeChainId();
  }
  const res = await axios.post("/api/connect", {
    address: accounts[0],
  });
  return { address: accounts[0], newUser: res.data.data };
};

export const walletConnect = async () => {
  try {
    if (wcProvider.chainId !== chain.chainId) {
      return alert("Connect to harmony devnet");
    }

    await wcProvider.enable();
    const provider = new providers.Web3Provider(wcProvider);
    const { accounts } = wcProvider;
    const res = await axios.post("/api/connect", {
      address: accounts[0],
    });

    window.provider = provider;
    return { address: accounts[0], newUser: res.data.data };
  } catch (err) {
    console.log(err);
  }
};

wcProvider.on("chainChanged", async (chainId) => {
  if (chainId !== chain.chainId) {
    await wcProvider.disconnect();
    return alert("Connect to harmony chain");
  }
  await wcProvider.enable();
});

export const disconnectWalletConnect = async () => {
  await wcProvider.disconnect();
  window.provider = null;
};

const changeChainId = async () => {
  let chainId = await ethereum.request({ method: "eth_chainId" });

  console.log("target chain: ", chain.chainId);
  console.log("current chain: ", chainId);

  if (chainId !== chain.chainId) {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: chain.chainId,
          },
        ],
      });
      chainId = await ethereum.request({ method: "eth_chainId" });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [chain],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }
  }
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  const res = await axios.post("/api/connect", {
    address: accounts[0],
  });

  return { address: accounts[0], newUser: res.data.data };
};

export const burnerWallet = async () => {
  const { address, privateKey } = Wallet.createRandom();

  const res = await axios.post("/api/connect", {
    address,
  });
  localStorage.setItem("address", address);
  localStorage.setItem("pk", privateKey);
  if (res.data.data) {
    return address;
  }
};
