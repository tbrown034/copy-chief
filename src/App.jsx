import MainMenu from "./components/UI/MainMenu";
import GameMenu from "./components/UI/GameMenu";
import { useState } from "react";
function App() {
  const [showGameMenu, setShowGameMenu] = useState(false);

  const startGame = () => {
    setShowGameMenu(true);
  };

  const backToMenu = () => {
    setShowGameMenu(false);
  };

  return (
    <div className="p-2 px-4 bg-sky-100 text-sky-950">
      {!showGameMenu ? (
        <MainMenu startGame={startGame} />
      ) : (
        <GameMenu backToMenu={backToMenu} />
      )}
    </div>
  );
}

export default App;
