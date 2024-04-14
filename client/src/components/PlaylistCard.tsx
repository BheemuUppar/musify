import { Link } from "react-router-dom";
import PlayButton from "./PlayButton";
function PlaylistCard({playlist}:any) {

  return (
    <>
     <Link to={"playlist/"+playlist.id}>
     <div className="card p-2 rounded w-[204px] h-[258px] drop-shadow-md hover:bg-dark-600 ease-in-out group relative">
        <div className="image rounded overflow-hidden">
            <img src={playlist.image[2].url} alt="" />
        </div>
        <div>
            <p className="text-sm">{playlist.name}</p>
            <p className="text-gray-300">{playlist.language}</p>
        </div>
      <div className="hidden absolute bottom-0 right-4 group-hover:block opacity-25 group-hover:-translate-y-[30px] group-hover:opacity-100 transition ease-in duration-500 ">
          <PlayButton />
        </div>
      </div>
     </Link>
    </>
  );
}

export default PlaylistCard;
