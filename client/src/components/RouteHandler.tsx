import Home from "./Home";
import NotFound from "./NotFound";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import { BrowserRouter, Navigate, redirect, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { HomePage } from "./Home";
import ViewAlbum from "./Main/ViewAlbum";
import ViewPlaylist from "./Main/ViewPlayList";
import SearchPage from "./Main/SearchPage";
import ViewMyPlaylist from "./Main/ViewMyPlaylist";
import CustomizedSnackbars from "./shared/Snackbar";
import ViewCollaborationPlaylist from "./shared/ViewCollaborationPlaylist";

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
      <Route  key={6} path="collabPlaylist" element={<ViewCollaborationPlaylist />}></Route>,
    ],
  },
  {
    path: "*",
    element: <Navigate to="/home" replace />,
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
