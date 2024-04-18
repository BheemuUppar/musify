import React, { useEffect } from "react";
import { getLibrary } from "../utils/apiutils";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useSetRecoilState,
} from "recoil";
import { libraryAtom } from "../store/otherState";
import { currentSongsListAtom } from "../store/SongState";

const Library = React.memo(() => {
  const [library, setLibrary] = useRecoilState(libraryAtom);
  const setCurrentSongList = useSetRecoilState(currentSongsListAtom);
  useEffect(() => {
    getLibrary().then((data: any) => {
      setLibrary(data);
    });
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <span className="">
          <button type="button" className="bg-blue-400">
            toggler
          </button>
          <span className="text-nowrap hidden sm:inline-block">
            Your Library
          </span>
        </span>
        <div>
          <button>create playlist</button>
        </div>
      </div>

      <ul className="playlist-wrapper">
        <ul>
          {library &&
            library.map((playlist: any) => {
              return (
                <li
                  key={playlist.name}
                  className="flex justify-start items-center gap-2 my-4"
                >
                  <img
                    onClick={async () => {
                      await setCurrentSongList({
                        songs: playlist.songs,
                        currentSongIndex: 0,
                      });
                    }}
                    className="h-[50px] w-[50px]"
                    src={playlist.songs[0].image[1].url}
                    alt=""
                  />
                  <div>
                    <h3 className="hidden sm:inline-block text-xl">
                      {playlist.name}
                    </h3>
                    <br />
                    <span>{playlist.type}</span>
                    <span>{playlist.songs.length} songs</span>
                  </div>
                </li>
              );
            })}
        </ul>
      </ul>
    </>
  );
});

export default Library;
