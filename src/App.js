import "bootstrap/dist/css/bootstrap.min.css";
import socketIO from "socket.io-client";
import "./Theme.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameMode from "./pages/GameMode";
import Arena from "./pages/Arena";
import SelectEgg from "./pages/SelectEgg";

const socket = socketIO.connect("https://mythicals.onrender.com");
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/game" exact element={<GameMode />} />
        <Route path="/egg" exact element={<SelectEgg socket={socket} />} />
        <Route path="/room/:id" exact element={<Arena socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
