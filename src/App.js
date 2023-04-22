import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/auth.js";
import Land from "./components/land";
import Home from "./components/home";
import Admin from "./components/admin";
import Feature from "./components/feature";
import Game1 from "./components/game1";
import Game2 from "./components/game2";
import Game3 from "./components/game3";
import Game4 from "./components/game4";
import Game5 from "./components/game5";
import Vic from "./components/vic";
import About from "./components/about";
import Leader from "./components/leader";
import Lost from "./components/lost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Land />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/home/:id" element={<Home />} />
          <Route path="/feature" element={<Feature />} />
          <Route path="/game/:id/1" element={<Game1 />} />
          <Route path="/game/:id/2" element={<Game2 />} />
          <Route path="/game/:id/3" element={<Game3 />} />
          <Route path="/game/:id/4" element={<Game4 />} />
          <Route path="/game/:id/5" element={<Game5 />} />
          <Route path="/vic/:id" element={<Vic />} />
          <Route path="/about" element={<About />} />
          <Route path="/leader" element={<Leader />} />
          <Route path="/lost/:id" element={<Lost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
