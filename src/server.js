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
    socket.on("enter_room", (a, b, c, d, done) => {
        console.log(a + b + c + d);
        setTimeout(() => {
            done();
        }, 5000);
    });
});

const handleListen = () => console.log("Listening on http://localhost:3000");
httpServer.listen(3000, handleListen);