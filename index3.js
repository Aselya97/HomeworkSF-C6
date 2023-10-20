const wsUri = "wss://echo-ws-service.herokuapp.com";


let websocket = new WebSocket(wsUri);

const outputNode = document.getElementById("output");
const textNode = document.getElementById("text_area");
const btnSend = document.getElementById("b_send");
const btnGeolocation = document.getElementById("b_location");

let connection = false;
 
websocket.onopen = function(evt){
    const connect = document.createElement("div");
    connect.innerHTML = "Соединение установлено";
    connect.classList.add("connect");
    outputNode.appendChild(connect);
    connection = true;
}

websocket.onclose = function(evt){
    const disconnect = document.createElement("div");
    disconnect.innerHTML = "Соединение не установлено";
    disconnect.classList.add("disconnect");
    outputNode.appendChild(disconnect);
    connection = false;
}

websocket.onerror = function(evt){
    const connectError = document.createElement("div");
    connectError.innerHTML = "Ошибка";
    connectError.classList.add("connectError");
    outputNode.appendChild(connectError);
    connection = false;
}

websocket.onmessage = function(evt){
    if (!evt.data.startsWith("https://www.openstreetmap.org")) {
        addHist(evt.data, "server");
    }
}; 

function addHist(msg, from){
    const divMsg = document.createElement("div");
    const message = `<p class="msg">${msg}</p>`;
    divMsg.classList.className = '';
    divMsg.classList.add(from);
    divMsg.innerHTML = message;
    outputNode.appendChild(divMsg);
    outputNode.scrollTop = output.scrollHeight;
}

textNode.addEventListener("keydown", (e) => {
    if (e.keyCode === 13){
        const textInput = textNode.value;
        if (textInput){
            addHist(textInput, "person");
            document.getElementById("text_area").value = '';
            websocket.send(textInput);
        }
    }
});


btnSend.addEventListener('click', () => {
    const textInput = outputNode.value;
    if (textInput){
        addHist(textInput, "person");
        document.getElementById("text_area").value = '';
        websocket.send(textInput);
    }
});


  btnGeolocation.addEventListener('click', () => {    
    if (connection) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { coords } = position;
                const gLink = `https://www.openstreetmap.org/#map=8/${coords.latitude}/${coords.longitude}`;
                const gLinkLetter = `<a href="${gLink}">Гео-позиция</a>`;
                addHist(gLinkLetter, "person");
                websocket.send('Широта ' + coords.latitude + '\nДолгота ' + coords.longitude)
                console.log(position)
            })
        }
    }
  });







