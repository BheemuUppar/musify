import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  audioStateAtom,
  currentSongAtom,
  currentSongsListAtom,
  currentTimeAtom,
  volumeAtom,
} from "../store/SongState";
import React, { useEffect, useState } from "react";
import { secondsToMinutesSeconds } from "../utils/utils";

function Player() {
  const [currentSong, setCurrentSong] = useRecoilState(currentSongAtom);
  const setAudioState = useSetRecoilState(audioStateAtom);
  const audioState = useRecoilValue(audioStateAtom);
  const setCurrentTime = useSetRecoilState(currentTimeAtom);
  const [currentList, setCurrentList] = useRecoilState(currentSongsListAtom);
  useEffect(() => {
    console.log("outside if ", currentList);
    if (currentList.songs.length > 0) {
      // setAudioState(currentList.songs[currentList.currentSongIndex])
      setCurrentSong(currentList.songs[currentList.currentSongIndex]);
      console.log("changing current song");
    }
  }, [currentList]);

  useEffect(() => {
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

  return (
    <>
      {currentSong && (
        <div className="h-[15vh] bg-black-900 p-2 mx-2 rounded  text-white grid grid-cols-12 gap-x-2 ">
          {/* <div className="border border-white col-span-2">hi</div>
          <div className="border border-white col-span-2">helo</div>
          <div className="border border-white col-span-2">goo</div> */}
          <div className="trackinfo flex col-span-3 items-center">
            <img
              className="h-[50px] w-[50px]"
              src={currentSong.image[2].url}
              alt=""
            />
            <div className="ps-2">
              <p>{currentSong.name}</p>
              <p>
                {currentSong.artists.primary.map((artist: any) => {
                  return (
                    <span key={artist.id} className="text-gray-400">
                      {artist.name}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
          <div className="controls grow mx-10 flex flex-col  col-span-6 justify-center">
            <div className="top flex justify-center gap-4 items-center my-2">
              <PreviousButton />
              <PlayPauseButton />
              <NextButton />
            </div>
            <SneekBar />
          </div>
          <div className="elements col-span-3">
            <VolumeSlider />
          </div>
        </div>
      )}
    </>
  );
}

const PlayPauseButton = React.memo(() => {
  const currentSong = useRecoilValue(currentSongAtom);
  const audio = useRecoilValue(audioStateAtom);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setDefault();
  }, [currentSong]);

  async function setDefault() {
    if (audio != undefined && audio != null) {
      await audio.pause();
      await setIsPlaying(false);

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
        className="rounded-full border border-white h-[40px] w-[40px] p-2"
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
        className="Svg-sc-ytk21e-0 dYnaPI fill-white"
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
        className="Svg-sc-ytk21e-0 dYnaPI fill-white"
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
        className="h-[20px] w-[20px]"
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
          className="Svg-sc-ytk21e-0 dYnaPI fill-white"
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
    return index > currentSongList.songs.length ? --index : 0;
  }
  return (
    <>
      <button
        className="h-[20px] w-[20px]"
        onClick={function () {
          setCurrentList({
            songs: currentSongList.songs,
            currentSongIndex: getPreviousSongIndex(),
          });
        }}
      >
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="Svg-sc-ytk21e-0 dYnaPI fill-white"
        >
          <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
        </svg>
      </button>
    </>
  );
}
function SneekBar() {
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeAtom);
  const audio = useRecoilValue(audioStateAtom);

  useEffect(() => {
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  }, [audio, currentTime]);

  return (
    <>
      <div className="sneekbar">
        <div className="w-full flex">
          <span>{secondsToMinutesSeconds(Math.floor(currentTime))}</span>
          <input
            className="w-full"
            type="range"
            name=""
            id=""
            onInput={function (e: any) {
              audio.currentTime = e.target.value;
              setCurrentTime(e.target.value);
            }}
            min={0}
            value={currentTime}
            max={audio ? parseInt(audio.duration) : "-:--"}
          />
          <span className="text-nowrap">
            {audio && audio.duration
              ? secondsToMinutesSeconds(Math.floor(parseInt(audio.duration)))
              : "--:--"}
          </span>
        </div>
      </div>
    </>
  );
}

function VolumeSlider() {
  const [volume, setVolume] = useRecoilState(volumeAtom);
  const [audioState, setAudioState] = useRecoilState(audioStateAtom);

  console.log(volume);

  useEffect(() => {
    audioState.volume = volume;
  }, [volume, audioState]);

  return (
    <>
      <input
        className="w-full"
        type="range"
        name="volume_slider"
        id="volume_slider"
        onInput={function (e: any) {
          let value = parseInt(e.target.value);
          let temp = value / 100;
          setVolume(temp);
        }}
        min="0"
        value={volume * 100}
        max="100"
      />
    </>
  );
}
export default Player;
