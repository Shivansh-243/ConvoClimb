import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
  host: "redis-357a5edf-scale-chat-app.h.aivencloud.com",
  port: 18291,
  username: "default",
  password: "AVNS_V0YTGzA1Vaj7l9xfe19",
});
const sub = new Redis({
  host: "redis-357a5edf-scale-chat-app.h.aivencloud.com",
  port: 18291,
  username: "default",
  password: "AVNS_V0YTGzA1Vaj7l9xfe19",
});
class SocketService {
  private _io: Server;

  constructor(httpServer: any) {
    console.log("Init Socket Service...");
    this._io = new Server(httpServer, {
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGE");
  }
  public initListeners() {
    const io = this._io;
    console.log("Init Socket Listeners...");

    console.log("happening");
    io.on("connection", (socket: any) => {
      console.log(`New Socket Connected`, socket.id);
      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New Message Rec.", message);
        // publish this message to the redis
        await pub.publish("MESSAGE", JSON.stringify({ message }));
      });
    });
    sub.on("message", (channel, message) => {
      console.log("new message from redis ", message);
      io.emit("message", message);
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
