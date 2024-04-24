import { useRecoilState, useRecoilValue } from "recoil";
import { currentSongAtom, currentSongsListAtom } from "../store/SongState";
import { songInfoOpenAtom } from "../store/otherState";
import CloseIcon from "@mui/icons-material/Close";
import CardContent from "./CardContent";
import { groupDataByArtist } from "../utils/utils";
import SongCard from "./SongCard";
import { useEffect } from "react";
import AlbumSongCard from "./AlbumSongCard";

function SongInfo() {
  const currentSong = useRecoilValue(currentSongAtom);
  const [songInfoOpen, setSongInfoOpen] = useRecoilState(songInfoOpenAtom);

  return (
    <>
      <div>
        <button
          className="float-right"
          onClick={() => {
            setSongInfoOpen(false);
          }}
        >
          <CloseIcon />
        </button>
      </div>

      <div
        className="flex flex-col justify-start overflow-auto"
        style={{ maxHeight: "400px" }}
      >
        <h2 className="text-2xl ms-5">
          {currentSong && currentSong.album.name}
        </h2>
        <div
          className="h-[34%] w-full px-2  my-10"
          style={{ margin: "auto", overflowY: "auto", overflowX:"hidden"  }}
        >
          <img
            className="rounded "
            src={currentSong && currentSong.image[2]?.url}
            alt="song image"
          />
          <h3 className="text-xl">{currentSong && currentSong.name}</h3>
          {currentSong &&
            currentSong.artists.primary.map((artist: any) => {
              return (
                <span
                  key={artist.id}
                  className="text-lg text-nowrap text-gray-400 mr-2"
                >
                  {artist.name}
                </span>
              );
            })}

          <div >
            <CardContent>
              <h4 className="text-xl">Artists</h4>
              {currentSong && <ArtistList data={currentSong.artists.all} />}
            </CardContent>
          </div>
          <NextSong/>
          
        </div>
      </div>
    </>
  );
}

function ArtistList({ data }: any) {
  let groupedObject = groupDataByArtist(data);
  console.log(groupedObject);
  let arr = Object.keys(groupedObject);
  return (
    <div className="bg-dark-600 p-2 rounded ">
      {arr.map((artist) => {
        return (
            <div className="my-3 ">
              <h2 className="text-lg" key={artist}>
                {artist}
              </h2>
              {groupedObject[artist].map((obj: any) => {
                return (
                  <span className="text-md text-gray-400 mr-3" key={obj.name}>
                    {obj.role}
                  </span>
                );
              })}
            </div>
        );
      })}
    </div>
  );
}

function NextSong(){
  const currentList  = useRecoilValue(currentSongsListAtom);
  let nextIndex = 0 ;
  let nextSong;
  useEffect(()=>{
    nextIndex = parseInt(JSON.stringify(currentList.currentSongIndex + 1));
    nextSong = currentList.songs[nextIndex] ;
    console.log(currentList.songs[nextIndex])
  }, [currentList])
  return <div>
  {/* {nextSong && <AlbumSongCard song={nextSong}/>} */}
  </div>
}

export default SongInfo;
