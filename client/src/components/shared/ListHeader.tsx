import playlistImage from "../../assets/images/playlist.png";

function ListHeader({ list }: any) {
  return (
    <>
 
      <div className="md:h-[80%] md:max-h-[300px] sm:min-h-[fit-content]] p-2 md:flex md:flex-row gap-2 sm:flex sm:flex-col">
        <div className="dark:bg-dark-500 bg-slate-700   border border-dark-600 overflow-hidden  rounded  p-4 md:grow ">
          {list.image && list.image.length > 0 && (
            <img 
              className="rounded" style={{maxHeight:'300px', width: '-webkit-fill-available'}}
              src={  list.image[0].url != null
                ? list.image[0].url: list.songs.length>0?list.songs[0].image[2].url: playlistImage}
              alt="No image"
            />
          )}
        </div>
        <div className="dark:bg-dark-500 bg-slate-700   rounded md:grow">
        <div className="info pl-2 pt-2 flex flex-col h-full justify-center items-start ">
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
