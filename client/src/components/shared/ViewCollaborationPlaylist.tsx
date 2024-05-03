import { useLocation } from "react-router-dom";
import ListHeader from "../shared/ListHeader";
import PlayButton from "../shared/PlayButton";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentSongsListAtom } from "../../store/SongState";
import SongCard from "../shared/SongCard";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";
import { getLibrary, saveToMyPlaylist } from "../../utils/apiutils";
import { libraryAtom, snackbarAtom } from "../../store/otherState";
import { AxiosResponse } from "axios";
import { MyPlaylist } from "../../types/MyPlaylist";

function ViewCollaborationPlaylist() {
  const { state } = useLocation();
  const [currentList, setCurrentPlayList] = useRecoilState(currentSongsListAtom);
  const setLibrary = useSetRecoilState(libraryAtom);
  const setSnackbarState = useSetRecoilState(snackbarAtom);

  const showNotification = function (props: {
    severity: string;
    message: string;
  }) {
    setSnackbarState(props);
  };
  
 

  const addToMyPlaylist = async () => {
    try {
      let response: AxiosResponse = await saveToMyPlaylist(state);
      showNotification({ severity: "success", message: response.data.message });
      getLibrary().then((data: MyPlaylist[]) => {
        setLibrary(data);
      });
    } catch (error: any) {
      showNotification({
        severity: "error",
        message: error.response.data.message,
      });
    }
  };

  const setCurrentlist = async (index: number) => {
    setCurrentPlayList({
      songs: state.songs,
      currentSongIndex: index,
    });
  };

  return (
    <>
      {/* <pre>{JSON.stringify(state)}</pre> */}
      <ListHeader list={state}></ListHeader>
      <div className="flex items-center gap-2 px-2" style={{ height: "100px" }}>
        <PlayButton
          clickHandler={() => {
            // if (currentList.songs && currentList.songs.length > 0) {
              setCurrentlist(0);
            // }
          }}
        ></PlayButton>
        <Tooltip title="add to your playlist">
          <button onClick={addToMyPlaylist}>
            <ControlPointIcon className="text-gray-600 dark:text-white " />
          </button>
        </Tooltip>
      </div>

      <div>
        <div></div>
        {state.songs.length > 0 &&
          state.songs.map((song: any, index: number) => {
            return (
              <SongCard
                setCurrentlist={setCurrentlist}
                key={song.id}
                index={index}
                song={song}
              />
            );
          })}
        {state.songs.length == 0 && <h4>No songs available</h4>}
      </div>
    </>
  );
}

export default ViewCollaborationPlaylist;
