import { useRecoilState, useRecoilValue } from "recoil";
import { currentSongAtom, currentSongsListAtom } from "../../store/SongState";
import { songInfoOpenAtom } from "../../store/otherState";
import CloseIcon from "@mui/icons-material/Close";
import CardContent from "./CardContent";
import { groupDataByArtist } from "../../utils/utils";
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
          <CloseIcon className="text-dark-600 dark:text-white" />
        </button>
      </div>

      <div
        className="flex flex-col justify-start overflow-auto"
        style={{ maxHeight: "100%" }}
      >
        <h2 className="text-2xl ms-5 text-dark-600 dark:text-white py-4">
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
          <h3 className="text-xl text-dark-600 dark:text-white">{currentSong && currentSong.name}</h3>
          {currentSong &&
            currentSong.artists.primary.map((artist: any) => {
              return (
                <span
                  key={artist.id}
                  className="text-lg text-nowrap text-dark-500 dark:text-gray-400 mr-2"
                >
                  {artist.name}
                </span>
              );
            })}

          <div >
            <CardContent>
              <h4 className="text-xl text-dark-600 dark:text-white">Artists</h4>
              {currentSong && <ArtistList data={currentSong.artists.all} />}
            </CardContent>
          </div>
          <NextSong />
          
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
    <div className="dark:bg-dark-600 bg-slate-400 p-2 rounded ">
      {arr.map((artist) => {
        return (
            <div className="my-3 "  key={artist}>
              <h2 className="text-lg  text-dark-600 dark:text-white">
                {artist}
              </h2>
              {groupedObject[artist].map((obj: any) => {
                return (
                  <span className="text-md  mr-3 text-dark-600 dark:text-white " key={obj.name+obj.role}>
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

function NextSong() {
  const [currentList, setCurrentList] = useRecoilState(currentSongsListAtom);

  // let nextIndex = 0 ;
  useEffect(() => {}, [currentList]);
  return <>
   { currentList.songs[currentList.currentSongIndex + 1] &&  <div className="min-h-[fit-content]">
     <h3 className="text-lg text-dark-600 dark:text-white"> Next song</h3>
     {currentList.songs.length > 0 && (
       <AlbumSongCard
         className="p-2"
         clickHandler={() => {
           setCurrentList({
             songs: currentList.songs,
             currentSongIndex: currentList.currentSongIndex + 1,
           });
         }}
         song={currentList.songs[currentList.currentSongIndex + 1]}
         index={currentList.currentSongIndex + 1}
       />
     )}
   </div>

   }
   </>
}

export default SongInfo;
