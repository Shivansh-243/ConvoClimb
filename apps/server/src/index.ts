import http from "http";
import SocketServices from "./services/socket";

async function init() {
  const socketService = new SocketServices();

  const httpServer = http.createServer();

  //   const httpServer = http.createServer();
  const PORT = process.env.PORT ? process.env.PORT : 8000;
  httpServer.listen(PORT, () => {
    console.log(`server is listening on the PORT: ${PORT}`);
  });
  socketService.initListeners();
}

init();
