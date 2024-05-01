import { useNavigate } from "react-router-dom";
import playlistImage from "../../assets/images/playlist.png";
import PlayButton from "./PlayButton";
import { currentSongsListAtom } from "../../store/SongState";
import { useRecoilState } from "recoil";


interface CollabPlaylist {
  collaborative: boolean;
  email: string;
  image: { url: string }[];
  name: string;
  songs: string[]|any;
  type: string;
  username: string;
}

function CollaborationPlaylistCard({ playlist }: {playlist : CollabPlaylist}) {
  const [currentSongList, setCurrentSongList] = useRecoilState(currentSongsListAtom);

  const navigate = useNavigate();
  let image =
    playlist.image[0].url != null
      ? playlist.image[0].url: playlist.songs.length>0?playlist.songs[0].image[2].url: playlistImage;
  function getImage() {
    return image;
  }

  const setCurrentlist = async (index:number)=>{
    await setCurrentSongList({
      songs: playlist.songs,
      currentSongIndex: index,
    });
  }
  return (
    <>
      {/* <Link to={"/home/myPlaylist"}> */}
      <div
        className="card p-2 rounded w-[204px] h-[258px] drop-shadow-md hover:bg-[#e1e2e7] ease-in-out group relative text-dark-600 dark:text-white"
        onClick={() => {
          navigate("/home/collabPlaylist", { state: playlist });
        }}
      >
        <div className="image rounded overflow-hidden">
          <img src={getImage()} alt="" />
        </div>
        <div>
          <p className="text-sm">{playlist.name}</p>
          <p className="text-gray-300">{playlist.username}</p>
        </div>
        <div
          className="hidden absolute bottom-0 right-4 group-hover:block opacity-25 group-hover:-translate-y-[30px] group-hover:opacity-100 transition ease-in duration-500 "
          onClick={async (e) => {
            e.preventDefault();
          }}
        >
          <PlayButton clickHandler={async (e:any)=>{
              e.stopPropagation();
              e.preventDefault();
             await setCurrentlist(0);
              }}/>
        </div>
      </div>
      {/* </Link> */}
    </>
  );
}

export default CollaborationPlaylistCard;
