import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSong } from "../../features/player";
import "./sidebar.scss";

const Song = ({ songData }) => {
  const currentSong = useSelector((state) => state.player.currentSong);
  const dispatch = useDispatch();

  const clickHandler = (id) => {
    dispatch(selectSong(id));
  };
  return (
    <div
      className={`song-container ${
        songData.id === currentSong.song.id ? "active" : ""
      }`}
      onClick={() => clickHandler(songData.id)}
    >
      <img src={songData.cover} alt="" />
      <div className="song-detail">
        <h3>{songData.name}</h3>
        <h4>{songData.artist}</h4>
      </div>
    </div>
  );
};

export default Song;
