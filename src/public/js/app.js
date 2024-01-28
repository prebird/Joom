// io 메서드를 이용해서 서버와 자동 연결
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

const handleRoomSubmit = (event) => {
    event.preventDefault();
    const input = form.querySelector("input");

    // socket.emit()
    // 1. 사용자가 정의한 이름의 이벤트를 전달 할 수 있음 (enter_room 이라는 이름의 이벤트를 발생시킴)
    // 2. 문자열이 아닌 객체를 전달할 수 있음
    socket.emit("enter_room", { payload: input.value });
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);