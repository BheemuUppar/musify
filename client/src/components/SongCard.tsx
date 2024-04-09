import React from "react";
import { secondsToMinutesSeconds } from "../utils/utils";

const SongCard = React.memo(({ index, song }: { index: number; song: any }) => {
  return (
    <div className="h-[80px] mx-1 border border-gray-900 px-2 py-1 rounded flex items-center my-1 text-sm">
      <div className="w-full flex justify-start items-center">
        <p className="p-2 w-[5%]">{index}</p>
        <div className="flex items-center w-[50%] px-2">
          {/* Display song image */}
          <img src={song.image[2]?.url} alt="" className="w-16 h-16 rounded-full" />
          <div className="ps-2">
            {/* Display song name */}
            <p>{song.name}</p>
            {/* Display artists */}
            {song.artists && song.artists.all.map((singer: any) => (
              <span key={singer.id} className="mr-2">{singer.name}</span>
            ))}
          </div>
        </div>
        <div className="w-[35%] px-2">
          <p>{song.album.name}</p>
        </div>
        <div className="w-[10%] px-2">
          <p>{secondsToMinutesSeconds(song.duration)}</p>
        </div>
      </div>
    </div>
  );
});



export default SongCard;
