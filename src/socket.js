 
import { io } from "socket.io-client";

const socket = io("https://job-task-server-site.vercel.app", { autoConnect: false }); 
 

export default socket;
