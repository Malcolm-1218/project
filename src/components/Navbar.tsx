import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
// login
export const Navbar = () => {
  const [user] = useAuthState(auth);
  const signOutWithGoogle = async () => {
    await signOut(auth);
  };
  return (
    <div className="navbar">
      <div className="links">
        <Link to={"/"}>Home</Link>
        {!user ? (
          <Link to={"/login"}>Login</Link>
        ) : (
          <Link to={"/createpost"}>Create Posts</Link>
        )}
      </div>
      <div className="user">
        {user && (
          <>
            <p> {user?.displayName}</p>
            <img src={user?.photoURL || ""} alt="user" width="30" height="30" />
            <button onClick={signOutWithGoogle}>Sign out</button>
          </>
        )}
      </div>
    </div>
  );
};
