import { useAuth } from "../../context/AuthContext";
import Header from "../Fragments/Header";

const MainLayouts = (props) => {
  const { children, onClick, onLogout } = props;
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-200">
      <Header user={user} onClick={onClick} onLogout={onLogout} />
      <main className="flex-1 px-6 py-4">{children}</main>
    </div>
  );
};

export default MainLayouts;
