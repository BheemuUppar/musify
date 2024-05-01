import axios from "axios";
const searchUrl = import.meta.env.VITE_SEARCH_URL
const userUrl = import.meta.env.USER_URL

export async function getPlaylistDetailsById(id: any) {
  let token =localStorage.getItem('token')
  const res = await axios.get(`${searchUrl}/playlistById/${id}`,
  {
    headers:{
      Authorization:token
    }
  }
  );
  return res.data.data;
}
export async function getPAlbumDetailsById(id: any) {
  let token =localStorage.getItem('token')
  const res = await axios.get(`${searchUrl}/albumsById/${id}`,
  {
    headers:{
      Authorization:token
    }
  }
  );
  return res.data.data;
}

export async function getLibrary() {
  let email = localStorage.getItem("email");
  let token = localStorage.getItem("token");
  console.log(token)
  let res = await axios.post(`${userUrl}/getLibrary`, {
    email: email,
  }, {
    headers:{
      Authorization:token
    }
  });

  return res.data;
}

export async function addSongtoLibrary(id: string, songId: string) {
  let token = localStorage.getItem('token');

  let response = await axios.post(`${userUrl}/addSongtoPlayList`, {
    email: localStorage.getItem("email"),
    playlistId: id,
    songId: songId,
  }, {
    headers:{
      Authorization:token
    }
  });
  return response;
}
export async function createPlaylist(
  name: string,
  isCollaborative: boolean,
  image?: any,
  songs?: string[]
) {
  let token = localStorage.getItem('token');
  let response = await axios
    .post(`${userUrl}/createPlaylist`, {
      email: localStorage.getItem("email"),
      name: name,
      username: localStorage.getItem("username"),
      collaborative: isCollaborative,
      image,
      songs,
    }, {
      headers:{
        Authorization:token
      }
    })
    
  return response;
}

export async function removePlaylist(playlistId: string) {
  let token = localStorage.getItem('token');

  let response = await axios
    .post(`${userUrl}/deletePlaylist`, {
      email: localStorage.getItem("email"),
      playlistId: playlistId,
    }, {
      headers:{
        Authorization:token
      }
    })
    .catch((err) => {
      //alert error here
      console.log(err);
    });
  return response;
}

export async function saveToMyPlaylist(playlist: any) {
  let email = localStorage.getItem('email');
  let token = localStorage.getItem('token');

  let response = await axios.post(
    `${userUrl}/collaboratePlaylist`,
    { email:email , playlistId: playlist._id }, {
      headers:{
        Authorization:token
      }
    }
  )
  return response;
}

export async function getCollaborationPlaylist() {
  let token = localStorage.getItem('token')
  let email = localStorage.getItem("email");
  let response = await axios.post(
    `${searchUrl}/collaborationPlaylists`,
    { email: email }, {
      headers:{
        Authorization:token
      }
    }
  );
  return response;
}
