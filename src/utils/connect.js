import WalletConnectProvider from "@walletconnect/web3-provider";
import axios from "../config/axios";
import { providers, Wallet } from "ethers";
import { devnet } from "./chains";

const chain = devnet;
const { ethereum } = window;
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
    const rAccounts = await changeChainId();
    return rAccounts || null;
  }
  localStorage.setItem("_metamask", accounts[0]);
  const res = await axios.post("/api/connect", {
    address: accounts[0],
  });
  console.log(res);
  if (res.data.data) {
    return accounts[0];
  }
  setTimeout(() => {
    window.location.reload();
  }, 1000);
  console.log(accounts[0]);
};

export const walletConnect = async () => {
  const provider = new WalletConnectProvider({
    rpc: {
      1666900000: "https://api.s0.ps.hmny.io",
    },
  });

  await provider.enable();
  provider.on("accountsChanged", (accounts) => {
    console.log(accounts);
    localStorage.setItem("_metamask", accounts[0]);
  });
  provider.on("chainChanged", (chainId) => {
    console.log(chainId);
    if (chainId !== chain.chainId) {
      return alert("Connect to harmony chain");
    }
  });
  const providerr = new providers.Web3Provider(provider);
  window.provider = providerr;
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
  localStorage.setItem("_metamask", accounts[0]);
  const res = await axios.post("/api/connect", {
    address: accounts[0],
  });
  if (res.data.data) {
    return accounts[0];
  }
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

export const burnerWallet = async () => {
  const { address, privateKey } = Wallet.createRandom();
  console.log(address);

  const res = await axios.post("/api/connect", {
    address,
  });
  localStorage.setItem("address", address);
  localStorage.setItem("pk", privateKey);
  if (res.data.data) {
    return address;
  }
};
