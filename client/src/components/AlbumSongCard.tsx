import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentSongAtom, isPlayingAtom } from "../store/SongState";
import { secondsToMinutesSeconds } from "../utils/utils";
import BasicMenu from "./shared/BasicMenu";
import equilizerImage from "../assets/images/equaliser-animated-green.gif";
import playlist from './../assets/images/playlist.png'

const AlbumSongCard = ({ song , index, setCurrentlist}: any) => {
  const [currentSong, setCurrentSong] = useRecoilState(currentSongAtom);
  const isPlaying = useRecoilValue(isPlayingAtom);
  return (
    <>
      <div className="group flex justify-between p-2 dark:hover:bg-dark-600 hover:bg-slate-400 rounded">
        <div className="left flex items-center">
        {/* {isPlaying && currentSong && song.id == currentSong.id ? ( */}
            <img
              className={`${isPlaying && currentSong && song.id == currentSong.id ? "visible":"invisible"} h-[20px] w-[20px] group-hover:block` }
              src={equilizerImage}
              alt=""
            />
          { song && song.image && song.image[1].url &&
            <img
            className="h-[50px] w-[50px] rounded m-1 cursor-pointer"
            src={song.image[1].url ? song.image[1].url : playlist}
            alt=""
            onClick={ () => {
               setCurrentlist(index)
              // setCurrentSong(song);
            }}
          />
          }
          <div>
            <p className="text-dark-600 dark:text-white"> {song.name}</p>
            {song.artists.primary.map((artist: any) => {
              return <span  className="text-gray-500" key={artist.id}>{artist.name}</span>;
            })}
          </div>
        </div>
        <div className="flex items-center">
          <div className="right flex items-center">
            <span className="text-dark-600 dark:text-white">{secondsToMinutesSeconds(song.duration)}</span>
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
};

export default AlbumSongCard;
