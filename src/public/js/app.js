// io 메서드를 이용해서 서버와 자동 연결
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

const addMessage = (message) => {
    console.log("addMessage called")
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

const showRoom = () => {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `ROOM ${roomName}`;
    const form = room.querySelector("form");
    form.addEventListener("submit", handleMessageSubmit);
}

const handleRoomSubmit = (event) => {
    event.preventDefault();
    const input = form.querySelector("input");

    // socket.emit()
    // 1. 사용자가 정의한 이름의 이벤트를 전달 할 수 있음 (enter_room 이라는 이름의 이벤트를 발생시킴)
    // 2. 문자열이 아닌 객체를 전달할 수 있음
    // 3. 콜백 베서드를 서버로 넘겨줄 수 있음 (서버에서 호출되고, 프론트에서 실행됨, emit 의 마지막 인자값이어야함)
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = "";
}

const handleMessageSubmit = (event) => {
    event.preventDefault();
    const input = room.querySelector("input");
    const value = input.value;
    socket.emit("new_message", value, roomName, () => {
        addMessage(`You: ${value}`);                        // 왜 직접 추가해 주어야할까? 이벤트를 발생시킨 socket 으로는 브로드캐스팅 안되나?
    })
    input.value = "";
}


form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
    addMessage("(누군가)가 입장하셨습니다.");
})

socket.on("bye", () => {
    addMessage("(누군가)가 방을 나갔습니다.");
})

socket.on("new_message", (msg) => {
    addMessage(msg);
})