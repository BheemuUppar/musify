import { Song, Url } from "./song";

export interface MyPlaylist {
  collaborative: boolean;
  email: string;
  image: Url[];
  name: string;
  songs: Song[];
  type: string;
  username: string;
  _id: string;
}
