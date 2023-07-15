import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

export const GameContext = createContext({
  game: {
    player1: {
      username: "",
      address: "",
      avatar: "",
      wins: "",
      losses: "",
      perks: [],
      perksUsed: [],
    },
    player2: {
      username: "",
      address: "",
      avatar: "",
      wins: "",
      losses: "",
      perks: [],
      perksUsed: [],
    },
    time: "",
    code: "",
  },
  setGame: (game) => {},
});

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState({
    player1: {
      username: "",
      address: "",
      avatar: "",
      wins: "",
      losses: "",
      perks: [],
      perksUsed: [],
    },
    player2: {
      username: "",
      address: "",
      avatar: "",
      wins: "",
      losses: "",
      perks: [],
      perksUsed: [],
    },
    time: "",
    code: "",
  });

  const value = useMemo(
    () => ({
      game,
      setGame,
    }),
    [game]
  );

  useEffect(() => {}, []);

  return (
    <GameContext.Provider value={value}>
      {useMemo(
        () => (
          <>{children}</>
        ),
        [children]
      )}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
