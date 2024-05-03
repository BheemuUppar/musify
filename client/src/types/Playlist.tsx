import { Url } from "./song";

export interface Playlist {
  explicitContent: boolean;
  id: string;
  image: Url[];
  language: string;
  name: string;
  songCount: number;
  type: string;
  url: string;
}
