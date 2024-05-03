import { Album } from "./album";
import { Playlist } from "./Playlist";
import { Song } from "./song";

export interface SearchResults {
  albums: Album[];
  playlists: Playlist[];
  songs: Song[];
  artists: any[];
}
