import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isAuthenticatedAtom } from "../store/authState";
import { searchModeAtom, searchTextAtom } from "../store/otherState";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Content() {
  return (
    <div className="flex flex-col h-full rounded">
      <Navbar></Navbar>
      <div className="grow " style={{ overflowY: "auto" }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

function Navbar() {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const navigate = useNavigate();
  const currentRoute = useLocation();
  console.log(currentRoute.pathname);
  return (
    <>
      <nav className="w-full flex justify-between">
        <div className="flex">
          {/* <Link to="/home">
            <img className=" w-[20%]" src={logo} alt="musify" />
          </Link> */}
          <span  className="p-1 mx-1 rounded-full bg-black-900">
            <button disabled={history.state.idx == 0} className="disabled:opacity-75 disabled:cursor-not-allowed"  onClick={() => {
              history.back();
            }}><ArrowBackIosNewOutlinedIcon/></button>
          </span>
          <span className="p-1 mx-1 rounded-full bg-black-900"  >
            <button disabled={history.length == history.state.idx} className="disabled:opacity-75 disabled:cursor-not-allowed" onClick={() => {
              history.forward();  
            }}><ArrowForwardIosIcon/></button>
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
                <button
                  onClick={function () {
                    localStorage.clear();
                    navigate("/signin");
                  }}
                  type="button"
                >
                  Signout
                </button>
              </li>
            )}
          </ul>
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
          className="p-2 bg-transparent border rounded-[30px]"
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
