import React from "react";
import { secondsToMinutesSeconds } from "../utils/utils";
import { useRecoilState } from "recoil";
import { currentSongAtom, isPlayingAtom } from "../store/SongState";
import BasicMenu from "./shared/BasicMenu";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import equilizerImage from "../assets/images/equaliser-animated-green.gif";

const SongCard = React.memo(({ index, song, setCurrentlist }: { index: number; song: any; setCurrentlist:any }) => {
  const [currentSong, setCurrentSong] = useRecoilState(currentSongAtom);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);

  return (
    <div className="h-[80px] mx-1 border dark:border-gray-900 border-gray-400 px-2 py-3 rounded flex items-center my-1 text-sm group dark:hover:bg-dark-600 hover:bg-slate-400 ">
      <div className="w-full flex justify-start items-center">
        <div className="group flex">
          {isPlaying && currentSong && song.id == currentSong.id ? (
            <img
              className="h-[20px] w-[20px] group-hover:block"
              src={equilizerImage}
              alt=""
            />
          ) : (
            <div className="relative w-[25px] " style={{marginBottom:"15px"}}>
              <div className="group-hover:invisible absolute left-2 w-[25px] text-dark-500 dark:text-gray-300" > {index + 1}</div>
              <div
                className=" invisible group-hover:visible absolute left-0 w-[25px]"
                onClick={async () => {
                  console.log('index ', index , song)
                  await setCurrentlist(index)
                }}
              >
                <PlayArrowIcon className="text-dark-600 dark:text-white"/>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center w-[50%] px-2">
          {/* Display song image */}
          <img
            src={song.image[2]?.url}
            alt=""
            className="w-16 h-16 rounded-full"
          />
          <div className="ps-2">
            {/* Display song name */}
            <p
              className={` text-dark-700 dark:text-white ${
                currentSong && song.id == currentSong.id ? "text-green-400" : ""
              }`}
            >
              {song.name}
            </p>
            {/* Display artists */}
            {song.artists &&
              song.artists.all.map((singer: any) => (
                <span
                  key={Math.random()}
                  className="mr-2 text-[12px] text-dark-500 dark:text-gray-300"
                >
                  {singer.name}
                </span>
              ))}
          </div>
        </div>
        <div className="w-[35%] px-2">
          <p className="text-dark-500 dark:text-gray-300">{song.album.name}</p>
        </div>
        <div className="w-[10%] px-2">
          <p className="text-dark-500 dark:text-gray-300" >{secondsToMinutesSeconds(song.duration)}</p>
        </div>
        <div className="invisible group-hover:visible">
          <BasicMenu songId={song.id} />
        </div>
      </div>
    </div>
  );
});

export default SongCard;
