import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export const metamaskConnect = () => {
  const { ethereum } = window;
  if (!ethereum) {
    window
      .open(
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
        "_blank"
      )
      .focus();
    return;
  }
  ethereum.request({ method: "eth_accounts" }).then((accounts) => {
    localStorage.setItem("_metamask", accounts[0]);
    console.log(accounts[0]);
  });
};

export const walletConnect = () => {
  const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: QRCodeModal,
  });

  // Check if connection is already established
  if (!connector.connected) {
    // create new session
    connector.createSession();
  }

  // Subscribe to connection events
  connector.on("connect", (error, payload) => {
    if (error) {
      throw error;
    }

    // Get provided accounts and chainId
    const { accounts, chainId } = payload.params[0];
    localStorage.setItem("_metamask", accounts[0]);
    console.log(accounts, chainId);
  });
};
