import { useRecoilValue } from "recoil";
import { isAuthenticatedAtom } from "../store/authState";
import { useNavigate } from "react-router-dom";
import CardContent from "./CardContent";
import Library from "./Library";
import Content from "./Content";
import NavContent from "./NavContent";
import { useEffect, useState } from "react";
import axios from "axios";
import Album from "./Album";
import PlaylistCard from "./PlaylistCard";
import Player from "./Player";
import { environment } from "../assets/environment";

function Home() {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const navigate = useNavigate();

  if (isAuthenticated == false) {
    navigate("/auth/signin");
  }

  return (
    <>
      <div className="flex gap-4 text-red-50 p-2 h-[80vh]  ">
        <div className="flex flex-col gap-4">
          <CardContent>
            <NavContent></NavContent>
          </CardContent>
          <CardContent>
            <Library></Library>
          </CardContent>
        </div>
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

export function HomePage() {
  const [playlists, setPlaylist] = useState([]);
  useEffect(() => {
    fetchPlaylist();
  }, []);

  function fetchPlaylist() {
    axios
      .get(`${environment.searchUrl}/playlist/${"bollywood"}`)
      .then(async (data) => {
        console.log(data)
        await setPlaylist(data.data);
      });
  }

  return (
    <>
      <div className="md:grid grid-cols-5 grid grid-cols-5">
        {playlists.map((playlist: any) => {
          return <PlaylistCard key={playlist.id} playlist={playlist} />;
        })}
      </div>
    </>
  );
}


export default Home;
