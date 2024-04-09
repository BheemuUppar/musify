import Home from "./Home";
import NotFound from "./NotFound";
import Signin from "./Signin";
import Signup from "./Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Search from "./Search";
import { HomePage } from "./Home";
import ViewAlbum from "./ViewAlbum";

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
    element: <PrivateRoute element={<Home />} />,
    subroutes: [
      <Route path="" element={<HomePage />}></Route>,
      <Route path="search" element={<Search />}></Route>,
      <Route path="album/:id" element={<ViewAlbum />}></Route>,
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
      </BrowserRouter>
    </>
  );
}

export default Routehandler;
