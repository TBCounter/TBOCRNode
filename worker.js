const { createWorker } = require("tesseract.js");

const rectangles = [
  {
    left: 91,
    top: 28,
    width: 330,
    height: 20,
    type: "name",
  },
  {
    left: 90,
    top: 0,
    width: 350,
    height: 25,
    type: "type",
  },
  {
    left: 91,
    top: 47,
    width: 340,
    height: 21,
    type: "source",
  },
  {
    left: 470,
    top: 21,
    width: 231,
    height: 25,
    type: "time",
  },
];

let worker = null;
async function createNewWorker() {
  worker = await createWorker(["eng", "rus"], 1, {
    langPath: "./tessdata",
  });
}

async function read(url) {
  // скачать изображение в оперативу
  // предобработать
  // передать воркеру

  const values = {};

  for (let rectangle of rectangles) {

    const { data: { text } } = await worker.recognize(url, { rectangle }).catch((e) => {
      console.log(e)
    });

    if (["name", "source"].includes(rectangle.type)) {
      const splittedText = text.split(":");
      if (splittedText[1]) {
        values[rectangle.type] = splittedText[1].trim();
      } else {
        values[rectangle.type] = text;
      }
    } else {
      values[rectangle.type] = text;
    }
  }
  console.log(values);

  return values; //name, type, source, time, status
}

async function terminateWorker() {
  await worker.terminate();
}

module.exports = { read, createNewWorker, terminateWorker };
