import React from "react";
import { useSetRecoilState } from "recoil";
import { currentSongAtom } from "../store/SongState";
import { secondsToMinutesSeconds } from "../utils/utils";

const AlbumSongCard = React.memo(({ song }: any) => {
  const setCurrentSong = useSetRecoilState(currentSongAtom);
  return (
    <>
      <div className="flex justify-between p-2 hover:bg-dark-600 rounded">
        <div className="left flex items-center">
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
        <div className="right flex items-center">
          <span>{secondsToMinutesSeconds(song.duration)}</span>
        </div>
      </div>
    </>
  );
});

export default AlbumSongCard;
