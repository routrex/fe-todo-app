import { useEffect, useRef } from "react";
import InputForm from "../Elements/Input";
import Label from "../Elements/Input/Label";

const TaskFormFields = (props) => {
  const { title, setTitle, desc, setDesc, date, setDate } = props;

   const nameRef = useRef()
  
    useEffect(() => {
      nameRef.current.focus()
    }, [])

  return (
    <div className="flex flex-col gap-4 mt-2">
      <InputForm
        label="Judul"
        name="title"
        placeholder="Misal: Jogging"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ref={nameRef}
      />

      <div className="flex flex-col gap-1">
        <Label classname="text-sm font-medium text-gray-600">
          Deskripsi
        </Label>
        <textarea
          placeholder="Tambahkan detail tentang tugas ini..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={4}
          className="w-full border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      <InputForm
        label="Tanggal"
        name="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
};

export default TaskFormFields;
