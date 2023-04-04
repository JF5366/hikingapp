import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  
  const logout = () => {
    localStorage.removeItem("token")
    setUser({})
  };

  return (
    <ul className="user-auth navbar">
      {user ? 
        <>
          <li>Welcome {user}!</li>
          <li className="trails-nav">
            <Link to="/trails">Trails</Link>
          </li>
          <li className="map-nav">
            <Link to="/map">Map</Link>
          </li>
          <li onClick={logout}>
            <Link to="/login">Logout</Link>
          </li>
        </>
       : 
        <>
          <li className="trails-nav">
            <Link to="/trails">Trails</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      }
    </ul>
  );
}

export default Navbar;
