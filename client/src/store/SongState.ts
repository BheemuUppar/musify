import { atom } from "recoil";

export const audioStateAtom = atom<any>({
  key: "audioStateAtom",
  default: null,
});

export const currentSongAtom = atom<any>({
  key: "currentSongAtom",
  default: null
});
