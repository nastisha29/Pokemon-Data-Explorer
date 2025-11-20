import { Route, Routes } from "react-router-dom";
import "./App.css";
import PokemonList from "./pages/PokemonList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PokemonList />} />
      </Routes>
    </div>
  );
}

export default App;
