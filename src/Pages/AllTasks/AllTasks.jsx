import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAllTask from "../../hooks/useAllTask";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import socket from "../../socket";

const AllTasks = () => {
  const [Tasks, loading, refetch] = useAllTask();
  const [selectedTask, setSelectedTask] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    socket.connect();
    socket.on("taskDeleted", () => refetch());
    socket.on("taskUpdated", () => refetch());

    return () => {
      socket.off("taskDeleted");
      socket.off("taskUpdated");
    };
  }, [refetch]);

  const handleDelete = async (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/tasks/${taskId}`);
          socket.emit("taskDeleted", taskId);
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
          refetch();
        } catch (error) {
          Swal.fire("Error!", "There was an issue deleting the task.", "error");
        }
      }
    });
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    document.getElementById("my_modal_5").showModal(); // Open modal on edit
  };

  const handleSave = async () => {
    try {
      const updatedTask = selectedTask;
      await axiosPublic.put(`/task/edit/${updatedTask._id}`, updatedTask);
      socket.emit("taskUpdated", updatedTask);
      Swal.fire("Updated!", "Your task has been updated.", "success");
      refetch(); // Refetch tasks after update
      document.getElementById("my_modal_5").close(); // Close modal
    } catch (error) {
      Swal.fire("Error!", "There was an issue updating the task.", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedTask((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <div className="w-11/12 mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Tasks.map((task) => (
          <div
            key={task._id}
            className="p-4 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-2xl"
          >
            <h4 className="text-lg font-semibold text-gray-800 truncate">
              {task.title}
            </h4>
            <p className="text-sm text-gray-600 mt-2">{task.description}</p>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <span>{task.category}</span>
              <span>
                <strong>Budget:</strong> ${task.budget}
              </span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handleEdit(task)}
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700 flex items-center"
                onClick={() => handleDelete(task._id)}
              >
                <FaTrash className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for editing a task using dialog */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Task</h3>
          <input
            type="text"
            name="title"
            value={selectedTask?.title || ""}
            onChange={handleInputChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded"
            placeholder="Task Title"
          />
          <textarea
            name="description"
            value={selectedTask?.description || ""}
            onChange={handleInputChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded"
            placeholder="Task Description"
          />
         <select
                name="category"
                value={selectedTask?.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mb-3"
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
          <input
            type="number"
            name="budget"
            value={selectedTask?.budget || ""}
            onChange={handleInputChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded"
            placeholder="Budget"
          />
          <div className="modal-action">
            <button
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn"
            >
              Close
            </button>
            <button onClick={handleSave} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllTasks;   