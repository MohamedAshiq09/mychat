// src/hooks/useSocket.ts
import { useEffect, useState } from 'react';
import io, { Socket } from "socket.io-client";

interface UseSocketReturn {
  socket: typeof Socket | null;
  isConnected: boolean;
  error: Error | null;
}

const useSocket = (url: string): UseSocketReturn => {
  const [socket, setSocket] = useState<typeof Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Initialize the socket connection
    const socketInstance = io(url);
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
