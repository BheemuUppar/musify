import { useLocation } from "react-router-dom";
import ListHeader from "./ListHeader";
import PlayButton from "./PlayButton";
import { useSetRecoilState } from "recoil";
import { currentSongsListAtom } from "../store/SongState";
import SongCard from "./SongCard";
function ViewMyPlaylist() {
  const { state } = useLocation();
  const setCurrentPlayList = useSetRecoilState(currentSongsListAtom);

  return (
    <>
      {/* <pre>{JSON.stringify(state)}</pre> */}
      <ListHeader list={state}></ListHeader>
      <PlayButton  clickHandler={async ()=>{
          await setCurrentPlayList({songs:state.songs, currentSongIndex:0})
        }}></PlayButton>

       <div>
       {state.songs.map((song:any, index:number)=>{
            return <SongCard  key={song.id} index={index} song={song}/>
        })}
       </div>
    </>
  );
}

export default ViewMyPlaylist;
