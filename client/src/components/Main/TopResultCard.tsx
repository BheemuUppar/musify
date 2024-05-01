import { useEffect } from "react";
import PlayButton from "../shared/PlayButton";
import { Link } from "react-router-dom";
import { getPAlbumDetailsById } from "../../utils/apiutils";
import { useSetRecoilState } from "recoil";
import { currentSongsListAtom } from "../../store/SongState";

function TopResultCard({ album, className, setCurrentlist }: any) {
  const setCurrentPlayList = useSetRecoilState(currentSongsListAtom)
  useEffect(()=>{
  })
  const handleButtonClick = async (e:any)=>{
    e.preventDefault()
      let playlistData = await  getPAlbumDetailsById(album.id);
       setCurrentPlayList({songs:playlistData.songs, currentSongIndex:0})
  }

    return (
      <>
        <h1 className="text-2xl text-dark-600 dark:text-white  my-3">Top Results</h1>
        <div className="buttonParent   rounded relative group p-6 border border-gray-200 dark:border-0  h-[200px]  bg-[#e3e5eb] dark:bg-dark-500 dark:hover:bg-dark-600 hover:bg-[#e1e2e7] transition ease-in duration-200">
          <Link to={"/home/album/" + album.id}>
            <img className="h-[70px] w-[70px]" src={album.image[1].url} alt="" />
            <h1 className="text-2xl text-dark-600 dark:text-white ">{album.name}</h1>
            <span className="text-gray-700 dark:text-gray-500">
              <p>{album.type}</p>
            </span>
            <div className="hidden absolute bottom-0 right-4 group-hover:block opacity-25 group-hover:-translate-y-[30px] group-hover:opacity-100 transition ease-in duration-500 ">
              <PlayButton clickHandler={handleButtonClick}/>
            </div>
          </Link>
        </div>
       
      </>
    );
  }

  export default TopResultCard