import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Theme.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameMode from "./pages/GameMode";
import Arena from "./pages/Arena";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GameMode />} />
          <Route path="/play" element={<Arena />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
