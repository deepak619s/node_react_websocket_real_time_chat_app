import { useState, useEffect, useRef } from "react";
import music from "./iphone-sms-tone.mp3";

export const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const notification = new Audio(music);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");

      const messageData = {
        id: Math.random(),
        room: room,
        author: username,
        message: currentMessage,
        time: `${hours}:${minutes}`,
      };
      await socket.emit("send_message", messageData);

      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      notification.play();
    }
  };

  useEffect(() => {
    const handleReceiveMsg = (data) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on("receive_message", handleReceiveMsg);

    return () => {
      socket.off("receive_message", handleReceiveMsg);
    };
  }, [socket]);

  const containRef = useRef(null);

  useEffect(() => {
    containRef.current.scrollTop = containRef.current.scrollHeight;
  }, [messageList]);

  return (
    <>
      <div className="chat_container">
        <h1>Welcome {username}</h1>

        <form onSubmit={(e) => e.preventDefault()} className="chat_box">
          <div
            ref={containRef}
            className="auto_scrolling_div"
            style={{
              height: "450px",
              overflow: "auto",
              border: "2px solid yellow",
            }}
          >
            {messageList.map((data) => {
              return (
                <div
                  key={data.id}
                  className="message_content"
                  id={username === data.author ? "you" : "other"}
                >
                  <div>
                    <div
                      className="msg"
                      id={username === data.author ? "y" : "b"}
                    >
                      <p>{data.message}</p>
                    </div>

                    <div className="msg_detail">
                      <p>{data.author}</p>
                      <p>{data.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="chat_body">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </form>
      </div>
    </>
  );
};
