import { useCallback, useEffect, useState } from "react";
import Button from "../Elements/Button/Button";
import Text from "../Elements/Text/Text";
import TaskFilter from "../Fragments/TaskFilter";
import EmptyState from "../Fragments/EmptyState";
import TaskList from "../Fragments/TaskList";
import { Plus } from "lucide-react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import AddTask from "../Fragments/AddTask";
import toast from "react-hot-toast";
import EditTask from "../Fragments/EditTask";

const HomeLayouts = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState("semua");

  const [taskCounts, setTaskCounts] = useState({
    semua: 0,
    aktif: 0,
    selesai: 0,
  });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await api.get("/todos");
      const data = res.data || [];

      setTasks(data);

      const active = data.filter((t) => !t.isCompleted).length;
      const done = data.filter((t) => t.isCompleted).length;

      setTaskCounts({
        semua: data.length,
        aktif: active,
        selesai: done,
      });
    } catch {
      // console.error("Gagal ambil tasks", err);
      toast.error("Gagal ambil tasks");
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = () => {
    setIsAddOpen(true);
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    if (task) {
      setEditTask(task);
      setIsEditOpen(true);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const task = tasks.find((t) => t._id === taskId);
      if (!task) return;

      await api.put(`/todos/${taskId}`, {
        isCompleted: !task.isCompleted,
      });

      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
        )
      );

      const updatedTasks = tasks.map((t) =>
        t._id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
      );

      const active = updatedTasks.filter((t) => !t.isCompleted).length;
      const done = updatedTasks.filter((t) => t.isCompleted).length;

      setTaskCounts({
        semua: updatedTasks.length,
        aktif: active,
        selesai: done,
      });
    } catch {
      // console.error(err);
      toast.error("Gagal update status");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      toast.success("Tugas berhasil dihapus");
      fetchTasks();
    } catch {
      // console.error(err);
      toast.error("Gagal menghapus tugas");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "aktif") return !task.isCompleted;
    if (filter === "selesai") return task.isCompleted;
    return true;
  });

  return (
    <section className="max-w-5xl mx-auto mt-8 px-4">
      <h2 className="text-3xl text-gray-600 font-bold mb-2">
        Welcome, <span className="text-teal-600">{user?.name || "User"}</span>
      </h2>

      <Text classname="text-gray-600 text-[16px] mb-6">
        Kelola daftar harianmu dengan mudah dan efisien
      </Text>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <TaskFilter active={filter} onChange={setFilter} counts={taskCounts} />
        <Button
          classname="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2.5 rounded-lg transition flex justify-center items-center"
          onClick={handleAddTask}
        >
          <Plus size={15} /> <span className="ml-1">Tambah Tugas</span>
        </Button>
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState />
      ) : (
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTask}
        />
      )}

      <AddTask
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={fetchTasks}
      />

      <EditTask
        open={isEditOpen}
        task={editTask}
        onClose={() => setIsEditOpen(false)}
        onUpdate={fetchTasks}
      />
    </section>
  );
};

export default HomeLayouts;
