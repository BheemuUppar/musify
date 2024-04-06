import Home from "./Home";
import NotFound from "./NotFound";
import Signin from "./Signin";
import Signup from "./Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

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
         {
            routes.map((ele)=><Route path={ele.path} key={ele.path} element={ele.element} />)
         }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routehandler;
