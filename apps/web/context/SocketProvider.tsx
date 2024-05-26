"use client";
import React, { createContext, useCallback, useEffect } from "react";
import { io } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}
interface ISocketContext {
  sendMessage: (msg: string) => any;
}

const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
    console.log("send message : ", msg);
  }, []);

  useEffect(() => {
    console.log("init socket connection");
    const _socket = io("http://localhost:8000");
    // console.log("socket connected : ", _socket);

    return () => {
      _socket.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
