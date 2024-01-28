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
    // 3. 콜백 베서드를 서버로 넘겨줄 수 있음 (서버에서 호출되고, 프론트에서 실행됨, emit 의 마지막 인자값이어야함)
    socket.emit("enter_room", "tell me", "tell me", "tetetete", "tell me", () => console.log("arrived at"));
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);