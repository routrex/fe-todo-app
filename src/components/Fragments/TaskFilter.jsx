import Button from "../Elements/Button/Button";

const TaskFilter = (props) => {
  const { active, onChange, counts } = props;
  const filters = [
    { key: "semua", label: "Semua" },
    { key: "aktif", label: "Aktif" },
    { key: "selesai", label: "Selesai" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((e) => (
        <Button
          key={e.key}
          onClick={() => onChange(e.key)}
          classname={`px-4 py-1.5 rounded-lg border transition ${
            active === e.key
              ? "bg-teal-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span className="align-middle">{e.label}</span>

          <span
            className={`ml-1 text-xs align-middle ${
              active === e.key ? "text-teal-100" : "text-gray-500"
            }`}
          >
            ({counts[e.key] || 0})
          </span>
        </Button>
      ))}
    </div>
  );
};

export default TaskFilter;
