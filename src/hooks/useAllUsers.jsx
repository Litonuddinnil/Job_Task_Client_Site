import { useQuery } from "@tanstack/react-query";   
import useAxiosPublic from "./useAxiosPublic";
 

const useAllUsers = () => {
    const axiosPublic = useAxiosPublic();
    const {data: users = [],isPending:loading,refetch} = useQuery({
        queryKey:['users',],
        queryFn: async ()=>{
        const res = await axiosPublic.get(`/users`); 
        console.log(res.data);
        return res.data;
        }
    })
    return [users,loading,refetch];
};

export default useAllUsers;