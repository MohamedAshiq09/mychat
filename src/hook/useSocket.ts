// hooks/useSocket.ts
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket;

const useSocket = () => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    // Connect to the server
    socket = io();
    setSocketInstance(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return socketInstance;
};

export default useSocket;
