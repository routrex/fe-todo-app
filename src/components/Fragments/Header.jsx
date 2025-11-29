import { useAuth } from "../../context/AuthContext";
import Navbar from "./Navbar";

const Header = (props) => {
  const { onLogout } = props;
  const { user } = useAuth();
  return (
    <header className="shadow-sm">
      <Navbar user={user} onLogout={onLogout} />
    </header>
  );
};

export default Header;
