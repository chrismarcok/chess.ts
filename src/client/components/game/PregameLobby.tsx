import React, { useState, useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ReactUser } from "../../../server/models/User";
import { Message } from "../../../utils/types";
import { ReactRoom } from "../../../server/models/Room";
import { SYSTEM_AVATAR } from "../../actions/constants";
import Toast from "../../../utils/toasts";
import Axios, { AxiosResponse } from "axios";

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

const timeToString = (date: Date) => {
  return date.toLocaleString("en-US").split(", ")[1];
}

const ChatMessageComp: ChatMessageComp = ({ message }) => {
  return (
    <div className="message-container">
      <div
        style={{ backgroundImage: `url(${message.avatar})` }}
        className="avatar"
      />
      <div className="message-content">
        <strong>{message.username}</strong> <span style={{color: "#666"}}>{timeToString(message.time)}</span>: {message.content}
      </div>
    </div>
  );
};

const NoticeComp: NoticeComp = ({ message }) => {
return <div className="notice-container">{message.content} - {timeToString(message.time)}</div>;
};

export const PregameLobby: React.FC<PregameLobbyProps> = ({ socket, room, user }) => {
  const [copied, setCopied] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const initialMessage: MessageCompWithMessage = {
    Comp: NoticeComp,
    message: {
      avatar: user.avatarURL,
      content: `You have connected`,
      username: user.username,
      time: new Date(),
    }
  }

  const [msgs, setMsgs] = useState<MessageCompWithMessage[]>([initialMessage]);
  const [players, setPlayers] = useState<string[]>([user.username]);

  const addMessage = (message: MessageCompWithMessage) => {
    setMsgs(prevArray => [...prevArray, message]);
    setTimeout(() => {
      const chat = document.querySelector(".chat-content");
      if (chat){
        chat.scrollTop = chat.scrollHeight;
      }
    }, 100);
  };

  const addPlayer = (username: string) => {
    setPlayers(prevPlayers => [...prevPlayers, username]);
  }

  const removePlayer = (username: string) => {
    setPlayers(prevPlayers => prevPlayers.filter(player => player !== username));
  }

  const startGame = () => {
    let x = 5;
    const i = setInterval(() => {
      const m: MessageCompWithMessage = {
        Comp: NoticeComp,
        message: {
          avatar: SYSTEM_AVATAR,
          content: `Game will start in ${x}...`,
          time: new Date(),
          username: "SYSTEM",
        }
      }
      addMessage(m);
      if (--x === 0){
        window.clearInterval(i);
        Toast.success("Test");
      }
    }, 1000);
  }

  useEffect(() => {
    socket.on("user-joined", (user: ReactUser) => {
      addMessage({
        Comp: NoticeComp,
        message: {
          content: `${user.username} has connected`,
          username: user.username,
          avatar: user.avatarURL,
          time: new Date(),
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
          content: `${user.username} has disconnected`,
          time: new Date(),
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

    socket.on("start-game", () => startGame());

  }, []);

  useEffect(() => {
    Axios.get(`/api/rooms/${room._id}`)
    .then((response: AxiosResponse<ReactRoom>) => {
      const result:string[] = [];
      response.data.players.forEach(p => {
        result.push(p.username);
      });
      setPlayers(result);
    })
    .catch((err: Error) => {
        console.log(err.message);
        Toast.error("Error 45233: Could not fetch player list.");
    });
  }, [])

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
                    time: new Date(),
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
      { copied && <p style={{ color: "red" }}>Copied.</p> }
      { user._id === room.host._id &&
      <>
        <br/>
        <div className="button-simple" onClick={() => {
          socket.emit("start-game", room);
          startGame();
        }}>Start game</div>
      </> }
    </>
  );
};
