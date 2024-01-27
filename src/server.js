import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express(); // node -> http 프로토콜을 사용하는 서버

app.set("view engine", "ejs")
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));  // 추가해주기

app.get("/", (req, res) => {
    res.render("home")
});
app.get("/*", (req, res) => res.redirect("/"));

const server = http.createServer(app);
// webSocket 프로토콜을 사용하는 서버
// http 서버를 파라메터로 넣어주었지만, 필수는 아닙니다.
// 동일 포트에서 두 프로토콜을 같이 제공하기 위한 것입니다.
const wss = new WebSocket.Server({ server });

const sockets = [];

// websocket 이벤트 핸들러 추가
wss.addListener("connection", (socket) => {
    sockets.push(socket);
    console.log("Connected to Browser");
    socket.on("close", () => console.log("Disconnected from browser"));

    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch (message.type) {
            case "new_message":
                sockets.forEach(aSocket => aSocket.send(`${message.payload}`));
                break;
            case "nickname":
                socket["nickname"] = message.payload;       // 연결된 소켓의 닉네임을 설정
                break;

        }

    });
});

const handleListen = () => console.log("Listening on http://localhost:3000");
server.listen(3000, handleListen);