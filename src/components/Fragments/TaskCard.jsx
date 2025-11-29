import { useEffect, useState } from "react";
import Button from "../Elements/Button/Button";
import Text from "../Elements/Text/Text";
import { CheckIcon, Pencil, Trash } from "lucide-react";
import FormatDate from "../../utils/DateFormatter";

const TaskCard = (props) => {
  const { title, description, date, onEdit, onDelete, completed, onToggle } =
    props;
  const [isCompleted, setIsCompleted] = useState(completed);

  useEffect(() => {
    setIsCompleted(completed);
  }, [completed]);

  const handleToggle = () => {
    setIsCompleted(!isCompleted);
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <div
      className={`flex items-start justify-between bg-white rounded-xl shadow-md border p-4 transition-all duration-300 cursor-pointer hover:shadow-xl ${
        isCompleted ? "opacity-60" : "opacity-100"
      }`}
    >
      <Button
        onClick={handleToggle}
        classname={`w-5 h-5 mt-1 rounded-full border-2 flex items-center justify-center ${
          isCompleted ? " border-teal-500" : "border-gray-400"
        }`}
      >
        {isCompleted && (
          <span className="text-white text-sm">
            <CheckIcon size={15} className="text-teal-500" />
          </span>
        )}
      </Button>

      <div className="flex-1 mx-3">
        <Text
          classname={`text-gray-600 text-sm ${
            isCompleted ? "line-through" : ""
          }`}
        >
          {title}
        </Text>

        <Text
          classname={`text-gray-600 text-sm ${
            isCompleted ? "line-through" : ""
          }`}
        >
          {description}
        </Text>

        <Text classname="text-gray-400 text-xs mt-1">{FormatDate(date)}</Text>
      </div>

      <div className="flex items-center gap-1">
        <Button
          onClick={onEdit}
          classname="p-2 rounded-full hover:bg-teal-100 transition"
        >
          <Pencil size={18} className="text-teal-500" />
        </Button>
        <Button
          onClick={onDelete}
          classname="p-2 rounded-full hover:bg-red-100 transition"
        >
          <Trash size={18} className="text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
