import { Server } from "socket.io";
class SocketServices {
  private _io: Server;

  constructor() {
    console.log("init socket server");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  public initListeners() {
    const io = this._io;
    console.log("init socket listeners...");

    io.on("connect", (socket) => {
      console.log(`New Socket Connected `, socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("new message recieved, ", message);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketServices;
