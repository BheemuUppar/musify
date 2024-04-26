import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from '@mui/icons-material/Add';

function DialogModal({icon,title, children, confirmHandler, NoClickHandler, clickHandler, playlistId}:any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <>
    <button  onClick={handleClickOpen}>
      {icon}
    </button>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
       {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {/* Do You want to make this Playlist as collaborative.
          By clicking on Agree others able to modify the playlist */}
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e)=>{
          e.preventDefault();
          e.stopPropagation()
          handleClose();
          NoClickHandler()
        }}>Disagree</Button>
        <Button onClick={()=>{
          handleClose();
          if(playlistId){
            confirmHandler(playlistId)
          }else{
            confirmHandler()
          }
        }} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  </>;
}

export default DialogModal;
