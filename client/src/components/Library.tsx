import React from "react";

const Library = React.memo(() => {
  return (
    <>
      <div className="flex justify-between items-center">
        <span className="">
          <button className="bg-blue-400">toggler</button>
          <span className="text-nowrap hidden sm:inline-block">
            Your Library
          </span>
        </span>
        <div>
          <button>create playlist</button>
        </div>
      </div>

      <ul className="playlist-wrapper">
        <ul>
          <li className="flex justify-start items-center gap-2 my-4">
            <img className="h-[50px] w-[50px]"src="../assets/images/logo.png"  alt=""
            />
            <h3 className="hidden sm:inline-block text-xl">Playlist 01</h3>
          </li>
        </ul>
      </ul>
    </>
  );
});

export default Library;
