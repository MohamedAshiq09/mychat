// pages/index.tsx
import { useState, useEffect } from "react";
import useSocket from "@/hooks/usesocket";
import MessageList from "@/components/MessageList";
import ChatInput from "@/components/ChatInput";
import { GetServerSideProps } from "next";


interface Data {
  name: string;
  description: string;
}

interface Message {
  user: string;
  text: string;
}

interface HomeProps {
  data: Data;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  
  return {
    props: { data },
  };
};

const Home: React.FC<HomeProps> = ({ data }) => {
  const socket = useSocket("http://localhost:3000"); 
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    socket.on("chat-message", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, [socket]);

  const sendMessage = () => {
    if (socket && message && username) {
      const newMessage = { user: username, text: message };
      socket.emit("chat-message", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Real-time Chat</h1>
      <h2>Data from server:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      {username ? (
        <>
          <MessageList messages={messages} />
          <ChatInput
            message={message}
            setMessage={setMessage}
            onSendMessage={sendMessage}
          />
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <button onClick={() => setUsername(username)}>Join Chat</button>
        </>
      )}
    </div>
  );
};

export default Home;
