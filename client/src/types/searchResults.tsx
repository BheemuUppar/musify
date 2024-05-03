import { Album } from "./album";
import { Song } from "./song";

export interface SearchResults{
    albums:Album[],
    playlists:any,
    songs:Song[],
    artists:any
    
    }