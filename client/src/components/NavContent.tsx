import { Link } from "react-router-dom";
function NavContent() {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/home/search">Search</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
export default NavContent;
