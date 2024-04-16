import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { environment } from "../assets/environment";
import ListHeader from "./ListHeader";
import PlayButton from "./PlayButton";
import AlbumSongCard from "./AlbumSongCard";

const ViewAlbum = React.memo(() => {
  const [album, setAlbum]:any = useState({});
  const params = useParams();

  useEffect(() => {
    axios
      .get(`${environment.searchUrl}/albumsById/${params.id}`)
      .then((data: any) => {
        console.log(data.data.data);
        setAlbum(data.data.data);
      });
  }, []);

  return (
    <>
      <div>
        <ListHeader list={album} />
        <PlayButton/>
        {album && album.songs && album.songs.map((song : any)=>{
          return <AlbumSongCard key={song.id} song={song}/>
        })}
      </div>
    </>
  );
});

export default ViewAlbum;
