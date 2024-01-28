import express from 'express';
import http from 'http';
import SocketIO from 'socket.io'

const app = express();
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

const handleListen = () => console.log("Listening on http://localhost:3000");
httpServer.listen(3000, handleListen);