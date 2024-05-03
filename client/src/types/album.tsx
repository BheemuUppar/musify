import { Url } from "./song";

export interface Album {
  artists: any;
  explicitContent: boolean;
  id: string;
  image: Url[];
  language: string | undefined;
  name: string;
  playCount: string | number | null | undefined;
  type: string;
  url: string;
  year: number | undefined;
}
