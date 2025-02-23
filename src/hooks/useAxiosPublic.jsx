import axios from 'axios'; 
const axiosPublic = axios.create({
    baseURL:'https://job-task-server-site.onrender.com',
    headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;