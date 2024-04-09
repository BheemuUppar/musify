import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongCard from "./SongCard";

const ViewPlaylist = React.memo(() => {
  const [playlist, setPlaylist]: any = useState({});
  const params = useParams();

  useEffect(() => {
    console.log("calling api...");
    axios
      .get(`https://saavn.dev/api/playlists?id=${params.id}`)
      .then((response) => {
        setPlaylist(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching playlist:", error);
      });
  }, []);

  return (
    <>
      <div className="h-[70%] p-2 bg-gradient-to-b from-green-700 to-green-200 rounded flex justify-start items-center">
        <div className="image-box h-[200px] w-[200px] float-start ">
          {playlist.image && playlist.image.length > 0 && (
            <img
              className="rounded"
              src={playlist.image[2]?.url}
              alt="No image"
            />
          )}
        </div>
        <div className="info">
          <p>{playlist.type}</p>
          <h1 className="text-[4rem]">{playlist.name}</h1>
          {playlist.artists &&
            playlist.artists
              .filter((artist: any) => artist.role === "singer")
              .map((artist: any) => <p key={artist.id}>{artist.name}</p>)}
        </div>
      </div>
      <div className="h-[20%] my-2">
        <button type="button" className="bg-green-400">
          Play Button
        </button>
      </div>
      {playlist.songs &&
        playlist.songs.map((song: any, index: number) => {
          return <SongCard key={song.id} index={index} song={song} />;
        })}
    </>
  );
});

export default ViewPlaylist;
