// pages/index.tsx
// import { useState, useEffect } from "react";
// import useSocket from "@/hooks/usesocket";

// interface Message {
//   user: string;
//   text: string;
// }

// export default function Home() {
//   const socket = useSocket();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [message, setMessage] = useState<string>("");
//   const [username, setUsername] = useState<string>("");

//   useEffect(() => {
//     if (!socket) return;

//     // Listen for incoming messages
//     socket.on("chat-message", (newMessage: Message) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     return () => {
//       socket.off("chat-message");
//     };
//   }, [socket]);

//   const sendMessage = () => {
//     if (socket && message && username) {
//       const newMessage = { user: username, text: message };
//       socket.emit("chat-message", newMessage);
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setMessage("");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Real-time Chat</h1>

//       {username ? (
//         <>
//           <div style={{ marginBottom: "20px" }}>
//             {messages.map((msg, idx) => (
//               <p key={idx}>
//                 <strong>{msg.user}: </strong>{msg.text}
//               </p>
//             ))}
//           </div>

//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             style={{ marginRight: "10px" }}
//           />
//           <button onClick={sendMessage}>Send</button>
//         </>
//       ) : (
//         <>
//           <input
//             type="text"
//             placeholder="Enter your name"
//             onChange={(e) => setUsername(e.target.value)}
//             style={{ marginRight: "10px" }}
//           />
//           <button onClick={() => setUsername(username)}>Join Chat</button>
//         </>
//       )}
//     </div>
//   );
// }
// pages/index.tsx
import { useState, useEffect } from "react";
import useSocket from "@/hooks/usesocket";
import MessageList from "@/components/MessageList";
import ChatInput from "@/components/ChatInput";

interface Message {
  user: string;
  text: string;
}

export default function Home() {
  const socket = useSocket("http://localhost:3000"); // Pass the server URL here
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
}
