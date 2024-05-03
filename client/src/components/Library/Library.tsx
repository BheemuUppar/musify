import React, { useEffect, useState } from "react";
import { createPlaylist, getLibrary, removePlaylist } from "../../utils/apiutils";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { leftPanelWidthAtom, libraryAtom, snackbarAtom } from "../../store/otherState";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import playlistImage from "../../assets/images/playlist.png";
import DialogModal from "../shared/DialogModal";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Tooltip from "@mui/material/Tooltip";
import { MyPlaylist } from "../../types/MyPlaylist";
import { AxiosResponse } from "axios";

const Library = React.memo(({ clickHandler }: any) => {
  const [library, setLibrary] = useRecoilState(libraryAtom);
  const navigate = useNavigate();
  const leftWidth = useRecoilValue(leftPanelWidthAtom);
  const [inputPlaylistName, setPlaylistName] = useState("");
  const setSnackbarState = useSetRecoilState(snackbarAtom);

  useEffect(() => {
    fethcLibrary();
  }, []);

  const  showNotification :any = function (props:{severity:string, message:string}){
    setSnackbarState(props);
  }

  function fethcLibrary() {
    getLibrary().then((data: MyPlaylist[]) => {
      setLibrary(data);
    }).catch(error=>{
      showNotification({severity:'error', message:error.response.data.message})
    })
  }

  // confirm handler to create playlist with collaborative
  const confirmHandler = async () => {
  try{
    let response : AxiosResponse = await createPlaylist(inputPlaylistName, true)
    let severity = response.status >= 200 && response.status < 400 ? "success":"error"
    // await setSnackbarState({severity:severity, message:response.data.message})
    showNotification({severity:'success', message:response.data.message})
    fethcLibrary();
  }
  catch(error:any){
    showNotification({severity:'error', message:error.response.data.message})
  }
   
   
  };
  // create a playlist without collaboration
  const noClickHandler = async () => {
   try{
    let response: AxiosResponse = await createPlaylist(inputPlaylistName, false);
    showNotification({severity:'success', message:response.data.message})
    fethcLibrary();
   }catch(error:any){
    showNotification({severity:'error', message:error.response.data.message})
   }
  };

  const onDeleteConfirm = async (playlistId: string) => {
    try{
      let response: any= await removePlaylist(playlistId);
      showNotification({severity:'success', message:response.data.message})
      fethcLibrary();
    }catch(error:any){
      showNotification({severity:'error', message:error.response.data.message})
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2">
          <button
            type="button"
            className="text-center ms-4"
            onClick={() => {
              clickHandler();
            }}
          >
            <svg
              role="img"
              
              viewBox="0 0 24 24"
              className="w-[30px] h-[30px]  dark:fill-white"
            >
              <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z"></path>
            </svg>
          </button>
          {leftWidth.size == "large" && (
            <span className="text-nowrap hidden sm:inline-block text-dark-600 dark:text-white">
              Your Library
            </span>
          )}
        </span>
        {leftWidth.size == "large" && (
          <div>
            <span className="flex">
              <input
                className="dark:text-white text-dark-600  rounded bg-transparent border border-dark-600 p-1"
                onInput={async (e: any) => {
                  await setPlaylistName(e.target.value);
                }}
                type="text"
                placeholder="create new playlist"
              />
              <button
                disabled={inputPlaylistName == ""}
                className="disabled:cursor-not-allowed"
                type="button"
                // onClick={createPlayList}
              >
                <DialogModal
                  icon={
                    <Tooltip title="create playlist">
                      <AddIcon className="text-dark-600 dark:text-white" />
                    </Tooltip>
                  }
                  title="make this library to collaborative"
                  confirmHandler={confirmHandler}
                  NoClickHandler={noClickHandler}
                >
                  Do You want to make this Playlist as collaborative. By
                  clicking on Agree others able to modify the playlist
                </DialogModal>
                {/* <AddIcon></AddIcon> */}
              </button>
            </span>
          </div>
        )}
      </div>

      <div className="left-playlist">
        <ul className="playlist-wrapper">
          {library &&
            library.map((playlist: MyPlaylist) => {
              return (
                <li
                  key={playlist.name}
                  className=" my-4 cursor-pointer dark:bg-dark-600  hover:bg-transparent px-2 py-1 border border-gray-400 dark:border-gray-800 rounded transition-300 group"
                  onClick={() => {
                    navigate("myPlaylist", { state: playlist });
                  }}
                >
                  <div>
                    <div className="flex gap-2 ">
                      <div className="flex items-center">
                        {leftWidth.size == "small" && (
                          <Tooltip title={playlist.name} placement="right" arrow >
                            <img
                              className="h-[50px] w-[50px] "
                              src={
                                playlist.image[0].url
                                  ? playlist.image[0].url
                                  : playlist.songs.length > 0
                                  ? playlist.songs[0].image[1].url
                                  : playlistImage
                              }
                              alt=""
                            />
                          </Tooltip>
                        )}
                        {leftWidth.size == "large" && (
                          <img
                            className="h-[50px] w-[50px] min-h-[50px] min-w-[50px]"
                            src={
                              playlist.image[0].url
                                ? playlist.image[0].url
                                : playlist.songs.length > 0
                                ? playlist.songs[0].image[1].url
                                : playlistImage
                            }
                            alt=""
                          />
                        )}
                      </div>
                      {leftWidth.size == "large" && (
                        <div className="flex grow justify-between">
                          <div>
                            <h3 className="sm:inline-block text-xl text-dark-600 dark:text-white">
                              {playlist.name}
                            </h3>
                            <br />
                            <span className="text-dark-600 dark:text-white">{playlist.type} :</span>
                            <span className="text-dark-600 dark:text-white"> &nbsp;{playlist.songs.length} songs</span>
                          </div>

                          <DialogModal
                            className="invisible group-hover:visible  "
                            icon={
                              <Tooltip title="remove">
                                <RemoveCircleOutlineIcon
                                  style={{ color: "#e75858" }}
                                />
                              </Tooltip>
                            }
                            playlistId={playlist._id}
                            title="Detele Playlist"
                            confirmHandler={onDeleteConfirm}
                            NoClickHandler={() => {
                              showNotification({severity:"error", message:"terminated"})
                            }}
                          >
                            Are You Sure want to delete This playlist
                          </DialogModal>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
});

export default Library;
