import { useEffect, useState } from "react";
import Button from "../Elements/Button/Button";
import Text from "../Elements/Text/Text";
import TaskFormFields from "./TaskFormFields";
import toast from "react-hot-toast";
import api from "../../services/api";
import { X } from "lucide-react";

const AddTask = (props) => {
  const { open, onClose, onSave } = props;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [smooth, setSmooth] = useState(false);

  useEffect(() => {
    if (open) {
      setSmooth(true);
    } else {
      setTimeout(() => setSmooth(false), 250);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setTitle("");
      setDesc("");
      setDate("");
    }
  }, [open]);

  if (!open) return null;

  const handleSave = async () => {
    if (!title.trim() || !desc.trim() || !date.trim()) {
      toast.error("Harap isi semua kolom wajib!");
      return;
    }

    try {
      const payload = {
        title: title.trim(),
        description: desc,
        date: date || new Date().toISOString(),
      };

      await api.post("/todos", payload);

      toast.success("Tugas berhasil ditambahkan");

      if (onSave) onSave();
      onClose();
    } catch {
      // console.error("Gagal tambah tugas", err);
      toast.error("Gagal menyimpan tugas");
    }
  };

  if (!smooth) return null;
  return (
    <div
      className={`fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50 transition-opacity duration-300 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white w-full max-w-md rounded-xl p-6 shadow-lg mt-[50px] transition-all duration-300 ease-out ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Tambah Tugas Baru</h2>
          <Button classname="text-gray-600 text-xl" onClick={onClose}>
            <X size={17} />
          </Button>
        </div>
        <Text classname="text-gray-500 text-sm mb-4">
          Mulai catat tugas anda yang perlu diselesaikan
        </Text>

        <TaskFormFields
          title={title}
          setTitle={setTitle}
          desc={desc}
          setDesc={setDesc}
          date={date}
          setDate={setDate}
        />

        <div className="flex justify-end gap-3 mt-6">
          <Button
            onClick={onClose}
            classname="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
          >
            Batal
          </Button>
          <Button
            onClick={handleSave}
            classname="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
