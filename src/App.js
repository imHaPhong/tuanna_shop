import React from "react";
import "./index.scss";

import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";

const App = () => {
  const libaryActive = useSelector((state) => state.libary.active);

  const song = useSelector((state) => state.player.currentSong.song.color);

  return (
    <div
      className={`App ${libaryActive ? "libaryActive" : ""}`}
      style={{ background: `linear-gradient(${song[0]},${song[1]})` }}
    >
      <div style={{ background: "    rgba(0, 0, 0, 0.6)", height: "100%" }}>
        <div className="app-container">
          <Sidebar />
          <Player />
        </div>
      </div>
    </div>
  );
};

export default App;
