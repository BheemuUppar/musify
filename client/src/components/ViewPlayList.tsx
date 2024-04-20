import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongCard from "./SongCard";
import { environment } from "../assets/environment";
import PlayButton from "./PlayButton";
import ListHeader from "./ListHeader";
import { useRecoilState, useRecoilValue } from "recoil";
import { audioStateAtom, currentSongsListAtom } from "../store/SongState";

const ViewPlaylist = React.memo(() => {
  const [playlist, setPlaylist]: any = useState({});
  const params = useParams();
  const [songsList, setSongsList] = useRecoilState(currentSongsListAtom);

  useEffect(() => {
    axios
      .get(`${environment.searchUrl}/playlistById/${params.id}`)
      .then((response) => {
        setPlaylist(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching playlist:", error);
      });
  }, []);

  return (
    <>
      <ListHeader list={playlist} />
      <div className="h-[20%] my-2">
        <PlayButton
          clickHandler={async () => {
            await setSongsList({ songs: playlist.songs, currentSongIndex: 0 });
          }}
        />
      </div>
      {playlist.songs &&
        playlist.songs.map((song: any, index: number) => {
          return <SongCard key={Math.random()} index={index + 1} song={song} />;
        })}
    </>
  );
});

export default ViewPlaylist;
