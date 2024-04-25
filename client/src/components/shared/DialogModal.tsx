import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from '@mui/icons-material/Add';

function DialogModal({clickHandler}:any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <>
    <Button  onClick={handleClickOpen}>
      <AddIcon></AddIcon>
    </Button>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
       make this playlist collaborative
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do You want to make this Playlist as collaborative.
          By clicking on Agree others able to modify the playlist
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{
          handleClose();
          clickHandler(false)
        }}>Disagree</Button>
        <Button onClick={()=>{
          handleClose();
          clickHandler(true)
        }} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  </>;
}

export default DialogModal;
