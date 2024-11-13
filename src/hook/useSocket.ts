import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  error: Error | null;
}

interface UseSocketOptions {
  url?: string;
  options?: {
    reconnection?: boolean;
    reconnectionAttempts?: number;
    timeout?: number;
    [key: string]: any;
  };
}

const useSocket = (
  { url = process.env.NEXT_PUBLIC_SOCKET_URL || '', options = {} }: UseSocketOptions = {}
): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let socketInstance: Socket;

    try {
      socketInstance = io(url, {
        reconnection: true,
        reconnectionAttempts: 5,
        timeout: 10000,
        ...options,
      });

      socketInstance.on('connect', () => {
        setIsConnected(true);
        setError(null);
      });

      socketInstance.on('disconnect', () => {
        setIsConnected(false);
      });

      socketInstance.on('connect_error', (err) => {
        setError(err instanceof Error ? err : new Error('Connection error'));
        setIsConnected(false);
      });

      setSocket(socketInstance);

      return () => {
        if (socketInstance) {
          socketInstance.removeAllListeners();
          socketInstance.close();
          setSocket(null);
          setIsConnected(false);
          setError(null);
        }
      };
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create socket connection'));
      return () => {}; // Empty cleanup if socket creation fails
    }
  }, [url, JSON.stringify(options)]);

  return { socket, isConnected, error };
};

export default useSocket;