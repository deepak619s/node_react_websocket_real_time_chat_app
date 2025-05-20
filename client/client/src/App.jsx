import React, { useState } from "react";
import io from "socket.io-client";
import { Chat } from "./Chat";
import music from "./mixkit-title-game.wav";

const socket = io.connect("http://localhost:3000");

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const notification = new Audio(music);

  // const [showChat, setShowChat] = useState(false);

  const join_chat = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      notification.play();
      // setShowChat(true);
    }
  };

  return (
    <>
      {/* {!showChat && (
        <form onSubmit={(e) => e.preventDefault()} className="join_room">
          <h1>Join Chat</h1>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
          />
          <input
            type="text"
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter chat room"
          />
          <button onClick={join_chat}>Join</button>
        </form>
      )}

      {showChat && <Chat socket={socket} username={username} room={room} />} */}

      <form onSubmit={(e) => e.preventDefault()} className="join_room">
        <h1>Join Chat</h1>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
        />
        <input
          type="text"
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter chat room"
        />
        <button type="button" onClick={join_chat}>
          Join
        </button>
      </form>

      <Chat socket={socket} username={username} room={room} />
    </>
  );
};

export default App;
