import React, { useState } from "react";
import { ReduxState } from "../../actions/types";
import { useSelector } from "react-redux";

interface PregameLobbyProps {}

interface Message {
  content: string;
  username: string;
  avatar: string;
}

interface MessageProps {
  message: Message;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="message-container">
      <div
        style={{ backgroundImage: `url(${message.avatar})` }}
        className="avatar"
      />
      <div className="message-content">
        <strong>{message.username}</strong>: {message.content}
      </div>
    </div>
  );
};

export const PregameLobby: React.FC<PregameLobbyProps> = ({}) => {
  const user = useSelector((state: ReduxState) => state.user);

  const messages: Message[] = [
    {
      avatar: "https://api.adorable.io/avatars/200/tzsdkef7ei",
      content: "text1",
      username: "user1",
    },
    {
      avatar: "https://api.adorable.io/avatars/200/tzsdkef7e3",
      content: "text2",
      username: "user2",
    },
    {
      avatar: "https://api.adorable.io/avatars/200/tzsdkef7e2",
      content: "text3",
      username: "user3",
    },
    {
      avatar: "https://api.adorable.io/avatars/200/tzsdkef7e1",
      content: "text4",
      username: "user4",
    },
  ];

  const [chatInput, setChatInput] = useState("");
  const [msgs, setMsgs] = useState(messages);

  const addMessage = (message:Message) => {
    setMsgs([
      ...msgs,
      message,
    ]);
  }

  return (
    <div className="pregame-lobby-container">
      <div className="player-list">
        {msgs.map((msg, index) => {
          return <div key={index}>{msg.username}</div>;
        })}
      </div>
      <div className="chat">
        <div className="chat-content">
          {msgs.map((msg, index) => {
            return <Message key={index} message={msg} />;
          })}
        </div>
        <div className="chat-input">
          <textarea
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13 && e.shiftKey === false){
                e.preventDefault();
                addMessage({
                  avatar: user.avatarURL,
                  content: chatInput,
                  username: user.username,
                });
                setChatInput("");
              }
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
