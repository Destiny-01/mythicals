import "bootstrap/dist/css/bootstrap.min.css";
import "./Theme.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameMode from "./pages/GameMode";
import Arena from "./pages/Arena";
import SelectEgg from "./pages/SelectEgg";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GameMode />} />
          <Route path="/room/:id" element={<Arena />} />
          <Route path="/egg" element={<SelectEgg />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
