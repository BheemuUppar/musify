import { Album } from "./album";
import { Song } from "./song";

export interface SearchResults{
    albums:Album[],
    playlist:any,
    songs:Song[],
    artists:any
    
    }