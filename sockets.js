const io = require("socket.io-client");

const socket = io(process.env.API_URL + `/ocr`, {
    transports: ["websocket"], // Использование WebSocket транспорта
});
