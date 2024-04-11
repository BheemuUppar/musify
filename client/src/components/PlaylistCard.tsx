import { Link } from "react-router-dom";
function PlaylistCard({playlist}:any) {

  return (
    <>
     <Link to={"playlist/"+playlist.id}>
     <div className="card p-2 rounded w-[204px] h-[258px] drop-shadow-md hover:bg-gray-700 ease-in-out">
        <div className="image rounded overflow-hidden">
            <img src={playlist.image[2].url} alt="" />
        </div>
        <div>
            <p className="text-sm">{playlist.name}</p>
            <p className="text-gray-300">{playlist.language}</p>
        </div>
      </div>
     </Link>
    </>
  );
}

export default PlaylistCard;
