import axios from "axios";
import { environment } from "../assets/environment";

export async function getPlaylistDetailsById(id:any){
   const res = await axios.get(`${environment.searchUrl}/playlistById/${id}`);
   return res.data.data;
} 