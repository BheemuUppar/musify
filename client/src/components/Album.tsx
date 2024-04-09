import { Link } from "react-router-dom";
function Album({data}:any) {
  return (
    <>
     <Link to={"album/"+data.id}>
     <div className="card p-2 rounded w-[204px] h-[258px] drop-shadow-md hover:bg-gray-700">
        <div className="image rounded overflow-hidden">
            <img src={data.image[2].url} alt="" />
        </div>
        <div>
            <p>{data.name}</p>
            <p className="text-gray-300">{data.artists.primary[0].name}</p>
        </div>
      </div>
     </Link>
    </>
  );
}

export default Album;
