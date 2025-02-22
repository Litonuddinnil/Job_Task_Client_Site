import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { io } from 'socket.io-client';  
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const axiosPublic = useAxiosPublic();
    const socket = io('http://localhost:5173/tasks'); 

    // Fetch tasks initially
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axiosPublic.get('/tasks');
            setTasks(response.data);
        };
        fetchTasks();

        // Listen for real-time updates
        socket.on('taskAdded', (newTask) => {
            setTasks((prevTasks) => [...prevTasks, newTask]);  
        });

        socket.on('taskList', (taskList) => {
            setTasks(taskList);  
        });

        return () => {
            socket.off('taskAdded');
            socket.off('taskList');
        };
    }, [socket]);
    const handlerEdit =(task)=>{
        console.log(task)
    }
    const handleDelete = async (taskId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this task!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Delete task and inform other clients via WebSocket
                    await axiosPublic.delete(`/tasks/${taskId}`);
                    Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
                    socket.emit('taskDeleted', taskId); // Emit task deletion event
                } catch (error) {
                    Swal.fire('Error!', 'There was an issue deleting the task.', 'error');
                }
            }
        });
    };

    return (
        <div className="w-11/12 mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tasks.map((task) => (
                <div key={task._id} className="p-4 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-2xl">
                    <h4 className="text-lg font-semibold text-gray-800 truncate">{task.title}</h4>
                    <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                        <span className="font-semibold text-blue-500">{task.category}</span>
                        <span><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</span>
                        <span><strong>Budget:</strong> ${task.budget}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button onClick={()=>handlerEdit(task)} className="text-blue-500 hover:text-blue-700 flex items-center">
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
