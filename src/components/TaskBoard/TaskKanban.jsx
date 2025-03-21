// const TaskKanban = () => {
//     return (
//         <div className="grid grid-cols-4 gap-4">
//             <div className="bg-blue-100 p-4 rounded shadow">
//                 <h3 className="font-semibold mb-2">Assigned</h3>
//                 <p className="text-sm text-gray-500">[Tasks will go here]</p>
//             </div>
//             <div className="bg-gray-100 p-4 rounded shadow">
//                 <h3 className="font-semibold mb-2">Pending</h3>
//                 <p className="text-sm text-gray-500">[Tasks will go here]</p>
//             </div>
//             <div className="bg-yellow-100 p-4 rounded shadow">
//                 <h3 className="font-semibold mb-2">In Progress</h3>
//                 <p className="text-sm text-gray-500">[Tasks will go here]</p>
//             </div>
//             <div className="bg-green-100 p-4 rounded shadow">
//                 <h3 className="font-semibold mb-2">Completed</h3>
//                 <p className="text-sm text-gray-500">[Tasks will go here]</p>
//             </div>
//         </div>
//     );
// };

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";

const initialTasks = {
  pending: [
    { id: "1", title: "Fix login bug", assignee: "user", date: "2025-03-20" },
    { id: "2", title: "Set up DB", assignee: "manager", date: "2025-03-21" },
  ],
  progress: [],
  completed: [],
};

const TaskKanban = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceList = Array.from(tasks[source.droppableId]);
    const [movedTask] = sourceList.splice(source.index, 1);
    const destinationList = Array.from(tasks[destination.droppableId]);
    destinationList.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    });
  };

  const handleSaveTask = (newTask) => {
    const newId = Date.now().toString();
    const task = { ...newTask, id: newId };
    setTasks((prev) => ({
      ...prev,
      pending: [...prev.pending, task],
    }));
  };

  return (
    <div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
        >
          + Create New Task
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["pending", "progress", "completed"].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 p-4 rounded shadow min-h-[200px]"
                >
                  <h3 className="font-semibold mb-2 capitalize">{status}</h3>
                  {tasks[status].map((task, index) => (
                    <Draggable
                      draggableId={task.id}
                      index={index}
                      key={task.id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskItem task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default TaskKanban;
