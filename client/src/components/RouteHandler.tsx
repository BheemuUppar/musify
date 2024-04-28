import Home from "./Home";
import NotFound from "./NotFound";
import Signin from "./Signin";
import Signup from "./Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { HomePage } from "./Home";
import ViewAlbum from "./ViewAlbum";
import ViewPlaylist from "./ViewPlayList";
import SearchPage from "./SearchPage";
import ViewMyPlaylist from "./ViewMyPlaylist";
import CustomizedSnackbars from "./shared/Snackbar";

const routes = [
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/home",
    element: <PrivateRoute element={<Home key={"home"}/>} />,
    subroutes: [
      <Route key={1} path="" element={<HomePage />}></Route>,
      <Route  key={2} path="search" element={<SearchPage />}></Route>,
      <Route key={3}  path="album/:id" element={<ViewAlbum />}></Route>,
      <Route  key={4} path="playlist/:id" element={<ViewPlaylist />}></Route>,
      <Route  key={5} path="myPlaylist" element={<ViewMyPlaylist />}></Route>,
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

function Routehandler() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((ele) => {
            return (
              <Route  path={ele.path} key={ele.path} element={ele.element}>
                {ele.subroutes &&
                  ele.subroutes.map((sub: any) => {
                    return sub;
                  })}
              </Route>
            );
          })}
        </Routes>
        <CustomizedSnackbars />
      </BrowserRouter>
    </>
  );
}

export default Routehandler;
