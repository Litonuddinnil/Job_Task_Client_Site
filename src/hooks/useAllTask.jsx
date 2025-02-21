import { useQuery } from "@tanstack/react-query";  
import useAxiosPublic from "./useAxiosPublic";
 

const useAllTask = () => {
    const axiosPublic = useAxiosPublic();
    const {data: Tasks = [],isPending:loading,refetch} = useQuery({
        queryKey:['Task',],
        queryFn: async ()=>{
        const res = await axiosPublic.get(`/tasks`); 
        console.log(res.data);
        return res.data;
        }
    })
    return [Tasks,loading,refetch];
};

export default useAllTask;