import InputForm from "../Elements/Input";
import Button from "../Elements/Button/Button";
import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Email dan password wajib diisi!");
      return;
    }

     if (!form.email) {
      toast.error("Email tidak ditemukan!");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);

      setTimeout(() => {
        toast.success("yeayh, login succees!");
        setLoading(false);
        navigate("/home");
      }, 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Email dan password tidak cocok!"
      );
      setLoading(false);
    }
  };

  const nameRef = useRef()
  
    useEffect(() => {
      nameRef.current.focus()
    }, [])

  return (
    <div
      className={`transition-opacity duration-500 ${
        loading ? "opacity-50" : "opacity-100"
      }`}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <InputForm
            label="Email"
            name="email"
            type="email"
            placeholder="Masukan email"
            value={form.email}
            onChange={handleChange}
            ref={nameRef}
          />
          <InputForm
            label="Password"
            name="password"
            type="password"
            placeholder="Masukan password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          classname="w-full mt-6 bg-teal-500 text-white py-3 px-2 rounded-lg hover:bg-teal-600 transition"
        >
          {loading ? (
            <div className="flex justify-center items-center gap-3">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Please wait...</span>
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
