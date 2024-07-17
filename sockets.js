const io = require("socket.io-client");
const { read } = require("./worker")


const socket = io(process.env.API_URL + `/ocr`, {
    transports: ["websocket"], // Использование WebSocket транспорта
});

socket.on("connect", () => {
    console.log("Connected to server");
});

// Событие отключения
socket.on("disconnect", () => {
    console.log("Disconnected from server");
});

// Событие ошибки
socket.on("connect_error", (error) => {
    console.log(process.env.API_URL + `/ocr`);
    console.error("Connection error:", error);
});

socket.on("process", (chest) => {
    //do processing
    const result = read(chest.url)
    socket.emit('process_response', { chestId: chest.id, ...result })
})