import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListHeader from "../shared/ListHeader";
import PlayButton from "../shared/PlayButton";
import AlbumSongCard from "../shared/AlbumSongCard";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentSongsListAtom } from "../../store/SongState";
import { createPlaylist, getLibrary } from "../../utils/apiutils";
import { libraryAtom, snackbarAtom } from "../../store/otherState";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";

const searchUrl = import.meta.env.VITE_SEARCH_URL

const ViewAlbum = React.memo(() => {
  const [album, setAlbum]: any = useState({});
  const params = useParams();
  const [currentSongList, setCurrentSongList] = useRecoilState(currentSongsListAtom);
  const setLibrary = useSetRecoilState(libraryAtom);
  const setSnackbarState = useSetRecoilState(snackbarAtom);

  useEffect(() => {
    axios
      .get(`${searchUrl}/albumsById/${params.id}`, {
        headers:{
          Authorization:localStorage.getItem('token')
        }
      })
      .then((data: any) => {
        setAlbum(data.data.data);
      }).catch((error:any)=>{
        showNotification({severity:'error', message:error.response.data.message})
      });
  }, []);

  const  showNotification = function (props:{severity:string, message:string}){
    setSnackbarState(props)
  }

  const addToMyPlaylist = async () => {
   try{
    let arrOfId = album.songs.map((song: any) => {
      return song.id;
    });
    let response: any = await createPlaylist(
      album.name,
      false,
      album.image,
      arrOfId
    );
    
    showNotification({severity:'success', message:response.data.message})
    getLibrary().then((data: any) => {
      setLibrary(data);
    });
   }catch(error:any){
    showNotification({severity:'error', message:error.response.data.message})
   }
  };
    const setCurrentlist = async (index:number)=>{
      await setCurrentSongList({
        songs: album.songs,
        currentSongIndex: index,
      });
    }

  return (
    <>
      <div>
        <ListHeader list={album} />
        <div className="flex items-center gap-4 px-2 " style={{height:'100px'}} >
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
              <ControlPointIcon className="text-gray-600 dark:text-white "/>
            </button>
          </Tooltip>
        </div>
        {album &&
          album.songs &&
          album.songs.map((song: any, index:number) => {
            return <AlbumSongCard  index={index} setCurrentlist={setCurrentlist} key={song.id} song={song} />;
          })}
      </div>
    </>
  );
});

export default ViewAlbum;
