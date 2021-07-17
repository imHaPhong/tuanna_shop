import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { libaryToggle } from "../../features/libary";
import "./player.scss";
import {
  FaAngleLeft,
  FaAngleRight,
  FaPause,
  FaPlay,
  FaForward,
  FaBackward,
} from "react-icons/fa";

import {
  ImLoop,
  ImVolumeLow,
  ImVolumeMedium,
  ImVolumeHigh,
  ImVolumeMute2,
} from "react-icons/im";

import { nextSong, toggleLoop, toggleState } from "../../features/player";

const Player = () => {
  const dispatch = useDispatch();

  const [songPlayInfo, setSongPlayInfo] = useState({
    current: 0,
    duration: null,
  });

  const active = useSelector((state) => state.libary.active);

  const { currentSong, songs, isPlay, isLoop } = useSelector(
    (state) => state.player
  );

  const songRef = useRef();
  const [volume, setVolume] = useState(1);
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    songRef.current.volume = volume;
    if (!isPlay) {
      songRef.current.pause();
    } else {
      songRef.current.play();
    }
    return () => {
      setSongPlayInfo({
        current: 0,
        duration: null,
      });
    };
  }, [currentSong]);

  const playHandler = () => {
    dispatch(toggleState());
    if (isPlay) {
      songRef.current.pause();
    } else {
      songRef.current.play();
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const timeUpdateHandler = (e) => {
    if (e.target.currentTime !== songPlayInfo.duration) {
      setSongPlayInfo({
        current: e.target.currentTime,
        duration: e.target.duration,
      });
      return;
    }

    if (isLoop && isPlay) {
      songRef.current.currentTime = 0;
      songRef.current.play();
    } else {
      setTimeout(() => {
        dispatch(nextSong());
      }, 500);
    }
  };

  const changeSong = () => {
    setSongPlayInfo((p) => ({
      ...p,
      duration: 0,
    }));
    dispatch(nextSong());
  };

  const onDragHandler = (e) => {
    songRef.current.currentTime = e.target.value;
  };

  const userChangeVolume = (e) => {
    setVolume(e.target.value);
    songRef.current.volume = e.target.value;
  };

  const renderVolumeIcon = () => {
    const currentVolume = songRef.current.volume;
    if (currentVolume == 0.0) {
      return <ImVolumeMute2 />;
    } else if (currentVolume < 0.6) {
      return <ImVolumeLow />;
    } else if (currentVolume < 0.8) {
      return <ImVolumeMedium />;
    } else {
      return <ImVolumeHigh />;
    }
  };

  return (
    <div className="player-container">
      <div className="header">
        <span>Wave</span>
        <button
          className={`${active ? "active" : ""}`}
          onClick={() => dispatch(libaryToggle())}
        >
          Library
        </button>
      </div>

      <div className="player__top">
        <div className="player__title">
          <img src={currentSong.song.cover} alt="" />
          <div style={{ margin: "5rem 0" }}>
            <h1>{currentSong.song.name}</h1>
            <h3>{currentSong.song.artist}</h3>
          </div>
          <div className="player__range">
            <span>{getTime(songPlayInfo.current)}</span>
            <input
              type="range"
              min={0}
              max={songPlayInfo.duration || 0}
              value={songPlayInfo.current}
              onChange={onDragHandler}
            />
            <span>
              {songPlayInfo.duration ? getTime(songPlayInfo.duration) : "0:00"}
            </span>
          </div>
        </div>
      </div>

      <div className="player__controller">
        <div onClick={() => setShowVolume((p) => !p)}>
          {songRef ? <ImVolumeHigh /> : renderVolumeIcon()}
        </div>
        <input
          style={{ display: showVolume ? "block" : "none" }}
          type="range"
          step={0.1}
          min={0}
          max={1}
          value={volume}
          onChange={userChangeVolume}
        />
        <FaAngleLeft />
        {isPlay ? (
          <FaPause onClick={playHandler} />
        ) : (
          <FaPlay onClick={playHandler} />
        )}
        <audio
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          src={currentSong.song.audio}
          ref={songRef}
        ></audio>
        <FaAngleRight onClick={changeSong} />
        <ImLoop
          onClick={() => dispatch(toggleLoop())}
          style={{ fill: `${isLoop ? "rgba(0, 0, 0, 0.6)" : ""}` }}
        />
      </div>
    </div>
  );
};

export default Player;
