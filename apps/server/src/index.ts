import http from "http";
import { Server } from "socket.io";
import SocketService from "./services/socket";

async function init() {
  // Create an HTTP server
  const httpServer = http.createServer();

  const socketService = new SocketService(httpServer);

  // Initialize socket listeners
  socketService.initListeners();

  const PORT = process.env.PORT || 8000;
  httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

init();
