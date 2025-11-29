import { LogOut, User } from "lucide-react";
import Button from "../Elements/Button/Button";
import Text from "../Elements/Text/Text";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CardProfile = (props) => {
  const { name, email, onProfileClick } = props;
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowConfirm(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTimeout(() => {
      toast.success("Logout succees! Sampai jumpa lagi");
    }, 500);

    navigate("/login");
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border p-3 text-sm">
      <div className="pb-2 border-b">
        <Text classname="font-semibold text-gray-800">{name}</Text>
        <Text classname="text-gray-500 text-xs">{email}</Text>
      </div>

      <div className="flex flex-col mt-2">
        <Button
          onClick={onProfileClick}
          classname="flex items-center gap-2 px-2 py-1 hover:bg-teal-400 hover:text-white rounded-md transition"
        >
          <User size={16} />
          <p className="font-light">Profil</p>
        </Button>
        <Button
          onClick={handleLogoutClick}
          classname="flex items-center gap-2 px-2 py-1 hover:bg-red-500 hover:text-white rounded-md transition"
        >
          <LogOut size={16} />
          <p className="font-light" onClick={handleLogoutClick}>
            Logout
          </p>
        </Button>
      </div>
      {showConfirm && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[999]
        transition-opacity duration-300 ${
          showConfirm ? "opacity-100" : "opacity-0"
        }`}
        >
          <div
            className={` bg-white p-6 rounded-xl shadow-xl w-80 text-center transform
        transition-all duration-300 ${
          showConfirm ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Konfirmasi Logout
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              Apakah anda yakin ingin keluar?
            </p>
            <div className="flex justify-center gap-3">
              <Button
                onClick={handleCancel}
                classname="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
              >
                Batal
              </Button>
              <Button
                onClick={handleConfirmLogout}
                classname="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition"
              >
                Ya
              </Button>
            </div>
            ;
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProfile;
