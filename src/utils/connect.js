import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
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
      if (chainId === chain.chainId) {
        changeChainId();
        return;
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      console.log(accounts[0]);
    });
  });
};

export const walletConnect = () => {
  const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: QRCodeModal,
  });
  if (!connector.connected) {
    connector.createSession();
  }
  connector.on("connect", (error, payload) => {
    if (error) {
      throw error;
    }

    const { accounts, chainId } = payload.params[0];
    localStorage.setItem("_metamask", accounts[0]);
    console.log(accounts, chainId);
  });
};

const changeChainId = async () => {
  let chainId = await ethereum.request({ method: "eth_chainId" });
  let isCorrectChain = chainId === chain.chainId;

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
  setTimeout(() => {
    window.location.reload();
  }, 2000);
  isCorrectChain = chainId === chain.chainId;
};
