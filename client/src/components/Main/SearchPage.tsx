import { useRecoilState, useRecoilValue } from "recoil";
import { searchResultsAtom, searchTextAtom } from "../../store/otherState";
import { useEffect } from "react";
import axios from "axios";
import AlbumSongCard from "../shared/AlbumSongCard";
import { currentSongsListAtom } from "../../store/SongState";
import TopResultCard from "./TopResultCard";
import CollaborationWrapper from "../shared/CollaborationWrapper";
import PlaylistCard from "../shared/PlaylistCard";
import { SearchResults } from "../../types/searchResults";
import { Playlist } from "../../types/Playlist";
import { Album } from "../../types/album";
import { Song } from "../../types/song";

const searchUrl = import.meta.env.VITE_SEARCH_URL


function SearchPage() {
  const searchText = useRecoilValue(searchTextAtom);
  const [searchResults, setSearchResults] =
    useRecoilState(searchResultsAtom);
  const [currentSongList, setCurrentSongList] = useRecoilState(currentSongsListAtom);

  useEffect(() => {
    searchHandler();
  }, [searchText]);
  async function searchHandler() {
    let obj: SearchResults= {
      albums: [],
      playlists: [],
      songs: [],
      artists: []
    };
    if (searchText) {
      obj["albums"] = await fetchAlbums();
      obj["songs"] = await fetchSongs();
      obj["playlists"] = await fetchPlaylist();
      obj["artists"] = await fetchArtists();

      await setSearchResults(obj);
    }
  }

  async function fetchAlbums() {
    let data = await axios.get(
      `${searchUrl}/albums/${searchText}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return data.data;
  }
  
  async function fetchSongs() {
    let data = await axios.get(`${searchUrl}/songs/${searchText}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return data.data;
  }
  async function fetchPlaylist() {
    let data = await axios.get(
      `${searchUrl}/playlist/${searchText}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return data.data;
  }
  async function fetchArtists() {
    let data = await axios.get(
      `${searchUrl}/artists/${searchText}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return data.data;
  }

  const setCurrentlist = async (index: number) => {
    await setCurrentSongList({
      songs: searchResults.songs,
      currentSongIndex: index,
    });
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {searchResults && searchResults.albums.length > 0 && (
          <div className="col-span-1 ">
            <TopResultCard
             
              album={searchResults && searchResults.albums[0] }
            />
          </div>
        )}
        {searchResults && searchResults.songs.length > 0 && (
          <div className="col-span-2 overflow-y-auto">
            {searchResults.songs.map((song: Song, index: number) => {
              if (index < 4) {
                return (
                  <AlbumSongCard
                    index={index}
                    setCurrentlist={setCurrentlist}
                    key={song.id}
                    song={song}
                  />
                );
              }
            })}
          </div>
        )}
      </div>

      <div className="my-2 text-dark-600 dark:text-white">
        <h2 className="text-xl  my-3">Playlists</h2>
        <div className="flex flex-wrap gap-4">
          { searchResults && searchResults.playlists &&
            searchResults.playlists.map((playlist: Playlist) => {
              return <PlaylistCard playlist={playlist} key={playlist.id} path={'/home/playlist/' + playlist.id}/>;
            })}
              {!searchResults && <h1>No playlist Available</h1>}
        </div>
      </div>
      {/* Albums  */}
      <div className="my-6 text-dark-600 dark:text-white">
        <h2 className="text-xl my-3">Albums</h2>
        <div className="flex flex-wrap gap-4">
          {searchResults && searchResults.albums &&
            searchResults.albums.map((album:Album) => {
              return <PlaylistCard playlist={album} path={'/home/album/'+album.id}/>
            })}
            {!searchResults && <h1>No Albums Available</h1>}
        </div>
      </div>

      <CollaborationWrapper />
    </>
  );
}

export default SearchPage;
