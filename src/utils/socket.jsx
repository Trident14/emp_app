// src/utils/socket.js
import { io } from "socket.io-client";

// Connect to the backend server
export const socket = io("http://localhost:4080"); // Replace with your server URL
