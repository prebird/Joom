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

const handleConnection = (websocket) => {
    console.log(websocket);
}

// websocket 이벤트 핸들러 추가
wss.addListener("connection", handleConnection);

const handleListen = () => console.log("Listening on http://localhost:3000");
server.listen(3000, handleListen);