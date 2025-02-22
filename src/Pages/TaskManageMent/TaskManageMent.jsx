import React, { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { io } from "socket.io-client"; 
import AddTasks from "../AddTask/AddTask";  
import useAxiosPublic from "../../hooks/useAxiosPublic"; 
import useAllUsers from "../../hooks/useAllUsers";

const socket = io("http://localhost:5000");

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);   
  const [users] = useAllUsers();
  console.log(users);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const axiosPublic = useAxiosPublic();
  const categories = ["To-Do", "In Progress", "Done"];
  const userId = users.uid;
  console.log(userId)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get("/tasks");
        setTasks(response.data);
        console.log("Tasks fetched from server:", response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    socket.on("taskAdded", (newTask) => {
      console.log("New task added via socket:", newTask);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    socket.on("taskUpdated", (updatedTask) => {
      console.log("Task updated via socket:", updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    });

    socket.on("taskDeleted", (deletedTaskId) => {
      console.log("Task deleted via socket:", deletedTaskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== deletedTaskId));
    });

    return () => {
      socket.off("taskAdded");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, []);

  // Handle Drag and Drop
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) {
      console.log("No drop target (over) found");
      return;
    }

    const draggedTaskId = active.id;
    const newCategory = over.id;

    console.log("Dragged Task ID:", draggedTaskId);
    console.log("Target Category (over.id):", newCategory);

    const updatedTasks = tasks.map((task) => {
      if (task._id === draggedTaskId) {
        console.log("Updating task category:", task._id, "New Category:", newCategory);
        return { ...task, category: newCategory };
      }
      return task;
    });

    console.log("Updated Tasks:", updatedTasks);

    setTasks(updatedTasks);

    try {
      await axiosPublic.put(`/tasks/${draggedTaskId}`, { category: newCategory });
      console.log("Task updated in database:", draggedTaskId, newCategory);
      socket.emit("taskUpdated", { _id: draggedTaskId, category: newCategory });
    } catch (error) {
      console.error("Error updating task category:", error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    console.log("Deleting task with ID:", taskId);
    try {
      await axiosPublic.delete(`/tasks/${taskId}`);
      socket.emit("taskDeleted", taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskAdded = (newTask) => {
    console.log("Task added:", newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    socket.emit("taskAdded", newTask);
    setShowForm(false);
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
        className="task-card p-4 bg-white shadow-lg rounded-lg mb-4 hover:shadow-2xl hover:scale-105"
      >
        <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
        <p className="text-sm text-gray-600 mt-2">{task.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className={`text-xs font-semibold ${task.category === "Done" ? "text-green-500" : "text-yellow-500"}`}>
            {task.category}
          </span>
          <button onClick={() => deleteTask(task._id)} className="text-red-500 mt-2 text-xs hover:underline">
            Delete
          </button>
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
    <div className="w-full mx-auto p-4">
      <div className="flex items-center justify-center">
        <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white p-2 rounded-lg mb-4">
          Add Task
        </button>
      </div>
      {showForm && <AddTasks onTaskAdded={handleTaskAdded} />}
      <h2 className="text-2xl font-bold mb-6 text-center">Task Management</h2>
      {loading ? (
        <div className="flex justify-center items-center">Loading...</div>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <DroppableCategory key={category} category={category} />
            ))}
          </div>
        </DndContext>
      )}
    </div>
  );
};

export default TaskManagement;
