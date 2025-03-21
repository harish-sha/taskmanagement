const TaskItem = ({ task }) => {
    return (
      <div className="bg-white p-3 rounded shadow mb-2">
        <h4 className="font-medium">{task.title}</h4>
        <p className="text-xs text-gray-500">{task.assignee} - {task.date}</p>
      </div>
    );
  };
  
  export default TaskItem;