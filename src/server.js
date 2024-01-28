import express from 'express';
import http from 'http';
import SocketIO from 'socket.io'

const app = express();

app.set("view engine", "ejs")
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));  // 추가해주기

app.get("/", (req, res) => {
    res.render("home")
});
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
    socket.on("enter_room", (roomName, done) => {
        done();
        socket.join(roomName);  // 채팅룸 접속
        console.log(socket.rooms);
        socket.to(roomName).emit("welcome");    // roomName 채팅방에 welcome 이벤트를 발생시킴
    });
    socket.on("disconnecting", () => {
        // 해당 소켓이 속해있던 모든 room에게 이벤트 브로드캐스팅
        socket.rooms.forEach(room => socket.to(room).emit("bye"));
    })
});

const handleListen = () => console.log("Listening on http://localhost:3000");
httpServer.listen(3000, handleListen);