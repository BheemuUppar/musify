import { useRecoilValue, useSetRecoilState } from "recoil";
import { audioStateAtom, currentSongAtom } from "../store/SongState";
import React, { useEffect, useState } from "react";

function Player() {
  const currentSong = useRecoilValue(currentSongAtom);
  const setAudioState = useSetRecoilState(audioStateAtom);

  useEffect(() => {
    if (currentSong) {
      let audio = new Audio();
      audio.src = currentSong.downloadUrl[4].url;
      setAudioState(audio);
    }
  }, [currentSong]);

  return (
    <>
      {currentSong && (
        <div className="h-[15vh] bg-gray-900 p-2 mx-2 rounded flex justify-around items-center text-white  ">
          <div className="trackinfo flex">
            <img
              className="h-[50px] w-[50px]"
              src={currentSong.image[2].url}
              alt=""
            />
            <div className="ps-2">
              <p>{currentSong.name}</p>
              <p>
                {currentSong.artists.primary.map((artist: any) => {
                  return <span className="text-gray-400">{artist.name}</span>;
                })}
              </p>
            </div>
          </div>
          <div className="controls grow mx-10 flex flex-col py-2">
            <div className="top flex justify-center gap-4 items-center my-2">
              <PreviousButton />
              <PlayPauseButton />
              <NextButton />
            </div>
            <div className="sneekbar">
              <div className="w-full">
                <div className="bar h-[3px] bg-white relative">
                  <div className="progress h-[3px] w-[3px]  bg-green absolute bg-green-400 left-0"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="elements">volume and extra button</div>
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
    if (audio.pause) {
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
  return (
    <>
      <button className="h-[20px] w-[20px]">
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
  return (
    <>
      <button className="h-[20px] w-[20px]">
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
export default Player;