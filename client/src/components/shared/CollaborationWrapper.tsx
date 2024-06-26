import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { snackbarAtom } from "../../store/otherState";
import { getCollaborationPlaylist } from "../../utils/apiutils";
import CollaborationPlaylistCard from "./CollaborationPlaylistCard";
import { MyPlaylist } from "../../types/MyPlaylist";

function CollaborationWrapper() {
    const [collaborationPlaylist, setCollaborationPlaylist] = useState<any>([]);
    const setSnackbarState = useSetRecoilState(snackbarAtom);
  
    const  showNotification :any = function (props:{severity:string, message:string}){
      setSnackbarState(props);
    }
    useEffect(()=>{ 
      getCollaborationPlaylist().then((res:any)=>{
        setCollaborationPlaylist(res.data)
      }).catch((error:any)=>{
        showNotification({severity:'error', message:error.response.data.message})
      })
    }, [])
    return (
      <div>
        <h2 className="text-xl text-dark-600 dark:text-white ">Collaboration Playlist</h2>
        {/* <PlaylistCard /> */}
        <div className="flex">
        {collaborationPlaylist.map((playlist:MyPlaylist)=>{
          return <CollaborationPlaylistCard key={playlist._id}  playlist={playlist} />
        })}
         
        </div>
      </div>
    );
  }

export default CollaborationWrapper;