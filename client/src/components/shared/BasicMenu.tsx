import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Tooltip from '@mui/material/Tooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useRecoilValue } from "recoil";
import { libraryAtom } from "../../store/otherState";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const library = useRecoilValue(libraryAtom);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getLibraryNames = () => {
    return library ? library.map((playlist: any) => {
      return playlist.name;
    }) : [];
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
      }}
    >
       <Tooltip title="Add to Your Playlist">
      <button
        className="hover:bg-transparent"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
       <AddCircleIcon/>
      </button></Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        { library && library.map((ele:any) => {
          return <MenuItem key={ele.name} onClick={handleClose}>{ele.name}</MenuItem>;
        })}
        
      </Menu>
    </div>
  );
}
