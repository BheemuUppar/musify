import { useRecoilValue } from "recoil";
import { isAuthenticatedAtom } from "../store/authState";
import { useNavigate } from "react-router-dom";
import CardContent from "./CardContent";
import Library from "./Library";
import Content from "./Content";
import NavContent from "./NavContent";

function Home() {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const navigate = useNavigate();

  if (isAuthenticated == false) {
    navigate("/auth/signin");
  }

  return (
    <>
      <div className="flex gap-4 text-red-50 h-[90vh] border border-red-50">
        <div className="flex flex-col gap-4">
          <CardContent><NavContent></NavContent></CardContent>
          <CardContent>
            <Library></Library>
          </CardContent>
        </div>
        <div>
          <CardContent><Content></Content></CardContent>
        </div>
      </div>
    </>
  );
}

export default Home;
