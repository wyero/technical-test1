import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Card from "../UI/Card/Card";
import { IoMdSend } from "react-icons/io";
import io from "socket.io-client";

const Chat = () => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(true);

  const socket = io("http://localhost:8000", {
    transports: ["websocket"],
  });

  useEffect(() => {
    socket.on("message", (message) => {
      setChat((prevChat) => {
        return [...prevChat, { id: Math.random().toString(), text: message }];
      });
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (message.trim.length !== "") {
      socket.emit("message", message);
      setMessage("");
      setValid(true);
    }
  };

  const changeMessageHandler = (event) => {
    const newMessage = event.target.value;
    setMessage(newMessage);
    if (newMessage.trim().length > 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const uniqueChat = [...new Map(chat.map((item) => [item.text, item])).values()];

  return (
    <Card>
      <section className={styles.chat}>
        <h1 className={styles.title}>obrolan</h1>
        <div className={styles["chat-content"]}>
          {uniqueChat.map((chat) => (
            <p className={styles.message} key={chat.id}>
              {chat.text}
            </p>
          ))}
        </div>
        <div className={styles["chat-input"]}>
          <form onSubmit={submitHandler} className={styles.form}>
            <textarea
              placeholder="Pesan"
              value={message}
              onChange={changeMessageHandler}
            ></textarea>
            <button
              type="submit"
              className={`${styles.button} ${
                !valid ? styles.valid : styles.invalid
              }`}
              disabled={valid}
            >
              <IoMdSend />
            </button>
          </form>
        </div>
      </section>
    </Card>
  );
};

export default Chat;
