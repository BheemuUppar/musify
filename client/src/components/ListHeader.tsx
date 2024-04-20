import playlistImage  from '../assets/images/playlist.png'

function ListHeader({list}:any){
    return <>
      <div className="h-[70%] p-2 bg-gradient-to-b from-green-700 to-green-200 rounded flex justify-start items-center">
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
          </div>
      
    </>
    }
export default ListHeader