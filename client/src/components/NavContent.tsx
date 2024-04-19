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
          <li className={`${leftWidth.size === "small" ? "text-center" : ""} `}>
            <NavLink  to="/home" >
              <HomeOutlinedIcon fontSize="large" />
              {leftWidth.size == "large" && <span className="">Home</span>}
            </NavLink>
          </li>
          <li className={`${leftWidth.size == "small" ? "text-center" : ""}`}>
            <NavLink
              to="/home/search" >
              <SearchOutlinedIcon fontSize="large" />
              {leftWidth.size == "large" && <span>Search</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
export default NavContent;
