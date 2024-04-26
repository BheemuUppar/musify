import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { environment } from "../assets/environment";
import ListHeader from "./ListHeader";
import PlayButton from "./PlayButton";
import AlbumSongCard from "./AlbumSongCard";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentSongsListAtom } from "../store/SongState";
import { createPlaylist, getLibrary } from "../utils/apiutils";
import { libraryAtom } from "../store/otherState";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";

const ViewAlbum = React.memo(() => {
  const [album, setAlbum]: any = useState({});
  const params = useParams();
  const [currentSongList, setCurrentSongList] =
    useRecoilState(currentSongsListAtom);
  const setLibrary = useSetRecoilState(libraryAtom);
  useEffect(() => {
    axios
      .get(`${environment.searchUrl}/albumsById/${params.id}`)
      .then((data: any) => {
        console.log(data.data.data);
        setAlbum(data.data.data);
      });
  }, []);
  const addToMyPlaylist = async () => {
    let arrOfId = album.songs.map((song: any) => {
      return song.id;
    });
    let response: any = await createPlaylist(
      album.name,
      false,
      album.image,
      arrOfId
    );
    alert(response.data.message);
    getLibrary().then((data: any) => {
      setLibrary(data);
    });
  };
  return (
    <>
      <div>
        <ListHeader list={album} />
        <div className="flex items-center gap-4">
          <PlayButton
            clickHandler={async () => {
              await setCurrentSongList({
                songs: album.songs,
                currentSongIndex: 0,
              });
            }}
          />
          <Tooltip title="add to your playlist">
            <button onClick={addToMyPlaylist}>
              <ControlPointIcon />
            </button>
          </Tooltip>
        </div>
        {album &&
          album.songs &&
          album.songs.map((song: any) => {
            return <AlbumSongCard key={song.id} song={song} />;
          })}
      </div>
    </>
  );
});

export default ViewAlbum;
