import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isAuthenticatedAtom } from "../store/authState";
import { useNavigate } from "react-router-dom";
import CardContent from "./shared/CardContent";
import Library from "./Library/Library";
import Content from "./Content";
import NavContent from "./NavContent";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaylistCard from "./shared/PlaylistCard";
import Player from "./Player/Player";
import { environment } from "../assets/environment";
import { leftPanelWidthAtom, snackbarAtom, songInfoOpenAtom } from "../store/otherState";
import SongInfo from "./shared/SongInfo";

function Home() {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const navigate = useNavigate();
  const [songInfoOpen, setSongInfoOpen] = useRecoilState(songInfoOpenAtom);

  if (isAuthenticated == false) {
    navigate("/auth/signin");
  }

  return (
    <>
      <div className="flex gap-4 text-red-50 p-2 h-[80vh] max-h-[80vh]">
        <LeftView />
        <div className="grow">
          <CardContent>
            <Content></Content>
          </CardContent>
        </div>
        <div
          className={`${
            songInfoOpen ? "songInfoOpen block" : "songInfoClose hidden"
          } `}
          style={{ maxHeight: "80vh" }}
        >
          <CardContent>
            <SongInfo />
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
  const [sandlwood, setSandlwood] = useState([]);
  const setSnackbarState = useSetRecoilState(snackbarAtom);

  const  showNotification = function (props:{severity:string, message:string}){
    setSnackbarState(props)
  }
  let arr = ["Most Trending", "Top of sandalwood"] 
  useEffect(() => {
    fetchPlaylist(arr[0]);
    fetchPlaylist(arr[1]);
  }, []);

  function fetchPlaylist(searchKeyword: string) {
    axios
      .get(`${environment.searchUrl}/playlist/${searchKeyword}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(async (data) => {
        if(searchKeyword == 'Most Trending'){
          await setPlaylist(data.data);
        }
        if(searchKeyword == 'Top of sandalwood'){
          await setSandlwood(data.data);
        }
      }).catch((error)=>{
        showNotification({severity:'error', message:error.response.data.message})
      });
  }

  return (
    <>
    <DisplayCard  title={arr[0]} list= {playlists} path="playlist"/>
    <DisplayCard  title={arr[1]} list= {sandlwood} path="playlist"/>
    </>
  );
}

function DisplayCard({title, list, path}:{title:string, list:any ,path:string}){
return   <>
<div>
<h3 className="text-dark-600 dark:text-white text-xl my-4">{title}</h3>
<div className="flex gap-3 flex-wrap">
  {list &&  list.map((playlist: any) => {
    return (
      <PlaylistCard
        key={playlist.id}
        playlist={playlist}
        path={path + '/'+ playlist.id}
      />
    );
  })}
</div>
</div>
</>
}

function LeftView() {
  const [leftWidth, setLeftWidth] = useRecoilState(leftPanelWidthAtom);

  function onToggle() {
    if (leftWidth.size == "small") {
      setLeftWidth({ width: "360px", size: "large" });
    } else {
      setLeftWidth({ width: "90px", size: "small" });
    }
  }
  return (
    <>
      <div
        className="flex flex-col gap-4"
        style={{
          width: leftWidth.width,
          maxWidth: leftWidth.width,
          minWidth: leftWidth.width,
        }}
      >
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
