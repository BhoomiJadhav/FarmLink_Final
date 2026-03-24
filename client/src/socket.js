import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
  path: "/socket.io",
  autoConnect: false, // 🔑 important
});

export default socket;
