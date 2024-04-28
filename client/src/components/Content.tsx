import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { isAuthenticatedAtom } from "../store/authState";
import { searchModeAtom, searchTextAtom, snackbarAtom } from "../store/otherState";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { audioStateAtom, currentSongAtom, currentSongsListAtom } from "../store/SongState";
import Footer from './Footer';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import LightModeIcon from '@mui/icons-material/LightMode';
import Tooltip from '@mui/material/Tooltip'
function Content() {
  return (
    <div className="flex flex-col h-full rounded">
      <Navbar></Navbar>
      <div className="grow " style={{ overflowY: "auto" }}>
        <Outlet></Outlet>
      <Footer/>
      </div>
    </div>
  );
}

function Navbar() {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const navigate = useNavigate();
  const currentRoute = useLocation();
  const resetPlaylist = useResetRecoilState(currentSongsListAtom);
  const resetCurrentSong = useResetRecoilState(currentSongAtom);
  const resetAuth = useResetRecoilState(isAuthenticatedAtom);
  const resetAudio = useResetRecoilState(audioStateAtom);
  const setSnackbarState = useSetRecoilState(snackbarAtom);

  const  showNotification = function (props:{severity:string, message:string}){
    setSnackbarState(props)
  }

const toggleTheme = ()=>{
  document.documentElement.classList.toggle('dark');
  // document.documentElement.classList.toggle('white');
}

  return (
    <>
      <nav className="w-full flex justify-between py-2">
        <div className="flex">
          {/* <Link to="/home">
            <img className=" w-[20%]" src={logo} alt="musify" />
          </Link> */}
          <span  className="p-1 mx-1 rounded-full dark:bg-black-900 bg-gray-400 h-[35px] w-[35]">
            <button disabled={history.state.idx == 0} className="disabled:opacity-75 disabled:cursor-not-allowed "  onClick={() => {
              history.back();
            }}><ArrowBackIosNewOutlinedIcon className="text-dark-600 dark:text-white"/></button>
          </span>
          <span className="p-1 mx-1 rounded-full dark:bg-black-900 bg-gray-400  h-[35px] w-[35]"  >
            <button disabled={history.length == history.state.idx} className="disabled:opacity-75 disabled:cursor-not-allowed" onClick={() => {
              history.forward();  
            }}><ArrowForwardIosIcon className="text-dark-600 dark:text-white"/></button>
          </span>
          {currentRoute.pathname == "/home/search" && <SearchBox />}
        </div>
        <div className="navlist grow flex justify-end">
          <ul className="flex gap-3">
            {isAuthenticated == false && (
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            )}
            {isAuthenticated == false && (
              <li>
                <Link to="/signin">Signin</Link>
              </li>
            )}
            {isAuthenticated == true && (
              <li>
                <Tooltip title="logout">
                <button
                  onClick={async function () {
                    showNotification({severity:'success', message:"logged out successfully"})
                    localStorage.clear();
                    await  resetPlaylist()
                    await resetCurrentSong() 
                    await  resetAuth() 
                    await resetAudio() 
                    navigate("/signin");
                  }}
                  type="button"
                >
                <PowerSettingsNewIcon className="text-dark-600 dark:text-white"/>
                </button>
                </Tooltip>
              </li>
            )}
          </ul>
          <button type="button" className="text-dark-500 dark:text-white pb-3 mx-3" onClick={toggleTheme}>
           <Tooltip title="change theme">
             <LightModeIcon />
           </Tooltip>
          </button>
        </div>

      </nav>
    </>
  );
}

function SearchBox() {
  const setSearchText = useSetRecoilState(searchTextAtom);
  const setSearchMode = useSetRecoilState(searchModeAtom);
  let timer: any;
  return (
    <>
      <div>
        <input
          className="p-2 bg-transparent border border-dark-600 text-dark-600 dark:text-white rounded-[30px] w-full"
          type="text"
          placeholder="What do you want to play? "
          onInput={(e: any) => {
            if (timer) {
              clearTimeout(timer);
            }
            timer = setTimeout(() => {
              setSearchMode(true);
              setSearchText(e.target.value);
            }, 300);
          }}
        />
      </div>
    </>
  );
}

export default Content;
