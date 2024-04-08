import { useRecoilValue } from "recoil";
import { isAuthenticatedAtom } from "../store/authState";
import { useNavigate } from "react-router-dom";

function Home(){
    const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
    const navigate = useNavigate();

    if(isAuthenticated == false){
            navigate("/auth/signin")
    }
    
    return (
        <>
        Home
        </>
    )
}

export default Home;