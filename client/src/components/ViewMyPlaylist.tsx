import { useLocation } from "react-router-dom";
import ListHeader from "./ListHeader";
import PlayButton from "./PlayButton";
import { useSetRecoilState } from "recoil";
import { currentSongsListAtom } from "../store/SongState";
import SongCard from "./SongCard";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";
import { getLibrary, saveToMyPlaylist } from "../utils/apiutils";
import { libraryAtom } from "../store/otherState";

function ViewMyPlaylist() {
  const { state } = useLocation();
  const setCurrentPlayList = useSetRecoilState(currentSongsListAtom);
  const setLibrary = useSetRecoilState(libraryAtom);

  const addToMyPlaylist = async () => {
    let response: any = await saveToMyPlaylist(state);
    alert(response.data.message);
    getLibrary().then((data: any) => {
      setLibrary(data);
    });
  };

  return (
    <>
      {/* <pre>{JSON.stringify(state)}</pre> */}
      <ListHeader list={state}></ListHeader>
      <div className="flex items-center gap-2">
        <PlayButton
          clickHandler={async () => {
            await setCurrentPlayList({
              songs: state.songs,
              currentSongIndex: 0,
            });
          }}
        ></PlayButton>
        <Tooltip title="add to your playlist">
          <button onClick={addToMyPlaylist}>
            <ControlPointIcon />
          </button>
        </Tooltip>
      </div>

      <div>
        {state.songs.length > 0 &&
          state.songs.map((song: any, index: number) => {
            return <SongCard key={song.id} index={index} song={song} />;
          })}
        {state.songs.length == 0 && <h4>No songs available</h4>}
      </div>
    </>
  );
}

export default ViewMyPlaylist;
