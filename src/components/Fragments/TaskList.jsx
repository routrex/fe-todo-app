import TaskCard from "./TaskCard";

const TaskList = (props) => {
  const { tasks, onEdit, onDelete, onToggle } = props;
  return (
    <div className="grid gap-4 mt-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          title={task.title}
          description={task.description}
          date={task.date}
          completed={task.isCompleted}
          onEdit={() => onEdit(task._id)}
          onDelete={() => onDelete(task._id)}
          onToggle={() => onToggle(task._id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
