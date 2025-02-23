import { io } from "socket.io-client";

const socket = io("https://job-task-server-site.onrender.com", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});
export default socket;