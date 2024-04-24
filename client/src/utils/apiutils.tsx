import axios from "axios";
import { environment } from "../assets/environment";

export async function getPlaylistDetailsById(id: any) {
  const res = await axios.get(`${environment.searchUrl}/playlistById/${id}`);
  return res.data.data;
}

export async function getLibrary() {
  let email = localStorage.getItem("email");

  let res = await axios.post(`${environment.userUrl}/getLibrary`, {
    email: email,
  });

  return res.data;
}

export async function addSongtoLibrary(name: string, songId: string) {
  let response = await axios.post(`${environment.userUrl}/addSongtoPlayList`, {
    email: localStorage.getItem("email"),
    playlistName: name,
    songId: songId,
  });
  return response;
}
export async function createPlaylist(name: string) {
  let response = await axios
    .post(`${environment.userUrl}/createPlaylist`, {
      email: localStorage.getItem("email"),
      name: name,
      username:localStorage.getItem("username"),
      collaborative:true
    })
    .catch((err) => {
      //alert error here
      console.log(err);
    });
  return response;
}
