import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";


let socket: typeof Socket | null = null; // Use `typeof Socket` as the type

const useSocket = (): typeof Socket | null => {
  const [socketInstance, setSocketInstance] = useState<typeof Socket | null>(null);

  useEffect(() => {
    socket = io() as typeof Socket;
    setSocketInstance(socket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return socketInstance;
};

export default useSocket;
