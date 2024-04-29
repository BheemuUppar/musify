import { useNavigate } from "react-router-dom";
import playlistImage from "../../assets/images/playlist.png";
import PlayButton from "./PlayButton";

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
  
  export default CollaborationPlaylistCard