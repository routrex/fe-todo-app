import Text from "../Elements/Text/Text";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const AuthLayouts = (props) => {
  const { children, title, desc, type } = props;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-300 to-gray-200">
      <Toaster position="top-center" />
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mx-4">
        <div className="flex flex-col items-center mb-2">
          <img src={logo} alt="logo" width={60} height={60} />
        </div>
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          {title}
        </h2>
        <Text classname="text-center text-gray-500 mb-6">{desc}</Text>
        {children}
        <Text classname="text-center text-gray-500 mt-4 text-sm">
          {type === "register" ? "Sudah punya akun?" : "Belum punya akun?"}
            {" "}
          {type === "register" && (
            <Link to="/login" className="text-teal-500 hover:text-teal-600">
              Sign In
            </Link>
          )}

          {type === "login" && (
            <Link to="/register" className="text-teal-500 hover:text-teal-600">
              Sign Up
            </Link>
          )}
        </Text>
      </div>
    </div>
  );
};

export default AuthLayouts;
