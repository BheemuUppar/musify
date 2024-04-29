import { useRecoilState, useRecoilValue } from "recoil";
import {searchResultsAtom, searchTextAtom} from "../../store/otherState";
import { useEffect } from "react";
import axios from "axios";
import { environment } from "../../assets/environment";
import AlbumSongCard from "../shared/AlbumSongCard";
import { currentSongsListAtom } from "../../store/SongState";
import TopResultCard from "./TopResultCard";
import CollaborationWrapper from "../shared/CollaborationWrapper";

function SearchPage() {
  const searchText = useRecoilValue(searchTextAtom);
  const [searchResults, setSearchResults] = useRecoilState(searchResultsAtom);
  const [currentSongList, setCurrentSongList] = useRecoilState(currentSongsListAtom);

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
    let data = await axios.get(`${environment.searchUrl}/albums/${searchText}`,{
      headers:{
        Authorization:localStorage.getItem('token')
      }
    });
    return data.data;
  }
  async function fetchSongs() {
    let data = await axios.get(`${environment.searchUrl}/songs/${searchText}`,{
      headers:{
        Authorization:localStorage.getItem('token')
      }
    });
    return data.data;
  }
  async function fetchPlaylist() {
    let data = await axios.get(
      `${environment.searchUrl}/playlist/${searchText}`,{
        headers:{
          Authorization:localStorage.getItem('token')
        }
      }
    );
    return data.data;
  }
  async function fetchArtists() {
    let data = await axios.get(
      `${environment.searchUrl}/artists/${searchText}`,{
        headers:{
          Authorization:localStorage.getItem('token')
        }
      }
    );
    return data.data;
  }
  const setCurrentlist = async (index:number)=>{
    await setCurrentSongList({
      songs: searchResults.songs,
      currentSongIndex: index,
    });
  }
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {searchResults && searchResults.albums.length > 0 && (
          <div className="col-span-1 ">
            <TopResultCard setCurrentlist={setCurrentlist}
              album={searchResults ? searchResults.albums[0] : null}
            />
          </div>
        )}
        {searchResults && searchResults.songs.length > 0 && (
          <div className="col-span-2 overflow-y-auto">
            {searchResults.songs.map((song: any, index: number) => {
              if (index < 4) {
                return <AlbumSongCard index={index} setCurrentlist={setCurrentlist} key={song.id} song={song} />;
              }
            })}
          </div>
        )}
      </div>

      <CollaborationWrapper />
    </>
  );
}

export default SearchPage;
