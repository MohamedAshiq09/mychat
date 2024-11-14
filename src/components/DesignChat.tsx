// src/components/DesignChat.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface Message {
  user: string;
  text: string;
}

interface DesignChatProps {
  messages: Message[];
  sendMessage: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
}

const DesignChat: React.FC<DesignChatProps> = ({ messages, sendMessage, setMessage, message }) => {
  return (
    <div className="design-chat">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.user === 'user' ? 'user' : 'other'}`}>
            <div className="avatar">
              <FontAwesomeIcon icon={faUserCircle} />
            </div>
            <div className="message-content">
              <div className="sender">{msg.user}</div>
              <div className="text">{msg.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default DesignChat;
