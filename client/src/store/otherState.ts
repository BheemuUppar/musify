import { atom, selector } from "recoil";
import { getLibrary } from "../utils/apiutils";

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

export const libraryAtom = atom<any>({
  key: "libraryAtom",
  default: null,
});

export const leftPanelWidthAtom = atom<any>({
  key: "leftPanelWidthAtom",
  default: { width: "90px", size: "small" },
});

export const songInfoOpenAtom = atom({
  key: "songInfoOpenAtom",
  default: false,
});

export const snackbarAtom= atom<any>({
  key:"snackbarAtom",
  default:{
    severity:null,
    message:null
  },

})
