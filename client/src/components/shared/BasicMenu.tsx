import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { libraryAtom, snackbarAtom } from "../../store/otherState";
import { addSongtoLibrary, getLibrary } from "../../utils/apiutils";

export default function BasicMenu({ songId }: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const library = useRecoilValue(libraryAtom);
  const setLibrary = useSetRecoilState(libraryAtom);
  const open = Boolean(anchorEl);
  const setSnackbarState = useSetRecoilState(snackbarAtom);

  const  showNotification = function (props:{severity:string, message:string}){
    setSnackbarState(props)
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function addSongtoLibraryHandler(id: string, songId: any) {
  try{
    await  addSongtoLibrary(id , songId);
    getLibrary().then((data: any) => {
      showNotification({severity:'success', message:"song added to your playlist"})
     setLibrary(data);
   });
  }catch(error:any){
    showNotification({severity:'error', message:error.response.data.message})
  }

  }
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <Tooltip title="Add to Your Playlist">
        <button
          className="hover:bg-transparent text-dark-600 dark:text-white"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <AddCircleIcon className="text-dark-600 dark:text-white" />
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
