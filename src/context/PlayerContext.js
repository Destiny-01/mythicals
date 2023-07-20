import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { disconnectWalletConnect } from "../utils/connect";
import axios from "../config/axios";
import { getBalance } from "../utils/contract";

export const PlayerContext = createContext({
  address: null,
  provider: "",
  setAddress: (address) => {},
  setProvider: (provider) => {},
  disconnect: () => {},
  player: {
    username: "",
    address: "",
    avatar: "",
    wins: "",
    losses: "",
    balances: [],
  },
  balance: "",
  setBalance: (balance) => {},
});

export const PlayerProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(localStorage.getItem("provider"));
  const [balance, setBalance] = useState(0);
  const [player, setPlayer] = useState({
    username: "",
    balances: [],
    address,
    avatar: "",
    wins: "",
    losses: "",
  });
  const disconnect = useCallback(async () => {
    localStorage.removeItem("provider");
    localStorage.removeItem("address");
    localStorage.removeItem("pk");
    setAddress(null);
    setProvider("");
    provider === "walletConnect" && (await disconnectWalletConnect());
  }, [provider]);
  const value = useMemo(
    () => ({
      address,
      player,
      setAddress,
      provider,
      setProvider,
      disconnect,
      balance,
      setBalance,
    }),
    [address, player, provider, disconnect, balance]
  );

  useEffect(() => {
    if (address) {
      getBalance(address).then((res) => {
        setBalance(res.balance);
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          balances: res.eggsBalance,
          address,
        }));
      });
    }
  }, [address]);

  useEffect(() => {
    switch (provider) {
      case "metamask":
        window.ethereum
          ?.request({
            method: "eth_accounts",
          })
          .then((accounts) => {
            if (accounts.length > 0) {
              setAddress(accounts[0]);
              accounts[0] &&
                axios
                  .get("/api/player/" + accounts[0])
                  .then((res) => {
                    setPlayer(res.data.data);
                  })
                  .catch((err) => {
                    disconnect();
                    alert("An error occured, try logging in again");
                    window.location.reload();
                  });
            }
          });
        break;

      case "walletConnect":
        if (window.provider) {
          setAddress(window.provider.provider.accounts[0]);
          axios
            .get("/api/player/" + window.provider.provider.accounts[0])
            .then((res) => {
              setPlayer(res.data.data);
            });
        }
        break;

      default:
        setAddress(localStorage.getItem("address"));
        localStorage.getItem("address") &&
          axios
            .get("/api/player/" + localStorage.getItem("address"))
            .then((res) => {
              setPlayer(res.data.data);
            });
    }
  }, [disconnect, provider]);

  return (
    <PlayerContext.Provider value={value}>
      {useMemo(
        () => (
          <>{children}</>
        ),
        [children]
      )}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
