import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongCard from "./SongCard";
import { environment } from "../assets/environment";
import PlayButton from "./PlayButton";
import ListHeader from "./ListHeader";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { audioStateAtom, currentSongsListAtom } from "../store/SongState";
import { createPlaylist, getLibrary } from "../utils/apiutils";
import { libraryAtom } from "../store/otherState";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";

const ViewPlaylist = React.memo(() => {
  const [playlist, setPlaylist]: any = useState({});
  const params = useParams();
  const [songsList, setSongsList] = useRecoilState(currentSongsListAtom);
  const setLibrary = useSetRecoilState(libraryAtom);

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

  const addToMyPlaylist = async () => {
    let arrOfId = playlist.songs.map((song: any) => {
      return song.id;
    });

    let response: any = await createPlaylist(
      playlist.name,
      false,
      playlist.image,
      arrOfId
    );
    alert(response.data.message);
    getLibrary().then((data: any) => {
      setLibrary(data);
    });
  };

const setCurrentlist = async (index:number)=>{
  await setSongsList({ songs: playlist.songs, currentSongIndex: index });
}

  return (
    <>
      <ListHeader list={playlist} />
      <div className="h-[20%] my-2 flex items-center gap-4">
        <PlayButton
          clickHandler={ () => {
            setCurrentlist(0)
          }}
        />
        <Tooltip title="add to your playlist">
          <button onClick={addToMyPlaylist}>
            <ControlPointIcon />
          </button>
        </Tooltip>
      </div>
      {playlist.songs &&
        playlist.songs.map((song: any, index: number) => {
          return <SongCard key={Math.random()} index={index + 1} song={song} setCurrentlist={setCurrentlist} />;
        })}
    </>
  );
});

export default ViewPlaylist;
