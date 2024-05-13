import React from "react";
import { secondsToMinutesSeconds } from "../../utils/utils";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentSongAtom, isPlayingAtom } from "../../store/SongState";
import BasicMenu from "./BasicMenu";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import equilizerImage from "../../assets/images/equaliser-animated-green.gif";
import { Song } from "../../types/song";
import DialogModal from "./DialogModal";
import Tooltip from "@mui/material/Tooltip";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getLibrary, removeSongFromLibrary } from "../../utils/apiutils";
import { libraryAtom, snackbarAtom } from "../../store/otherState";
import {  AxiosResponse } from "axios";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const SongCard = React.memo(({ index, song, setCurrentlist, playlistId }: { index: number; song: Song; setCurrentlist:any, playlistId?:string }) => {
  
  const [currentSong, setCurrentSong] = useRecoilState(currentSongAtom);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);
  const setSnackbarState = useSetRecoilState(snackbarAtom);
  const setLibrary = useSetRecoilState(libraryAtom);

  const  showNotification :any = function (props:{severity:string, message:string}){
    setSnackbarState(props);
  }

  const confirmHandler = async ()=>{
    if(playlistId){
      removeSongFromLibrary(playlistId, song.id).then((response:AxiosResponse)=>{
        getLibrary().then((data: any) => {
          setLibrary(data);
        });
        showNotification({severity:'success', message:response.data.message})
      }).catch((error:any)=>{
        showNotification({severity:'error', message:error.response.data.message})
      })
    }
  }

  return (
    <div className=" h-[100px] min-h-[fit-content] mx-1 border dark:border-gray-900 border-gray-400 px-2 py-3 rounded flex items-center my-1 text-sm group dark:hover:bg-dark-600 hover:bg-slate-400 " style={{minWidth:"fit-content"}}>
      <div className="w-full flex justify-start items-center flex-nowrap">
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
                  await setCurrentlist(index)
                }}>
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
              className={` ${currentSong && song.id == currentSong.id?"text-green-600 dark:text-green ":"text-dark-600 dark:text-white"} `}
            >
              {song.name}
            </p>
            {/* Display artists */}
            <div className="artists hidden sm:hidden md:block">
            {song.artists &&
              song.artists.primary.map((singer: any) => (
                <span
                  key={Math.random()}
                  className="mr-2 text-[12px] text-dark-500 dark:text-gray-300  "
                >
                  {singer.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[35%] px-2">
          <p className="text-dark-500 dark:text-gray-300 truncate">{song.album.name}</p>
        </div>
        <div className="w-[10%] px-2">
          <p className="text-dark-500 dark:text-gray-300" >{secondsToMinutesSeconds(song.duration)}</p>
        </div>
        <div className="invisible group-hover:visible">
          <BasicMenu className="text-gray-600 dark:text-white " title="Add to my Playlist" songId={song.id} />
        </div>
       { playlistId &&
         <div className="invisible group-hover:visible">
         <DialogModal
                   icon={
                     <Tooltip title="remove">
                       <RemoveCircleOutlineIcon
                                  style={{ color: "#e75858" }}
                                />
                     </Tooltip>
                   }
                   title="Remove from playlist"
                   confirmHandler={confirmHandler}
                   NoClickHandler={()=>{}}
                 >
                   Are you sure?
                 </DialogModal>
         </div>
       }
      </div>
    </div>
  );
});

export default SongCard;

