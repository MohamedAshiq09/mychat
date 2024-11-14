import React from "react";

interface ChatInputProps {
  message: string;
  setMessage: (value: string) => void;
  onSendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ message, setMessage, onSendMessage }) => (
  <div>
    <input
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      style={{ marginRight: "10px" }}
    />
    <button onClick={onSendMessage}>Send</button>
  </div>
);

export default ChatInput;
