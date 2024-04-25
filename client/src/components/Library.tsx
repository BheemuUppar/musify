import React, { useEffect, useState } from "react";
import { createPlaylist, getLibrary } from "../utils/apiutils";
import { useRecoilState, useRecoilValue } from "recoil";
import { leftPanelWidthAtom, libraryAtom } from "../store/otherState";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import playlistImage from '../assets/images/playlist.png'
import DialogModal from "./shared/DialogModal";

const Library = React.memo(({ clickHandler }: any) => {
  const [library, setLibrary] = useRecoilState(libraryAtom);
  // const setCurrentSongList = useSetRecoilState(currentSongsListAtom);
  const navigate = useNavigate();
  const leftWidth = useRecoilValue(leftPanelWidthAtom);
  const [inputPlaylistName, setPlaylistName] = useState("");
  
  useEffect(() => {
    fethcLibrary()
  }, []);
  function fethcLibrary(){
    getLibrary().then((data: any) => {
      setLibrary(data);
    });
  }
  const createPlayList = async (isCollaborative:boolean) => {
    let response:any = await createPlaylist(inputPlaylistName, isCollaborative);
    alert(response.data.message);
    fethcLibrary()
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
              fill="#fff"
              viewBox="0 0 24 24"
              className="w-[30px] h-[30px] "
            >
              <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z"></path>
            </svg>
          </button>
          {leftWidth.size == "large" && (
            <span className="text-nowrap hidden sm:inline-block">
              Your Library
            </span>
          )}
        </span>
        {leftWidth.size == "large" && (
          <div>
            <span className="flex">
              <input
                className="text-dark rounded bg-transparent border border-dark-600 p-1"
                onInput={async (e: any) => {
                  // need to optimize using debouncing
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
                <DialogModal clickHandler={createPlayList}/>
                {/* <AddIcon></AddIcon> */}
              </button>
            </span>
          </div>
        )}
      </div>

      <div className="left-playlist">
      <ul className="playlist-wrapper">
          {library &&
            library.map((playlist: any) => {
              return (
                <li
                  key={playlist.name}
                  className="flex justify-start items-center gap-2 my-4 cursor-pointer bg-dark-600 hover:bg-transparent px-2 py-1 border border-gray-800 rounded transition-300"
                  onClick={() => {
                    navigate("myPlaylist", { state: playlist });
                  }}
                >
                  <img
                    className="h-[50px] w-[50px]"
                    src={ playlist.songs.length>0? playlist.songs[0].image[1].url : playlistImage}
                    alt=""
                  />
                  {leftWidth.size == "large" && (
                    <div>
                      <h3 className="hidden sm:inline-block text-xl">
                        {playlist.name}
                      </h3>
                      <br />
                      <span>{playlist.type}</span>
                      <span>{playlist.songs.length} songs</span>
                    </div>
                  )}
                </li>
              );
            })}
      </ul>
      </div>
    </div>
  );
});

export default Library;
