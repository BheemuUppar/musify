import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRecoilState } from "recoil";
import { snackbarAtom } from "../../store/otherState";
import { useSnackbar } from "../../utils/utils";

interface CustomizedSnackbarsProps {
  severity: "error" | "warning" | "info" | "success";
  message: string;
}

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);
  const [snackbarState, setSnackbarState] = useRecoilState(snackbarAtom);
  

  React.useEffect(() => {
    if (snackbarState.severity) {
      setOpen(true);
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
