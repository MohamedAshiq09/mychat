import { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

interface UseSocketReturn {
  socket: Socket | null;  
  isConnected: boolean;
  error: Error | null;
}

const useSocket = (url: string): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);  
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    
    const socketInstance: Socket = io(url); 
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (err: Error) => {
      setError(err);
    });

    
    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  return { socket, isConnected, error };
};

export default useSocket;
