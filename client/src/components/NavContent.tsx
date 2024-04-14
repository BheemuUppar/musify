import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function NavContent() {
  return (
    <>
      <div>
        <ul>
          <li>
            <NavLink to="/home" ><HomeOutlinedIcon/> <span className="md:inline-block hidden">Home</span></NavLink>
          </li>
          <li>
            <NavLink to="/home/search"  ><SearchOutlinedIcon/> <span className="md:inline-block hidden">Search</span></NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
export default NavContent;
