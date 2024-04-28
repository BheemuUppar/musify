import playlistImage from "../assets/images/playlist.png";

function ListHeader({ list }: any) {
  return (
    <>
      {/* <div className="h-[70%] p-2 bg-gradient-to-b from-green-700 to-green-200 rounded flex justify-start items-center">
            <div className="image-box h-[200px] w-[200px] float-start ">
              {list.image && list.image.length > 0 && (
                <img
                  className="rounded"
                  src={list.image[2]?.url ? list.image[2]?.url :playlistImage}
                  alt="No image"
                />
              )}
            </div>
            <div className="info">
              <p>{list.type}</p>
              <h1 className="text-[3rem]">{list.name}</h1>
              { list.type == 'playlist' && list.artists &&
                list.artists
                  .filter((artist: any) => artist.role === "singer")
                  .map((artist: any) => <span key={artist.id}>{artist.name}</span>)}
              { list.type == 'album' && list.artists &&
                list.artists.primary.map((artist: any) => <span key={artist.id}>{artist.name}</span>)}
            </div>
          </div> */}
      <div className="h-[80%] max-h-[300px] min-h-[300px] p-2 grid grid-cols-3 gap-2">
        <div className="dark:bg-dark-500 bg-slate-700  border border-dark-600 overflow-hidden  rounded col-span-1 p-4 ">
          {list.image && list.image.length > 0 && (
            <img 
              className="rounded" style={{maxHeight:'300px', width: '-webkit-fill-available'}}
              src={list.image[2]?.url ? list.image[2]?.url : playlistImage}
              alt="No image"
            />
          )}
        </div>
        <div className="dark:bg-dark-500 bg-slate-700   rounded  col-span-2">
        <div className="info pl-2 pt-2 flex flex-col h-full justify-center items-start">
              <p className="text-lg">{list.type}</p>
              <h1 className="text-[327%]">{list.name}</h1>
             <div>
             { list.type == 'playlist' && list.artists &&
                list.artists
                  .filter((artist: any) => artist.role === "singer")
                  .map((artist: any) => <span className="mr-2" key={artist.id}>{artist.name}</span>)}
              { list.type == 'album' && list.artists &&
                list.artists.primary.map((artist: any) => <span  key={artist.id}>{artist.name}</span>)}
                {list.username && <p> <span className="text-gray-400 text-lg">Owner of the playlist &nbsp;</span> <span className="capitalize  text-lg">{list.username}</span></p>
                }
             </div>
            </div>
        </div>
      </div>
    </>
  );
}
export default ListHeader;
