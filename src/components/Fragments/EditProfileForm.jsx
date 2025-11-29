import { useEffect, useState } from "react";
import InputForm from "../Elements/Input";
import ProfileUpload from "./ProfileUpload";
import Button from "../Elements/Button/Button";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { SaveIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const EditProfileForm = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    email: "",
    name: "",
  });

  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setForm({
        email: user.email || "",
        name: user.name || "",
      });
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    reader.readAsDataURL(f);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/auth/update/${user.id}`, { name: form.name });

      if (file) {
        const formData = new FormData();
        formData.append("avatar", file);

        await api.put(`/auth/avatar/${user.id}`, formData);
      }

      const updatedRes = await api.get("/auth/users");
      const updatedUser = updatedRes.data;                                                                         

      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setTimeout(() => {                                                              
        toast.success("Profil berhasil diupdate");
        setLoading(false);
        navigate("/home");
      }, 2000);
    } catch {
      // console.log(err);
      toast.error("Gagal menyimpan profil!");
      setLoading(false)
    }
  };

  return (
    <div
      className={`transition-opacity duration-500 ${
        loading ? "opacity-50" : "opacity-100"
      }`}
    >
      {" "}
      <form
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-medium mb-6">Profil Saya</h2>
        <ProfileUpload
          avatar={avatar}
          name={form.name}
          onChange={handleAvatarChange}
        />

        <div className="mb-4">
          <InputForm
            label="Email"
            value={form.email}
            classname="cursor-not-allowed"
            disabled
          />
        </div>

        <div className="mb-4">
          <InputForm
            label="Nama Lengkap"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <Button
          disabled={loading}
          type="submit"
          classname="w-full bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-xl"
        >
          {loading ? (
            <div className="flex justify-center items-center gap-3">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Menyimpan...</span>
            </div>
          ) : (
            <span className="flex justify-center items-center gap-2">
              <SaveIcon size={18} /> Simpan
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default EditProfileForm;
