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
    <div className="h-[80px] mx-1 border border-gray-900 px-2 py-3 rounded flex items-center my-1 text-sm group hover:bg-dark-600 ">
      <div className="w-full flex justify-start items-center">
        <div className="group flex">
          {isPlaying && currentSong && song.id == currentSong.id ? (
            <img
              className="h-[20px] w-[20px] group-hover:block"
              src={equilizerImage}
              alt=""
            />
          ) : (
            <div className="relative w-[25px]">
              <div className="group-hover:invisible absolute left-2 w-[25px]" > {index}</div>
              <div
                className=" invisible group-hover:visible absolute left-0 w-[25px]"
                onClick={async () => {
                  setCurrentlist(index-1)
                  // await setCurrentSong(song);
                }}
              >
                <PlayArrowIcon />
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
              className={`${
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
                  className="mr-2 text-[12px] text-gray-300"
                >
                  {singer.name}
                </span>
              ))}
          </div>
        </div>
        <div className="w-[35%] px-2">
          <p>{song.album.name}</p>
        </div>
        <div className="w-[10%] px-2">
          <p>{secondsToMinutesSeconds(song.duration)}</p>
        </div>
        <div className="invisible group-hover:visible">
          <BasicMenu songId={song.id} />
        </div>
      </div>
    </div>
  );
});

export default SongCard;
