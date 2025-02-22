import React, { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import AddTasks from "../AddTask/AddTask";
import socket from "../../socket";  

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); 
  const axiosPublic = useAxiosPublic();
  const categories = ["To-Do", "In Progress", "Done"];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    socket.connect();  

    socket.on("taskAdded", (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    });

    socket.on("taskDeleted", (taskId) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    });

    return () => {
      socket.off("taskAdded");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
      socket.disconnect();
    };
  }, []);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggedTaskId = active.id;
    const newCategory = over.id;

    const updatedTasks = tasks.map((task) =>
      task._id === draggedTaskId ? { ...task, category: newCategory } : task
    );

    setTasks(updatedTasks);

    try {
      const updatedTask = updatedTasks.find((task) => task._id === draggedTaskId);
      await axiosPublic.put(`/tasks/${draggedTaskId}`, updatedTask);
      socket.emit("taskUpdated", updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    socket.emit("taskAdded", newTask);
    setShowForm(false);
  }; 
  return (
    <div className="w-full mx-auto p-4">
      <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white p-2 rounded-lg mb-4">
        Add Task
      </button>

      {showForm && <AddTasks onTaskAdded={handleTaskAdded} />}
      
      <h2 className="text-2xl font-bold mb-6 text-center">Task Management</h2>

      {loading ? (
        <div className="flex justify-center items-center">Loading...</div>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <DroppableCategory 
                key={category} 
                category={category} 
                tasks={tasks}  
              />
            ))}
          </div>
        </DndContext>
      )}

      
    </div>
  );
};

const DroppableCategory = ({ category, tasks,}) => {
  const { setNodeRef } = useDroppable({ id: category });

  return (
    <div ref={setNodeRef} className="p-4 bg-gray-200 text-black rounded-lg min-h-[300px] w-full">
      <h3 className="font-semibold mb-2 text-center">{category}</h3>
      <SortableContext items={tasks.filter((task) => task.category === category)} strategy={verticalListSortingStrategy}>
        {tasks
          .filter((task) => task.category === category)
          .map((task) => (
            <DraggableTask 
              key={task._id} 
              task={task}  
            />
          ))}
      </SortableContext>
    </div>
  );
};

const DraggableTask = ({ task, }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: task._id.toString() });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="task-card p-4 bg-white shadow-lg rounded-lg mb-4 hover:shadow-2xl hover:scale-105"
    >
      <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span className="font-semibold text-blue-500">{task.category}</span>
        <span><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</span>
        <span><strong>Budget:</strong> ${task.budget || "undefined"}</span> 
      </div>
       
    </div>
  );
};

 

export default TaskManagement;
