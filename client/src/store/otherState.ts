import { atom } from "recoil";
import { SearchResults } from "../types/searchResults";
import { MyPlaylist } from "../types/MyPlaylist";

export const searchTextAtom = atom<string>({
  key: "searchTextAtom",
  default: undefined,
});
export const searchModeAtom = atom<boolean>({
  key: "searchModeAtom",
  default: false,
});



export const searchResultsAtom = atom<SearchResults>({
  key: "searchResultsAtom",
  default: undefined,
});

export const libraryAtom = atom<MyPlaylist[]>({
  key: "libraryAtom",
  default: undefined
});

export const leftPanelWidthAtom = atom<any>({
  key: "leftPanelWidthAtom",
  default: { width: "90px", size: "small" },
});

export const songInfoOpenAtom = atom<boolean>({
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

export const themeAtom = atom<string>({
  key:"themeAtom",
  default:"white"
})
