import Text from "../Elements/Text/Text";
import InputForm from "../Elements/Input";
import Button from "../Elements/Button/Button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Harap isi semua kolom wajib!");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password minimal 8 karakter!");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", form);

      setTimeout(() => {
        toast.success("Register succees!, Silahkan Login");
        setLoading(false);
        navigate("/login");
      }, 5000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal mendafatar!");
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
            label="Nama Lengkap"
            name="name"
            placeholder="Masukan nama"
            value={form.name}
            onChange={handleChange}
            ref={nameRef}
          />
          <InputForm
            label="Email"
            name="email"
            type="email"
            placeholder="Masukan email"
            value={form.email}
            onChange={handleChange}
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
            "Daftar"
          )}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
