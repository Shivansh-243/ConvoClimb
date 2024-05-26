"use client";
import classes from "./page.module.css";
import { useSocket } from "../context/SocketProvider";
import { useState } from "react";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");
  return (
    <div>
      <div>
        <input
          className={classes["chat-input"]}
          type="text"
          placeholder="type message here"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={(e) => sendMessage(message)}
          className={classes["btn"]}
        >
          send
        </button>
      </div>
      <h1>all messages will appear here</h1>
      <div>
        {messages.map((msg) => (
          <li>{msg}</li>
        ))}
      </div>
    </div>
  );
}
