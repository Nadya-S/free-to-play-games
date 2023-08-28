import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GamePage from "./pages/GamePage";
import { routes } from "./utils/routes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path={routes.MAIN_PAGE} element={<MainPage />} />
        <Route path={routes.GAME_PAGE} element={<GamePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
