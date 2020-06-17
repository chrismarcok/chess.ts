import React, { useState, useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ReactUser } from "../../../server/models/User";
import { Message } from "../../../utils/types";
import { ReactRoom } from "../../../server/models/Room";

interface PregameLobbyProps {
  socket: SocketIOClient.Socket;
  room: ReactRoom;
  user: ReactUser;
}

interface Notice extends Message {}
interface ChatMessage extends Message {}

interface ChatMessageCompProps {
  message: ChatMessage;
}

interface NoticeCompProps {
  message: Notice;
}

type ChatMessageComp = React.FC<ChatMessageCompProps>;
type NoticeComp = React.FC<NoticeCompProps>;

type MessageComp = NoticeComp | ChatMessageComp;

interface MessageCompWithMessage {
  message: Message;
  Comp: MessageComp;
}

const getCurrentTimeAsString = () => {
  return (new Date()).toLocaleString("en-US").split(", ")[1];
}

const ChatMessageComp: ChatMessageComp = ({ message }) => {
  return (
    <div className="message-container">
      <div
        style={{ backgroundImage: `url(${message.avatar})` }}
        className="avatar"
      />
      <div className="message-content">
        <strong>{message.username}</strong> <span style={{color: "#666"}}>{getCurrentTimeAsString()}</span>: {message.content}
      </div>
    </div>
  );
};

const NoticeComp: NoticeComp = ({ message }) => {
  return <div className="notice-container">{message.content}</div>;
};

export const PregameLobby: React.FC<PregameLobbyProps> = ({ socket, room, user }) => {
  const [copied, setCopied] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const initialMessage: MessageCompWithMessage = {
    Comp: NoticeComp,
    message: {
      avatar: user.avatarURL,
      content: `You have connected - ${getCurrentTimeAsString()}`,
      username: user.username,
    }
  }

  const [msgs, setMsgs] = useState<MessageCompWithMessage[]>([initialMessage]);
  const [players, setPlayers] = useState<string[]>([user.username]);

  const addMessage = (message: MessageCompWithMessage) => {
    setMsgs(prevArray => [...prevArray, message]);
  };

  const addPlayer = (username: string) => {
    setPlayers(prevPlayers => [...prevPlayers, username]);
  }

  const removePlayer = (username: string) => {
    setPlayers(prevPlayers => prevPlayers.filter(player => player !== username));
  }

  useEffect(() => {
    socket.on("user-joined", (user: ReactUser) => {
      addMessage({
        Comp: NoticeComp,
        message: {
          content: `${user.username} has connected - ${getCurrentTimeAsString()}`,
          username: user.username,
          avatar: user.avatarURL,
        },
      });

      addPlayer(user.username);
    });

    socket.on("user-disconnected", (user: ReactUser) => {
      addMessage({
        Comp: NoticeComp,
        message: {
          username: user.username,
          avatar: user.avatarURL,
          content: `${user.username} has disconnected - ${getCurrentTimeAsString()}`,
        }
      });

      removePlayer(user.username);
    });

    socket.on("send-message", (message: Message) => {
      console.log(msgs);
      addMessage({
        Comp: ChatMessageComp,
        message: message,
      })
    });

  }, []);

  return (
    <>
      <div className="pregame-lobby-container">
        <div className="player-list">
          {players.map((player, index) => {
            return <div key={index}>{player}</div>;
          })}
        </div>
        <div className="chat">
          <div className="chat-content">
            {msgs.map(({ message, Comp }, index) => {
              return <Comp message={message} key={index} />;
            })}
          </div>
          <div className="chat-input">
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.keyCode === 13 && e.shiftKey === false) {
                  e.preventDefault();
                  const msg: Message = {
                    avatar: user.avatarURL,
                    content: chatInput,
                    username: user.username,
                  }
                  addMessage({
                    Comp: ChatMessageComp,
                    message: msg,
                  });
                  socket.emit("send-message", {message: msg, room: room});
                  setChatInput("");
                }
              }}
            ></textarea>
          </div>
        </div>
      </div>
      {document.queryCommandSupported("copy") && (
        <>
          <CopyToClipboard
            text={String(window.location.href)}
            onCopy={() => {
              setCopied(true);
            }}
          >
            <div className="button-simple">Copy invite link</div>
          </CopyToClipboard>
        </>
      )}
      {copied && <p style={{ color: "red" }}>Copied.</p>}
    </>
  );
};
