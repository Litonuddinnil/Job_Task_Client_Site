import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";  
import useAuth from "../../hooks/useAuth";

const AddTasks = () => { 
  const {user} = useAuth();
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
    deadline: "",
    budget: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in first"); 
    try {
      await axios.post("https://job-task-server-site.vercel.app/tasks", {
        ...task, 
        timestamp: new Date().toISOString(),
      });
      
      toast.success("Task posted successfully!");
      setTask({ title: "", description: "", category: "To-Do", deadline: "", budget: "" });
    } catch (error) {
      toast.error("Error posting task");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  ">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold  text-center mb-4">Post a New Job Task</h2>
        
        {/* Title Input */}
        <label className="block text-gray-600 font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter task title"
          value={task.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mb-3"
        />

        {/* Description */}
        <label className="block text-gray-600 font-medium mb-1">Description</label>
        <textarea
          name="description"
          placeholder="Enter task description"
          value={task.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mb-3 h-24"
        ></textarea>

        {/* Category Dropdown */}
        <label className="block text-gray-600 font-medium mb-1">Category</label>
        <select
          name="category"
          value={task.category}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mb-3"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        {/* Deadline */}
        <label className="block text-gray-600 font-medium mb-1">Deadline</label>
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mb-3"
        />

        {/* Budget */}
        <label className="block text-gray-600 font-medium mb-1">Budget</label>
        <input
          type="number"
          name="budget"
          placeholder="Enter budget amount"
          value={task.budget}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mb-3"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg text-lg font-semibold hover:shadow-lg hover:opacity-90 transition duration-300"
        >
          Post Task
        </button>
      </form>
    </div>
  );
};

export default AddTasks;