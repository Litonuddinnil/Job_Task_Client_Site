import React, { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const TaskManageMent = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const axiosPublic = useAxiosPublic();
  const categories = ["To-Do", "In Progress", "Done"];

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axiosPublic.get("/tasks");
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (over) {
      const updatedTasks = [...tasks];
      const draggedTask = updatedTasks.find((task) => task._id === active.id);
      if (draggedTask) {
        draggedTask.category = over.id;
        setTasks(updatedTasks);
        await axiosPublic.put(`/tasks/${draggedTask._id}`, draggedTask);
      }
    }
  };

  const DraggableTask = ({ task }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: task._id.toString(),
    });

    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="task-card p-4 bg-white shadow-lg rounded-lg mb-4 transition-all duration-300 hover:shadow-2xl hover:scale-105"
      >
        <h4 className="text-lg font-semibold text-gray-800 truncate">{task.title}</h4>
        <p className="text-sm text-gray-600 mt-2">{task.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className={`text-xs font-semibold ${task.category === "Done" ? "text-green-500" : task.category === "To-Do" ? "text-yellow-500" : "text-red-600"}`}>
            {task.category}
          </span>
          <span className="text-xs text-gray-500">
            <strong>Deadline:</strong> {task.deadline}
          </span>
          <span className="text-xs text-gray-500">
            <strong>Budget:</strong> ${task.budget}
          </span>
        </div>
      </div>
    );
  };

  const DroppableCategory = ({ category }) => {
    const { setNodeRef } = useDroppable({ id: category });

    return (
      <div ref={setNodeRef} className="p-4 bg-gray-200 text-black rounded-lg min-h-[300px] w-full">
        <h3 className="font-semibold mb-2 text-center">{category}</h3>
        <SortableContext items={tasks.filter((task) => task.category === category)} strategy={verticalListSortingStrategy}>
          {tasks.filter((task) => task.category === category).map((task) => (
            <DraggableTask key={task._id} task={task} />
          ))}
        </SortableContext>
      </div>
    );
  };

  return (
    <div className="w-11/12 mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Task Management</h2>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <DroppableCategory key={category} category={category} />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default TaskManageMent;
