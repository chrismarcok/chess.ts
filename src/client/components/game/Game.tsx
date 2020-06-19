import React, { useState, useEffect } from "react";
import { ReactRoom } from "../../../server/models/Room";
import { ReactUser } from "../../../server/models/User";
import { ReactCard } from "../../../server/models/Card";
import { roomCreate } from "../../actions/roomActions";

interface GameProps {
  socket: SocketIOClient.Socket;
  room: ReactRoom;
  user: ReactUser;
}

interface GamePlayerProps {
  player: ReactUser;
  socket: SocketIOClient.Socket;
  room: ReactRoom;
  cards: ReactCard[];
}

interface CardProps {
  card: ReactCard;
  room: ReactRoom;
  socket: SocketIOClient.Socket;
}

const Card: React.FC<CardProps> = ({ card, room, socket }) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    socket.on("card-clicked", (clickedCard: ReactCard) => {
      if (String(clickedCard._id) === String(card._id)) {
        setDisabled(old => !old);
      }
    });
  }, []);

  return (
    <div
      className="card-container clickable"
      style={{
        transform: disabled ? "rotate(270deg)" : "none",
        marginLeft: disabled ? "10px" : "0",
        marginRight: disabled ? "10px" : "0",
      }}
      onClick={() => {
        socket.emit("card-clicked", { room, card });
        setDisabled(!disabled);
      }}
    >
      {String(disabled)}
      <div className="title">{card.title}</div>
      <div
        className="picture"
        style={{ backgroundImage: `url(${card.picture})` }}
      />
    </div>
  );
};

const GamePlayer: React.FC<GamePlayerProps> = ({ player, room, socket, cards }) => {

  const [presumedInvestigor, setPresumedInvestigator] = useState(true);
  return (
    <div className="player-container">
      <div className="info">
        <div className="title">
          {room.host._id === player._id ? "[HOST] " : null}
          {player.username}
        </div>
        <div
          className="avatar"
          style={{ backgroundImage: `url(${player.avatarURL})` }}
        />
        <div
          className="clickable"
          onClick={() => setPresumedInvestigator(!presumedInvestigor)}
        >
          Suspected Role:{" "}
          <span style={{ color: presumedInvestigor ? "green" : "red" }}>
            {presumedInvestigor ? "investigator" : "murderer"}???
          </span>
        </div>
      </div>
      <div className="hand">
        <div className="weapon-cards">
          {cards
            .filter((c) => c.type === "WEAPON")
            .map((c) => {
              return <Card card={c} key={c._id} socket={socket} room={room} />;
            })}
        </div>
        <div className="clue-cards">
          {cards
            .filter((c) => c.type === "CLUE")
            .map((c) => {
              return <Card card={c} key={c._id} socket={socket} room={room} />;
            })}
        </div>
      </div>
    </div>
  );
};

export const Game: React.FC<GameProps> = ({ socket, room, user }) => {
  const getTimeDiff = (): number => {
    return new Date(room.expireAt).getTime() + 1000 * 60 * 60 - Date.now();
  };

  const [timeLeft, setTimeLeft] = useState(getTimeDiff());
  const [showTimeLeft, setShowTimeLeft] = useState(true);

  const cards: ReactCard[] = [
    {
      _id: "1",
      picture: "https://i.imgur.com/mYGEoYB.png",
      title: "weapon1",
      type: "WEAPON",
    },
    {
      _id: "2",
      picture: "https://i.imgur.com/mYGEoYB.png",
      title: "weapon2",
      type: "WEAPON",
    },
    {
      _id: "3",
      picture: "https://i.imgur.com/v1wnW7Z.png",
      title: "clue1",
      type: "CLUE",
    },
    {
      _id: "4",
      picture: "https://i.imgur.com/v1wnW7Z.png",
      title: "clue2",
      type: "CLUE",
    },
  ];

  useEffect(() => {
    const i = setInterval(() => {
      setTimeLeft(getTimeDiff());
    }, 1000);
    return () => {
      window.clearInterval(i);
    };
  }, []);

  return (
    <div className="game">
      <div className="clickable" onClick={() => setShowTimeLeft(!showTimeLeft)}>
        {showTimeLeft ? "Hide time" : "Show time"}
      </div>
      {showTimeLeft && (
        <>
          <div>
            Room expires at:{" "}
            {new Date(room.expireAt).getTime() + 1000 * 60 * 60}
          </div>
          <div>Current Time: {Date.now()}</div>
          <div>
            Difference: {timeLeft} (approx.{" "}
            {Number(timeLeft / 1000 / 60).toFixed(2)} minutes remaining)
          </div>{" "}
        </>
      )}

      {room.players.map((player, index) => {
        return (
          <GamePlayer player={player} room={room} socket={socket} key={index} cards={
            cards.filter(c => Number(c._id) % 2 === index)
          }/>
        );
      })}
    </div>
  );
};
