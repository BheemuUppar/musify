import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  searchModeAtom,
  searchResultsAtom,
  searchTextAtom,
} from "../store/otherState";
import { useEffect } from "react";
import axios from "axios";
import { environment } from "../assets/environment";
import PlayButton from "./PlayButton";
import AlbumSongCard from "./AlbumSongCard";
import { Link } from "react-router-dom";

function SearchPage() {
  const searchText = useRecoilValue(searchTextAtom);
  const [searchResults, setSearchResults] = useRecoilState(searchResultsAtom);

  useEffect(() => {
    searchHandler();
  }, [searchText]);
  async function searchHandler() {
    let obj: any = {};
    if (searchText) {
      obj["albums"] = await fetchAlbums();
      obj["songs"] = await fetchSongs();
      obj["playlists"] = await fetchPlaylist();
      obj["artists"] = await fetchArtists();
      setSearchResults(obj);
    }
  }

  async function fetchAlbums() {
    let data = await axios.get(`${environment.searchUrl}/albums/${searchText}`);
    return data.data;
  }
  async function fetchSongs() {
    let data = await axios.get(`${environment.searchUrl}/songs/${searchText}`);
    return data.data;
  }
  async function fetchPlaylist() {
    let data = await axios.get(
      `${environment.searchUrl}/playlist/${searchText}`
    );
    return data.data;
  }
  async function fetchArtists() {
    let data = await axios.get(
      `${environment.searchUrl}/artists/${searchText}`
    );
    return data.data;
  }

  console.log("search results ", searchResults);
  return (
    <>
      <div className="grid grid-cols-3">
        { searchResults && searchResults.albums.length > 0 &&  <div className="col-span-1">
          
            <TopResultCard
              album={searchResults ? searchResults.albums[0] : null}
            /> </div> 
            }
       {  searchResults && searchResults.songs.length>0  &&  
       <div className="col-span-2">
           { searchResults.songs.map((song: any, index: number) => {
              if (index < 4) {
                return <AlbumSongCard key={song.id} song={song} />;
              }
            })}
        </div>}
      </div>
    </>
  );
}

function TopResultCard({ album, className }: any) {
  console.log(album);
  return (
    <>
      <h1 className="text-2xl">Top Results</h1>
      <div className="buttonParent   rounded relative group p-6 w-[350px] h-[200px] bg-dark-500 hover:bg-dark-600 transition ease-in duration-300">
    <Link to={"/home/album/"+album.id}>
        <img className="h-[70px] w-[70px]" src={album.image[1].url} alt="" />
        <h1 className="text-2xl">{album.name}</h1>
        <span className="text-gray-500">
          <p>{album.type}</p>
        </span>
        <div className="hidden absolute bottom-0 right-4 group-hover:block opacity-25 group-hover:-translate-y-[30px] group-hover:opacity-100 transition ease-in duration-500 ">
          <PlayButton />
        </div>
      </Link>
      </div>
    </>
  );
}


export default SearchPage;
