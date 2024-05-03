import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  audioStateAtom,
  currentSongAtom,
  currentSongsListAtom,
  currentTimeAtom,
  isPlayingAtom,
  volumeAtom,
} from "../../store/SongState";
import InfoIcon from "@mui/icons-material/Info";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import React, { useEffect, useRef } from "react";
import { secondsToMinutesSeconds } from "../../utils/utils";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { snackbarAtom, songInfoOpenAtom } from "../../store/otherState";
import BackgroundVideo from "../../assets/music-background.mp4";

function Player() {
  const [currentSong, setCurrentSong] = useRecoilState(currentSongAtom);
  const setAudioState = useSetRecoilState(audioStateAtom);
  const audioState = useRecoilValue(audioStateAtom);
  const setCurrentTime = useSetRecoilState(currentTimeAtom);
  const [currentList, setCurrentList] = useRecoilState(currentSongsListAtom);
  const playerRef: any = useRef();
  const setSnackbarState = useSetRecoilState(snackbarAtom);

  const  showNotification = function (props:{severity:string, message:string}){
    setSnackbarState(props)
  }

  useEffect(() => {
    if (currentList.songs.length > 0) {
      if (audioState) {
        audioState.pause();
      }
      setCurrentSong(currentList.songs[currentList.currentSongIndex]);
    }
  }, [currentList]);

  useEffect(() => {
    if (audioState) {
      audioState.pause();
    }
    setAudioHandler();
  }, [currentSong]);

  async function setAudioHandler() {
    if (currentSong) {
      let audio = new Audio();
      audio.src = currentSong.downloadUrl[4].url;
      await setAudioState(audio);
      await setCurrentTime(audio.currentTime);
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });
    }
  }
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
  let toggleFullScreenMode = () => {
    if (
      navigator.userAgent.match(/Android/i)
      ||  navigator.userAgent.match(/webOS/i)
      ||  navigator.userAgent.match(/iPhone/i)
      ||  navigator.userAgent.match(/iPad/i)
      ||  navigator.userAgent.match(/iPod/i)
      ||  navigator.userAgent.match(/BlackBerry/i)
      ||  navigator.userAgent.match(/Windows Phone/i)
    || window.innerWidth < 768
    ) {
      showNotification({severity:"error", message:"this feature is not available in mobile device"})
      
    }else{
      playerRef.current.classList.toggle("fullMode");
      toggleFullScreen();
    }
  };

  return (
    <>
      {currentSong && (
        <div
          id="player"
          ref={playerRef}
          className="p-2 mx-2  flex flex-nowrap gap-x-2 dark:bg-dark bg-white-50 border-t border-gray-400 dark:border-0 "
          style={{ height: "calc(100vh - 80vh)" }}
        >
          <BgVideo />
          <div className="trackinfo flex col-span-3 items-center full-width min-w-[300px]">
            <img
              className="h-[50px] w-[50px]"
              src={currentSong.image[2].url}
              alt=""
            />
            <div className="ps-2">
              <p className="text-dark dark:text-white text-lg">
                {currentSong.name}
              </p>
              <p>
                {currentSong.artists.primary.map((artist: any) => {
                  return (
                    <span
                      key={artist.id}
                      className="dark:text-gray-400 text-gray-700"
                    >
                      {artist.name}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
          <div className="controls grow mx-10 flex flex-col left col-span-6 justify-center side-by-side min-w-[300px]">
            <div className="top flex justify-center gap-4 items-center my-2">
              <PreviousButton />
              <PlayPauseButton />
              <NextButton />
            </div>
            <div>
              <SneekBar />
            </div>
          </div>
          <div className="elements col-span-3 flex items-center gap-4 right side-by-side sm:justify-center min-w-[300px] ">
            <VolumeSlider />
            <SongInfoButton className="song-info" />
            <button className="hidden md:block" type="button" onClick={toggleFullScreenMode}>
              <OpenInFullIcon className="text-dark-600 dark:text-white open-full-icon" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const BgVideo = () => {
  let isPlaying = useRecoilValue(isPlayingAtom);
  const video: any = useRef();
  useEffect(() => {
    if (  !isPlaying ) {
      video.current.pause();
    } else if(isPlaying) {
      video.current.play();
    }
  }, [isPlaying]);
  return (
    <>
      <div className="hidden video-background">
        <video ref={video} autoPlay loop muted>
          <source src={BackgroundVideo} type="video/mp4" />
          {/* Add more <source> tags for different video formats if necessary */}
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

const PlayPauseButton = React.memo(() => {
  const currentSong = useRecoilValue(currentSongAtom);
  const audio = useRecoilValue(audioStateAtom);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);

  useEffect(() => {
    setDefault();
  }, [currentSong, audio]);

  async function setDefault() {
    if (audio != undefined && audio != null) {
      await audio.play();
      await setIsPlaying(true);
      // audio.play();
      // setIsPlaying(true)
    }
  }

  return (
    <>
      <button
        onClick={() => {
          if (!isPlaying) {
            setIsPlaying(true);
            audio.play();
          } else {
            setIsPlaying(false);
            audio.pause();
          }
        }}
        type="button"
        className="rounded-full border border-dark-600 dark:border-white h-[40px] w-[40px] p-2 text-gray-500 dark:text-white dark:fill-white play-pause-btn"
      >
        {!isPlaying ? <PlayingButton /> : <PauseButton />}
      </button>
    </>
  );
});

function PlayingButton() {
  return (
    <>
      <svg
        data-encore-id="icon"
        role="img"
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="Svg-sc-ytk21e-0 dYnaPI "
      >
        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
      </svg>
    </>
  );
}

function PauseButton() {
  return (
    <>
      <svg
        data-encore-id="icon"
        role="img"
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="Svg-sc-ytk21e-0 dYnaPI "
      >
        <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
      </svg>
    </>
  );
}

function NextButton() {
  const [currentSongList, setCurrentList] =
    useRecoilState(currentSongsListAtom);
  function getNextSongIndex() {
    let index = currentSongList.currentSongIndex;
    return index < currentSongList.songs.length ? ++index : 0;
  }
  return (
    <>
      <button
        className="h-[20px] w-[20px] fill-dark-500 dark:fill-white next-btn"
        onClick={function () {
          setCurrentList({
            songs: currentSongList.songs,
            currentSongIndex: getNextSongIndex(),
          });
        }}
      >
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="Svg-sc-ytk21e-0 dYnaPI "
        >
          <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
        </svg>
      </button>
    </>
  );
}
function PreviousButton() {
  const [currentSongList, setCurrentList] =
    useRecoilState(currentSongsListAtom);

  function getPreviousSongIndex() {
    let index = currentSongList.currentSongIndex;
    if (index == 0) {
      return 0;
    }
    return --index;
  }
  return (
    <>
      <button
        className="h-[20px] w-[20px] fill-dark-500 dark:fill-white previous-btn"
        onClick={function () {
          setCurrentList(
            JSON.parse(
              JSON.stringify({
                songs: currentSongList.songs,
                currentSongIndex: getPreviousSongIndex(),
              })
            )
          );
        }}
      >
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
          // className="Svg-sc-ytk21e-0 dYnaPI fill-dark-500 dark:fill-white" fill={document.fullscreenElement? "#fff":""}
          className=""
        >
          <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
        </svg>
      </button>
    </>
  );
}

function SneekBar() {
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeAtom);
  const [currentSongList, setCurrentList] =
    useRecoilState(currentSongsListAtom);
  function getNextSongIndex() {
    let index = currentSongList.currentSongIndex;
    return index < currentSongList.songs.length ? ++index : 0;
  }
  const audio = useRecoilValue(audioStateAtom);

  useEffect(() => {
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  }, [audio, currentTime]);
  useEffect(() => {
    if (audio && audio.currentTime == audio.duration) {
      setCurrentList({
        songs: currentSongList.songs,
        currentSongIndex: getNextSongIndex(),
      });
    }
  }, [currentTime]);

  const handleChange = (event: any, newValue: any) => {
    audio.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const maxDuration = audio && audio.duration ? parseInt(audio.duration) : 10;
  return (
    <div className="sneekbar">
      <div className="w-full flex gap-4 items-center text-[10px]">
        <span className="pb-[4px]">
          {secondsToMinutesSeconds(Math.floor(currentTime))}
        </span>
        <Box sx={{ width: "100%" }}>
          <Slider
            min={0}
            max={maxDuration}
            value={currentTime}
            onChange={handleChange}
            // className="dark:text-white text-green-400"
            // sx={{
            //   // color: "#fff",
            //   "& .MuiSlider-track": {
            //     border: "none",
            //     backgroundColor:"green"
            //   },
            //   "& .MuiSlider-thumb": {
            //     width: 15,
            //     height: 15,
            //     backgroundColor: "#fff",
            //     "&::before": {
            //       boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
            //     },
            //     "&:hover, &.Mui-focusVisible, &.Mui-active": {
            //       boxShadow: "none",
            //     },
            //   },
            // }}
          />
        </Box>
        <span className="text-nowrap pb-[4px]">
          {audio && audio.duration
            ? secondsToMinutesSeconds(Math.floor(parseInt(audio.duration)))
            : "--:--"}
        </span>
      </div>
    </div>
  );
}

function VolumeSlider() {
  const [volume, setVolume] = useRecoilState(volumeAtom);
  const audioState = useRecoilValue(audioStateAtom);

  useEffect(() => {
    if (audioState) audioState.volume = volume;
  }, [volume, audioState]);

  const handleChange = (event: any, newValue: any) => {
    setVolume(newValue / 100);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider
          aria-label="Volume"
          value={volume * 100}
          min={0}
          max={100}
          sx={{
            color: "#fff",
            "& .MuiSlider-track": {
              border: "none",
            },
            "& .MuiSlider-thumb": {
              width: 15,
              height: 15,
              backgroundColor: "#fff",
              "&::before": {
                boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "none",
              },
            },
          }}
          onChange={handleChange}
        />
        <VolumeUp />
      </Stack>
    </Box>
  );
}

function SongInfoButton({ className }: { className: string }) {
  const [songInfoOpen, setSongInfoOpen] = useRecoilState(songInfoOpenAtom);
  return (
    <>
      <button
        className={className}
        onClick={async () => {
          setSongInfoOpen(!songInfoOpen);
        }}
      >
        <InfoIcon />
      </button>
    </>
  );
}
export default Player;
