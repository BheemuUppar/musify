import { Link } from "react-router-dom";
import PlayButton from "./PlayButton";
import { getPAlbumDetailsById, getPlaylistDetailsById } from "../../utils/apiutils";
import { useRecoilState } from "recoil";
import { currentSongsListAtom } from "../../store/SongState";
import { Playlist } from "../../types/Playlist";
import { Album } from "../../types/album";
import { MyPlaylist } from "../../types/MyPlaylist";


function PlaylistCard({ playlist, path }: {playlist:Playlist | Album  , path:string}) {
  const [currentSongsList , setCurrentPlayList] = useRecoilState(currentSongsListAtom);

  const handleButtonClick = async (e:any)=>{
    e.preventDefault()
    if(playlist.type == 'playlist'){
      let playlistData = await  getPlaylistDetailsById(playlist.id);
       setCurrentPlayList({songs:playlistData.songs, currentSongIndex:0})
      }
      else if(playlist.type == 'album'){
      let playlistData = await  getPAlbumDetailsById(playlist.id);
       setCurrentPlayList({songs:playlistData.songs, currentSongIndex:0})
    }
  }

  return (
    <>
      <Link to={path}>
        <div className="card p-2 rounded w-[204px] h-[258px] drop-shadow-md dark:hover:bg-dark-600 hover:bg-gray-300  ease-in-out group relative">
          <div className="image rounded overflow-hidden">
            <img src={playlist.image[2].url} alt="" />
          </div>
          <div className="text-dark-500 dark:text-white">
            <p className="text-sm ">{playlist.name}</p>
            <p className="dark:text-gray-300">{playlist.language}</p>
          </div>
          <div className="hidden absolute bottom-0 right-4 group-hover:block opacity-25 group-hover:-translate-y-[30px] group-hover:opacity-100 transition ease-in duration-500 " onClick={handleButtonClick }>
            <PlayButton />
          </div>
        </div>
      </Link>
    </>
  );
}

export default PlaylistCard;
