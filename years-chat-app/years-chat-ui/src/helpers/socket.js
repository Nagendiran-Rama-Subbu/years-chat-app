import { io } from "socket.io-client";
import { API_END_POINT } from './constant';
export const socket = io(`${API_END_POINT}`);