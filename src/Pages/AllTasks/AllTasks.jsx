import React from 'react'; 
import useAllTask from '../../hooks/useAllTask'; 
import { FaEdit, FaTrash } from 'react-icons/fa'; 

const AllTasks = () => {
    const [Tasks] = useAllTask();  
    const handleDelete = async (taskId) => {
       console.log(taskId)
    };

    return (
        <div className="w-11/12 mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Tasks.map((task) => (
                <div key={task._id} className="p-4 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-2xl">
                    <h4 className="text-lg font-semibold text-gray-800 truncate">{task.title}</h4>
                    <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                        <span className="font-semibold text-blue-500">{task.category}</span>
                        <span><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</span>
                        <span><strong>Budget:</strong> ${task.budget}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button className="text-blue-500 hover:text-blue-700 flex items-center">
                            <FaEdit className="mr-1" /> Edit
                        </button>
                        <button className="text-red-500 hover:text-red-700 flex items-center" onClick={() => handleDelete(task._id)}>
                            <FaTrash className="mr-1" /> Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllTasks;
