// src/components/SocketComponent.tsx
import React, { useEffect } from 'react';
import { useSocket } from 'some-socket-library'; // Adjust with the actual socket library you're using

const SocketComponent = () => {
  const { socket, isConnected, error } = useSocket({
    url: 'your-socket-url'
  });

  useEffect(() => {
    if (socket) {
      socket.on('message', (data) => {
        console.log(data);
      });
    }
  }, [socket]);

  return (
    <div>
      <p>Connection status: {isConnected ? 'Connected' : 'Disconnected'}</p>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default SocketComponent;
