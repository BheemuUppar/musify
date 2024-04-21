import { useRecoilState, useRecoilValue } from "recoil";
import { currentSongAtom } from "../store/SongState";
import { songInfoOpenAtom } from "../store/otherState";

function SongInfo() {
  const currentSong = useRecoilValue(currentSongAtom);
  const [songInfoOpen, setSongInfoOpen] = useRecoilState(songInfoOpenAtom);

  return (
    <>
      <button
        onClick={() => {
          setSongInfoOpen(false);
        }}
      >
        close
      </button>
      this is song card
    </>
  );
}
export default SongInfo;
