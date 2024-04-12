import { atom } from "recoil";

export const audioStateAtom = atom<any>({
  key: "audioStateAtom",
  default: null,
});
export const currentTimeAtom = atom({
  key: "currentTimeAtom",
  default: 0
});

export const currentSongAtom = atom<any>({
  key: "currentSongAtom",
  default: null,
});
