import { atom } from "recoil";

export const searchTextAtom = atom({
  key: "searchTextAtom",
  default: null,
});
export const searchModeAtom = atom({
  key: "searchModeAtom",
  default: false,
});

export const searchResultsAtom = atom<any>({
  key: "searchResultsAtom",
  default: null,
});
