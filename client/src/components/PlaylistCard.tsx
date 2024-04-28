import { Link } from "react-router-dom";
import PlayButton from "./PlayButton";
import { getPlaylistDetailsById } from "../utils/apiutils";
import { useRecoilState } from "recoil";
import { currentSongsListAtom } from "../store/SongState";
function PlaylistCard({ playlist }: any) {
  const [currentSongsList , setCurrentPlayList] = useRecoilState(currentSongsListAtom)



  return (
    <>
      <Link to={"playlist/" + playlist.id}>
        <div className="card p-2 rounded w-[204px] h-[258px] drop-shadow-md dark:hover:bg-dark-600 hover:bg-gray-300  ease-in-out group relative">
          <div className="image rounded overflow-hidden">
            <img src={playlist.image[2].url} alt="" />
          </div>
          <div className="text-dark-500 dark:text-white">
            <p className="text-sm ">{playlist.name}</p>
            <p className="dark:text-gray-300">{playlist.language}</p>
          </div>
          <div className="hidden absolute bottom-0 right-4 group-hover:block opacity-25 group-hover:-translate-y-[30px] group-hover:opacity-100 transition ease-in duration-500 " onClick={async (e)=>{
            e.preventDefault()
           let playlistData = await  getPlaylistDetailsById(playlist.id);
           setCurrentPlayList({songs:playlistData.songs, currentSongIndex:0})
          }}>
            <PlayButton />
          </div>
        </div>
      </Link>
    </>
  );
}

export default PlaylistCard;
