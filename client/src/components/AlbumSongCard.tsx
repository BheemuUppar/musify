import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentSongAtom, isPlayingAtom } from "../store/SongState";
import { secondsToMinutesSeconds } from "../utils/utils";
import BasicMenu from "./shared/BasicMenu";
import equilizerImage from "../assets/images/equaliser-animated-green.gif";

const AlbumSongCard = React.memo(({ song }: any) => {
  const [currentSong, setCurrentSong] = useRecoilState(currentSongAtom);
  const isPlaying = useRecoilValue(isPlayingAtom)
  return (
    <>
      <div className="group flex justify-between p-2 hover:bg-dark-600 rounded">
        <div className="left flex items-center">
        {/* {isPlaying && currentSong && song.id == currentSong.id ? ( */}
            <img
              className={`${isPlaying && currentSong && song.id == currentSong.id ? "visible":"invisible"} h-[20px] w-[20px] group-hover:block` }
              src={equilizerImage}
              alt=""
            />
          {/* // )  */}
          <img
            className="h-[50px] w-[50px] rounded m-1"
            src={song.image[1].url}
            alt=""
            onClick={() => {
              setCurrentSong(song);
            }}
          />
          <div>
            <p>{song.name}</p>
            {song.artists.primary.map((artist: any) => {
              return <span key={artist.id}>{artist.name}</span>;
            })}
          </div>
        </div>
        <div className="flex items-center">
          <div className="right flex items-center">
            <span>{secondsToMinutesSeconds(song.duration)}</span>
          </div>
          <div className="invisible group-hover:visible" onClick={(e)=>{
              e.preventDefault();
              e.stopPropagation()
          }}>
            <BasicMenu  songId={song.id}/>
          </div>
        </div>
      </div>
    </>
  );
});

export default AlbumSongCard;
