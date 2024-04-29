import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {searchResultsAtom, searchTextAtom,snackbarAtom} from "../../store/otherState";
import { useEffect, useState } from "react";
import axios from "axios";
import { environment } from "../../assets/environment";
import PlayButton from "../shared/PlayButton";
import AlbumSongCard from "../shared/AlbumSongCard";
import { Link, useNavigate } from "react-router-dom";
import { getCollaborationPlaylist } from "../../utils/apiutils";
import playlistImage from "../../assets/images/playlist.png";
import { currentSongsListAtom } from "../../store/SongState";

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

      {/* <CollaborationWrapper /> */}
    </>
  );
}

function TopResultCard({ album, className, setCurrentlist }: any) {
  return (
    <>
      <h1 className="text-2xl text-dark-600 dark:text-white">Top Results</h1>
      <div className="buttonParent   rounded relative group p-6 border border-gray-200 dark:border-0  h-[200px]  bg-[#e3e5eb] dark:bg-dark-500 dark:hover:bg-dark-600 hover:bg-[#e1e2e7] transition ease-in duration-200">
        <Link to={"/home/album/" + album.id}>
          <img className="h-[70px] w-[70px]" src={album.image[1].url} alt="" />
          <h1 className="text-2xl text-dark-600 dark:text-white ">{album.name}</h1>
          <span className="text-gray-700 dark:text-gray-500">
            <p>{album.type}</p>
          </span>
          <div className="hidden absolute bottom-0 right-4 group-hover:block opacity-25 group-hover:-translate-y-[30px] group-hover:opacity-100 transition ease-in duration-500 ">
            <PlayButton clickHandler={async (e:any)=>{
            e.stopPropagation();
            e.preventDefault();
           await setCurrentlist(0);
            }}/>
          </div>
        </Link>
      </div>
     
    </>
  );
}

function CollaborationWrapper() {
  const [collaborationPlaylist, setCollaborationPlaylist] = useState<any>([]);
  const setSnackbarState = useSetRecoilState(snackbarAtom);

  const  showNotification :any = function (props:{severity:string, message:string}){
    setSnackbarState(props);
  }
  useEffect(()=>{ 
    getCollaborationPlaylist().then((res:any)=>{
      setCollaborationPlaylist(res.data)
    }).catch((error:any)=>{
      showNotification({severity:'error', message:error.response.data.message})
    })
  }, [])
  return (
    <div>
      <h2 className="text-xl">Collaboration Playlist</h2>
      {/* <PlaylistCard /> */}
      <div className="flex">
      {collaborationPlaylist.map((playlist:any)=>{
        return <CollaborationPlaylistCard key={playlist._id}  playlist={playlist} />
      })}
      
       
      </div>
    </div>
  );
}

function CollaborationPlaylistCard({playlist}:any) {
  const navigate = useNavigate();
  return <>
   {/* <Link to={"/home/myPlaylist"}> */}
        <div className="card p-2 rounded w-[204px] h-[258px] drop-shadow-md hover:bg-dark-600 ease-in-out group relative" onClick={() => {
                    navigate("/home/myPlaylist", { state: playlist });
                  }}>
          <div className="image rounded overflow-hidden">
            <img src={playlist.image[0].url
                                  ? playlist.image[0].url
                                  : playlist.songs.length > 0
                                  ? playlist.songs[0].image[1].url
                                  : playlistImage} alt="" />
          </div>
          <div>
            <p className="text-sm">{playlist.name}</p>
            <p className="text-gray-300">{playlist.username}</p>
          </div>
          <div className="hidden absolute bottom-0 right-4 group-hover:block opacity-25 group-hover:-translate-y-[30px] group-hover:opacity-100 transition ease-in duration-500 " onClick={async (e)=>{
            e.preventDefault()
          //  let playlistData = await  getPlaylistDetailsById(playlist.id);
          //  setCurrentPlayList({songs:playlistData.songs, currentSongIndex:0})
          }}>
            <PlayButton />
          </div>
        </div>
      {/* </Link> */}
  </>;
}

export default SearchPage;
