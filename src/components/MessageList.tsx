import React from "react";

interface Message {
  user: string;
  text: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => (
  <div style={{ marginBottom: "20px" }}>
    {messages.map((msg, idx) => (
      <p key={idx}>
        <strong>{msg.user}: </strong>
        {msg.text}
      </p>
    ))}
  </div>
);

export default MessageList;
