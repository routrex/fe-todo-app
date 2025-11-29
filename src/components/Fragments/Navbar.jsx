import { useEffect, useRef, useState } from "react";
import Profile from "../Elements/Profile/Profile";
import CardProfile from "./CardProfile";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = (props) => {
  const {user} = useAuth()
  const { onLogout } = props;
  const [cardMenuOpen, setCardMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => setCardMenuOpen(!cardMenuOpen);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setCardMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md py-5 px-10 md:px-20 flex items-center justify-between border-b relative">
      <div className="flex items-center gap-2">
        <h1 className="text-xl md:text-2xl font-bold text-teal-600">TodoApp</h1>
      </div>

      <div className="relative" ref={menuRef}>
        <Profile name={user.name} onClick={toggleMenu} />
        {cardMenuOpen && (
          <CardProfile
            name={user.name}
            email={user.email}
            onLogout={onLogout}
            onProfileClick={() => navigate("/profile")}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
