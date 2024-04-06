import { useRecoilValue } from "recoil";
import { isAuthenticatedAtom } from "../store/authState";
import Signin from "./Signin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PrivateRoute({ element, ...props }: any) {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const navigate = useNavigate();
  useEffect(()=>{
    if (isAuthenticated == false) {
        navigate("/signup");
      }
  }, [isAuthenticated])
  return element;
}

export default PrivateRoute;
