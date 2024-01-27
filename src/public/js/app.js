// 클라이언트
const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);  // 컴퓨터에서 - ws://localhost:3000 

// 문자열 타입의 JSON Object를 생성합니다.
// JSON을 자바스크립트 Object 로 던지면 js로 된 서버에서는 받은 수 있지만, 다른 서버에서는 받지 못해서 범용성을 위해 문자열로 변환하여 요청합니다.
const makeJsonString = (type, payload) => {
    data = {
        "type": type,
        "payload": payload
    }
    return JSON.stringify(data);
}

// 소켓 이벤트 핸들러 추가
socket.addEventListener("open", (socket) => {
    console.log("Conneted to Server");
})

socket.addEventListener("close", (socket) => {
    console.log("Disconnected From Server");
})

socket.addEventListener("message", (socket) => {
    const li = document.createElement("li");
    li.innerText = socket.data;
    messageList.append(li);
})

const handleNicknameSubmit = (event) => {
    event.preventDefault();
    const input = nicknameForm.querySelector("input");
    socket.send(makeJsonString("nickname", input.value));
    input.value = "";
}

const handleMessageSubmit = (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeJsonString("new_message", input.value));
    input.value = "";
}

nicknameForm.addEventListener("submit", handleNicknameSubmit);
messageForm.addEventListener("submit", handleMessageSubmit);