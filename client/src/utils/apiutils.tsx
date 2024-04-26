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

export async function addSongtoLibrary(id: string, songId: string) {
  let response = await axios.post(`${environment.userUrl}/addSongtoPlayList`, {
    email: localStorage.getItem("email"),
    playlistId: id,
    songId: songId,
  });
  return response;
}
export async function createPlaylist(
  name: string,
  isCollaborative: boolean,
  image?: any,
  songs?: string[]
) {
  let response = await axios
    .post(`${environment.userUrl}/createPlaylist`, {
      email: localStorage.getItem("email"),
      name: name,
      username: localStorage.getItem("username"),
      collaborative: isCollaborative,
      image,
      songs,
    })
    .catch((err) => {
      //alert error here
      console.log(err);
    });
  return response;
}

export async function removePlaylist(playlistId: string) {
  let response = await axios
    .post(`${environment.userUrl}/deletePlaylist`, {
      email: localStorage.getItem("email"),
      playlistId: playlistId,
    })
    .catch((err) => {
      //alert error here
      console.log(err);
    });
  return response;
}

export async function saveToMyPlaylist(playlist: any) {
  let email = localStorage.getItem('email')
  let response = await axios.post(
    `${environment.userUrl}/collaboratePlaylist`,
    { email:email , playlistId: playlist._id }
  );
  return response;
}

export async function getCollaborationPlaylist() {
  let email = localStorage.getItem("email");
  let response = await axios.post(
    `${environment.searchUrl}/collaborationPlaylists`,
    { email: email }
  );
  return response;
}
