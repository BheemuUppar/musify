import { Outlet, Link } from "react-router-dom";
import logo from "./../assets/images/logo.png";

function Content() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}

function Navbar() {
  return (
    <>
      <nav className="w-full flex justify-between">
        <Link to="/home">
          <img className=" w-[20%]" src={logo} alt="musify" />
        </Link>
        <div className="navlist">
          <ul className="flex gap-3">
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/signin">Signin</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Content;
