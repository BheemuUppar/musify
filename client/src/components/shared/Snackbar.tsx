import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRecoilState } from "recoil";
import { snackbarAtom } from "../../store/otherState";
import { useNavigate } from "react-router-dom";

// interface CustomizedSnackbarsProps {
//   severity: "error" | "warning" | "info" | "success";
//   message: string;
// }

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);
  const [snackbarState, setSnackbarState] = useRecoilState(snackbarAtom);
  const navigate = useNavigate()
  

  React.useEffect(() => {
    if (snackbarState.severity) {
      setOpen(true);
    }
    if(snackbarState.message == 'token missign' || snackbarState.message == 'Token has expired' || snackbarState.message == 'Invalid token' ){
      localStorage.clear();
      navigate('/signup')
    }
  }, [snackbarState]);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = function (event: any, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setSnackbarState({severity:null, message:null});
  };

  return (
    <div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      {snackbarState.severity && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackbarState.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>}
    </div>
  );
}
