const io = require("socket.io-client");
const { read, createNewWorker, terminateWorker } = require("./worker")


const socket = io(process.env.API_URL + `/ocr`, {
    transports: ["websocket"], // Использование WebSocket транспорта
});

socket.on("connect", async () => {
    console.log("Connected to server");
    await createNewWorker()
});

// Событие отключения
socket.on("disconnect", async () => {
    console.log("Disconnected from server");
    await terminateWorker()
});

// Событие ошибки
socket.on("connect_error", (error) => {
    console.log(process.env.API_URL + `/ocr`);
    console.error("Connection error:", error);
});

socket.on("process", async (chest) => {
    //do processing
    try {
        let result = await read(chest.url) // let?
        let resultObject = JSON.stringify(result)
        console.log("this is result: " + resultObject)
        socket.emit('process_response', { chestId: chest._id, ...JSON.parse(resultObject) })
    } catch (err) {
        console.log(err)
    }

})