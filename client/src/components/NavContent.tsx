import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useRecoilValue } from "recoil";
import { leftPanelWidthAtom } from "../store/otherState";

function NavContent() {
  const leftWidth = useRecoilValue(leftPanelWidthAtom);

  return (
    <>
      <div>
        <ul className="left-router-link">
          <li className={`${leftWidth.size === "small" ? "text-center" : ""} my-2`}>
            <NavLink  to="/home" >
              <HomeOutlinedIcon fontSize="large" className="text-dark-600 dark:text-white" />
              {leftWidth.size == "large" && <span className="text-dark-600 dark:text-white">Home</span>}
            </NavLink>
          </li>
          <li className={`${leftWidth.size == "small" ? "text-center" : ""} my-2`}>
            <NavLink
              to="/home/search" >
              <SearchOutlinedIcon fontSize="large" className="text-dark-600 dark:text-white" />
              {leftWidth.size == "large" && <span className="text-dark-600 dark:text-white" >Search</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
export default NavContent;
