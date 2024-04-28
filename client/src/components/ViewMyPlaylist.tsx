import { useLocation } from "react-router-dom";
import ListHeader from "./ListHeader";
import PlayButton from "./PlayButton";
import { useSetRecoilState } from "recoil";
import { currentSongsListAtom } from "../store/SongState";
import SongCard from "./SongCard";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";
import { getLibrary, saveToMyPlaylist } from "../utils/apiutils";
import { libraryAtom, snackbarAtom } from "../store/otherState";

function ViewMyPlaylist() {
  const { state } = useLocation();
  const setCurrentPlayList = useSetRecoilState(currentSongsListAtom);
  const setLibrary = useSetRecoilState(libraryAtom);
  const setSnackbarState = useSetRecoilState(snackbarAtom);

  const  showNotification = function (props:{severity:string, message:string}){
    setSnackbarState(props)
  }

  const addToMyPlaylist = async () => {
    try{
      let response: any = await saveToMyPlaylist(state);
    showNotification({severity:'success', message:response.data.message})
    getLibrary().then((data: any) => {
      setLibrary(data);
    });
    }catch(error:any){
      showNotification({severity:'error', message:error.response.data.message})
    }
  };


  const setCurrentlist = async (index:number)=>{
     setCurrentPlayList({
      songs: state.songs,
      currentSongIndex: index,
    });
  }

  return (
    <>
      {/* <pre>{JSON.stringify(state)}</pre> */}
      <ListHeader list={state}></ListHeader>
      <div className="flex items-center gap-2 px-2" style={{height:'100px'}}>
        <PlayButton
          clickHandler={ () => {
          setCurrentlist(0)
          }}
        ></PlayButton>
        <Tooltip title="add to your playlist">
          <button onClick={addToMyPlaylist}>
            <ControlPointIcon />
          </button>
        </Tooltip>
      </div>

      <div>
        <div></div>
        {state.songs.length > 0 &&
          state.songs.map((song: any, index: number) => {
            return <SongCard setCurrentlist={setCurrentlist} key={song.id} index={index+1} song={song} />;
          })}
        {state.songs.length == 0 && <h4>No songs available</h4>}
      </div>
    </>
  );
}

export default ViewMyPlaylist;
