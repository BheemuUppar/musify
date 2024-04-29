import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongCard from "../shared/SongCard";
import { environment } from "../../assets/environment";
import PlayButton from "../shared/PlayButton";
import ListHeader from "../shared/ListHeader";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { audioStateAtom, currentSongsListAtom } from "../../store/SongState";
import { createPlaylist, getLibrary } from "../../utils/apiutils";
import { libraryAtom, snackbarAtom } from "../../store/otherState";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";

const ViewPlaylist = React.memo(() => {
  const [playlist, setPlaylist]: any = useState({});
  const params = useParams();
  const [songsList, setSongsList] = useRecoilState(currentSongsListAtom);
  const setLibrary = useSetRecoilState(libraryAtom);
  const setSnackbarState = useSetRecoilState(snackbarAtom);

  const  showNotification = function (props:{severity:string, message:string}){
    setSnackbarState(props)
  }

  useEffect(() => {
    axios
      .get(`${environment.searchUrl}/playlistById/${params.id}`,{
        headers:{
          Authorization:localStorage.getItem('token')
        }
      })
      .then((response) => {
        setPlaylist(response.data.data);
      })
      .catch((error) => {
        showNotification({severity:'error', message:error.response.data.message})
      });
  }, []);

  const addToMyPlaylist = async () => {
    try{
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
    }catch(error:any){
      showNotification({severity:'error', message:error.response.data.message})
    }
  };

const setCurrentlist = async (index:number)=>{
  console.log(index , playlist.songs)
  await setSongsList(JSON.parse(JSON.stringify({ songs: playlist.songs, currentSongIndex: index })));
}

  return (
    <>
      <ListHeader list={playlist} />
      <div className=" my-2 flex items-center gap-4 px-2" style={{height:'100px'}}>
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
          return <SongCard key={Math.random()} index={index} song={song} setCurrentlist={setCurrentlist} />;
        })}
    </>
  );
});

export default ViewPlaylist;
