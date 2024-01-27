// 클라이언트
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);  // 컴퓨터에서 - ws://localhost:3000 

// 소켓 이벤트 핸들러 추가
socket.addEventListener("open", (socket) => {
    console.log("Conneted to Server");
})

socket.addEventListener("message", (socket) => {
    const li = document.createElement("li");
    li.innerText = socket.data;
    messageList.append(li);
})

socket.addEventListener("close", (socket) => {
    console.log("Disconnected From Server");
})

const handleSubmit = (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);