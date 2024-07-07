const { createWorker } = require('tesseract.js');


const url = "https://tbcounter-screenshots.s3.eu-north-1.amazonaws.com/66880a54908e297eb5cddb78?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCmV1LW5vcnRoLTEiRzBFAiEA7KK%2B3xYFGZ85efP%2BnM7dmPfZDprf1h9rxzQTt7GnkKwCIAYci9ykIoB4dvm9oOpHopftO5tLGWZju43EdHXylw4lKu0CCO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNzMwMzM1NTMxMjM5IgwzFijMq9JRqRN3QMkqwQI0aiozlxRw%2FWAAPAaIbXTiCLt6lIfTIUNtH6t59K%2BhG1wECI39pQcxDsYbHOGE52G4Op70mQWyQl%2Bq5ty1TKllsX5ceI8MkDAzNY8XjhOkltlmxK44RlHWbn5NK1d0H%2BQSAfkGKZWGzInSrnhuHeXk6JyuVBRCvs0%2FHftqa63KPdIRzlNaD9CPOBEIlZObtlJH8ERap63zhrVP04O37qqV5OvNYj84wvEqvP%2BQE7FXK1TWj37CG0EP4pN%2FROepLPevU0QfYPuT2r%2BoM%2BEYlrnf2s2vG4RffXNeLmeY0T6vIt01UsKZHAJi3YFiDEi3NVJxR8LpzlEKvxFaA6IjjELAjAW3dYUJDnfl27nSLmDmVbo5psIK69Jf9Y64D5gh0o7kqs82%2FWJR5letVprvTqxYDsBabxYKzo0kgvhzNaizy3YwuaiqtAY6swJZB72DpXezM9lLJTqPD3OmI3mqKxxPiHZsiy4ogkfMZLIfLf%2B3%2FgFc5dCE3uYjoOyLf1P2mHoRzqFq%2FKas%2F6ldFdtFCN1d7AaL806Ix%2FK%2FOAbxKYso9phk36nD6JQmwmWDoRayt4HQFzKMW2yLFdX5YOHAD3SqOhyimvsYF6Y6dqab030V7JrNsVr8bOtpVBTn7hZ3vida%2Fxmi2t1PTiSMz3viS6C%2BSSrJokvF0w73vyFet5ORcpxpNv41fQse40EjflxVT9GHX7Osr3BBkzNLKNvRwbZymsGUwlzM7CjCKPDn1A3puzm5dstRnoCOk1OFPOZcbZkC3gZNj7TtFX6xgwgzV7qym4Rda4Z14o2d3qSYDbGIfoLLNEM%2F7HieT2pcD7UCkdGmbjHUAsGWfjfPtIuq&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240707T175713Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA2UC3D2DT7XJ6BDEH%2F20240707%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Signature=c6bbcca415bf30be6107126e4e8dd3c8a3e42728edec1b3f3f8ba1ee9ad65c63"

const rectangles = [
    {
        left: 0,
        top: 0,
        width: 500,
        height: 250,
    },
    {
        left: 500,
        top: 0,
        width: 500,
        height: 250,
    },
];

async function read(url) {
    const worker = await createWorker(['eng', 'rus'], 1, {
        langPath: './tessdata',
    });
    (async () => {
        const values = [];
        for (let i = 0; i < rectangles.length; i++) {
            const { data: { text } } = await worker.recognize(url, { rectangle: rectangles[i] });
            values.push(text);
        }
        console.log(values);
        await worker.terminate();
    })();
}

read(url)

module.exports = { read }