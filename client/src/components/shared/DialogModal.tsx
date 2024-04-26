import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from '@mui/icons-material/Add';

function DialogModal({icon,title, children, confirmHandler, NoClickHandler, clickHandler, playlistId , className}:any) {
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
    <button className={className} onClick={handleClickOpen}>
      {icon}
    </button>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
     
    >
      <DialogTitle id="alert-dialog-title"  style={{color: 'white', background: '#121212'}}>
       {title}
      </DialogTitle>
      <DialogContent style={{color: 'white', background: '#121212'}} >
        <DialogContentText id="alert-dialog-description" style={{color: 'white', background: '#121212'}}>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions  style={{color: 'white', background: '#121212'}}>
        <Button 
        onClick={(e)=>{
          e.preventDefault();
          e.stopPropagation()
          handleClose();
          NoClickHandler()
        }}
        >Disagree</Button>
        <Button
        onClick={()=>{
          handleClose();
          if(playlistId){
            confirmHandler(playlistId)
          }else{
            confirmHandler()
          }
        }} autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  </>;
}

export default DialogModal;
