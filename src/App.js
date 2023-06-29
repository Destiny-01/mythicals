import "bootstrap/dist/css/bootstrap.min.css";
import socketIO from "socket.io-client";
import "./Theme.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameMode from "./pages/GameMode";
import Arena from "./pages/Arena";
import SelectEgg from "./pages/SelectEgg";
import Welcome from "./pages/Welcome";
import { SERVER_URL } from "./constants";
import { AppProvider } from "./context/AppContext";
import Lobby from "./pages/Lobby";
import Select from "./pages/Select";

const socket = socketIO.connect(SERVER_URL);
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/game" exact element={<GameMode socket={socket} />} />
          <Route path="/egg" exact element={<SelectEgg socket={socket} />} />
          <Route
            path="/join/:id"
            exact
            element={<SelectEgg socket={socket} />}
          />
          <Route path="/welcome" exact element={<Welcome />} />
          <Route path="/lobby" exact element={<Lobby socket={socket} />} />
          <Route path="/select" exact element={<Select socket={socket} />} />
          <Route path="/room/:id" exact element={<Arena socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
