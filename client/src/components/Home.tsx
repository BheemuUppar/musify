import { useRecoilState, useRecoilValue } from "recoil";
import { isAuthenticatedAtom } from "../store/authState";
import { useNavigate } from "react-router-dom";
import CardContent from "./CardContent";
import Library from "./Library";
import Content from "./Content";
import NavContent from "./NavContent";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaylistCard from "./PlaylistCard";
import Player from "./Player";
import { environment } from "../assets/environment";
import { leftPanelWidthAtom } from "../store/otherState";

function Home() {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const navigate = useNavigate();

  if (isAuthenticated == false) {
    navigate("/auth/signin");
  }

  return (
    <>
      <div className="flex gap-4 text-red-50 p-2 h-[80vh]">
        <LeftView />
        <div className="grow">
          <CardContent>
            <Content></Content>
          </CardContent>
        </div>
      </div>
      <Player></Player>
    </>
  );
}

// default page
export function HomePage() {
  const [playlists, setPlaylist] = useState([]);
  useEffect(() => {
    fetchPlaylist();
  }, []);

  function fetchPlaylist() {
    axios
      .get(`${environment.searchUrl}/playlist/${"bollywood"}`)
      .then(async (data) => {
        console.log(data);
        await setPlaylist(data.data);
      });
  }

  return (
    <>
      <div className="flex gap-3 flex-wrap">
        {playlists.map((playlist: any) => {
          return <PlaylistCard key={playlist.id} playlist={playlist} />;
        })}
      </div>
    </>
  );
}

function LeftView() {
  const [leftWidth, setLeftWidth] = useRecoilState(leftPanelWidthAtom);

  function onToggle() {
    if (leftWidth.size == "small") {
      setLeftWidth({width:"300px", size:"large"});
    } else {
      setLeftWidth({width:"90px", size:"small"});
    }
  }
  return (
    <>
      <div className="flex flex-col gap-4" style={{ width: leftWidth.width , maxWidth: leftWidth.width, minWidth: leftWidth.width  }}>
        <div>
          <CardContent>
            <NavContent></NavContent>
          </CardContent>
        </div>

        <CardContent>
          <Library clickHandler={onToggle}></Library>
        </CardContent>
      </div>
    </>
  );
}

export default Home;
