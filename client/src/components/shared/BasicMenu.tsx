import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { libraryAtom } from "../../store/otherState";
import { addSongtoLibrary, getLibrary } from "../../utils/apiutils";

export default function BasicMenu({ songId }: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const library = useRecoilValue(libraryAtom);
  const setLibrary = useSetRecoilState(libraryAtom);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function addSongtoLibraryHandler(id: string, songId: any) {
   await  addSongtoLibrary(id , songId);
   getLibrary().then((data: any) => {
    setLibrary(data);
  });

  }
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
          <AddCircleIcon />
        </button>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {library &&
          library.map((ele: any) => {
            return (
              <MenuItem
                onClickCapture={(e: any) => {
                  addSongtoLibraryHandler(ele._id , songId)
                }}
                key={ele.name}
                onClick={handleClose}
              >
                {ele.name}
              </MenuItem>
            );
          })}
      </Menu>
    </div>
  );
}
