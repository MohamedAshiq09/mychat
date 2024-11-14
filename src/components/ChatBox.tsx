// src/hooks/useSocket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

interface UseSocketReturn {
  socket: Socket | null;  // Corrected type here
  isConnected: boolean;
  error: Error | null;
}

const useSocket = (url: string): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);  // Corrected type here
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Initialize the socket connection
    const socketInstance: Socket = io(url); // Define as a Socket instance
    setSocket(socketInstance);

    // Set up event listeners
    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (err: Error) => {
      setError(err);
    });

    // Clean up the socket connection on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  return { socket, isConnected, error };
};

export default useSocket;
