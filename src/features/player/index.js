import { createSlice } from "@reduxjs/toolkit";
import chillHop from "../../data";

const getSongs = () => {
  const songs = chillHop();
  return {
    isPlay: false,
    songs: songs,
    isLoop: false,
    currentSong: {
      song: songs[0],
      index: 0,
    },
  };
};

const initialState = getSongs();

export const playerSlice = createSlice({
  name: "playerSlice",
  initialState,
  reducers: {
    nextSong: (state, action) => {
      const curentIndex = state.currentSong.index;
      const nextIndex = (curentIndex + 1) % state.songs.length;
      state.currentSong = {
        song: state.songs[nextIndex],
        index: nextIndex,
      };
    },
    toggleState: (state) => {
      state.isPlay = !state.isPlay;
    },
    toggleLoop: (state) => {
      state.isLoop = !state.isLoop;
    },
    selectSong: (state, action) => {
      state.currentSong = {
        song: state.songs.find((el) => el.id === action.payload),
        index: state.songs.findIndex((el) => el.id === action.payload),
      };
    },
  },
});

const { reducer, actions } = playerSlice;
export const { nextSong, toggleState, selectSong, toggleLoop } = actions;
export default reducer;
