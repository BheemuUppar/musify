import { atom } from "recoil";
import { Song } from "../types/song";

// audio element <audio></audio>
export const audioStateAtom = atom<any>({
  key: "audioStateAtom",
  default: null,
});

// holds current playing time
export const currentTimeAtom = atom({
  key: "currentTimeAtom",
  default: 0,
});
// holds current song object
export const currentSongAtom = atom<Song >({
  key: "currentSongAtom",
  default: undefined,
});
// holds volume
export const volumeAtom = atom<any>({
  key: "volumeAtom",
  default: 0.5,
});
// holds volume
export const isPlayingAtom = atom<any>({
  key: "isPlayingAtom",
  default: false,
});

// holds current playlist or album
export const currentSongsListAtom = atom<any>({
  key: "currentSongsListAtom",
  default: {
    songs: [],
    currentSongIndex: 0,
  },
});
