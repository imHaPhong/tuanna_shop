import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./sidebar.scss";
import Song from "./Song";
import { AiOutlineClose } from "react-icons/ai";
import { libaryToggle } from "../../features/libary";

const Sidebar = () => {
  const active = useSelector((state) => state.libary.active);
  const songs = useSelector((state) => state.player.songs);
  const song = useSelector((state) => state.player.currentSong.song.color);
  const dispatch = useDispatch();

  return (
    <div
      className={`sidebar-container ${active ? "sidebar-active" : ""}`}
      style={{ background: `linear-gradient(${song[0]},${song[1]})` }}
    >
      <div className="library-header">
        <p>Library</p>

        <AiOutlineClose onClick={() => dispatch(libaryToggle())} />
      </div>

      {songs &&
        songs.map((el) => {
          return <Song songData={el} />;
        })}
    </div>
  );
};

export default Sidebar;
