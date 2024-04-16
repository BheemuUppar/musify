import { atom } from "recoil";

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
export const currentSongAtom = atom<any>({
  key: "currentSongAtom",
  default: null,
});
// holds volume
export const volumeAtom = atom<any>({
  key: "volumeAtom",
  default: 0.5,
});

// holds current playlist or album
export const currentSongsListAtom = atom<any>({
  key: "currentSongsListAtom",
  default: {
    songs: [],
    currentSongIndex: 0,
  },
});
