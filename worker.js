const { createWorker } = require('tesseract.js');


const url = "https://tbcounter-screenshots.s3.eu-north-1.amazonaws.com/66880a54908e297eb5cddb78?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmV1LW5vcnRoLTEiRzBFAiBB30JTYIDkdIhXJUBVEwbsSJqQxOzWH1WAd1PU1rpRwAIhAPoPj79TTFRenmTb2JvjG4Wc7csRctwTP0IF67Gm04JcKu0CCI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNzMwMzM1NTMxMjM5IgzLW3l09qvbs3p1H70qwQIx8vvf8E1VtQ%2FJZi%2FKwuc69nGCZF%2F9pQFVWcCRgINyM51rRHIJ3Y7jP8taeW%2BzY5MUBwlqdEMS8EGIxpszEh%2B4qeXGO1SwtKl8C%2Fe%2BtODBIiRIM6SC83PWDZznn2DIXHP%2FyVJJQogAqXfz6bB51XuEnTAYjkt6CVtrtCjJ7lsveleXn9rJZFh3Twafsfvt2zoOE30n3rr6GBCvAwQ1kJmiJ3o67RQj42cWQr9NxgNjqSdKK1oflTxJgaIClsDzd9MqkLg3XQUn74v3sRgww4mTul8h%2Fv5w8I7DSpzwQm3JokXrkRgeFddNT9i0jsbOjSFScoc4qUakuF7DY5MK5BjRfLxzG4Pjf2WNk4%2FCe8nUYowW9qrDmYR%2BZkYREqC%2Fjxre0RkORmWzbZw06R0%2BYYr%2FH3IbDwpgDoBVmv%2BoMXzwRgIwnoLKtAY6swJzIpJuRCEiswf3Mj%2FqlMX3AnhP0TEwY2GcD3s%2Fdgf83KOOTahRIJFQd3ZenJPwotUoO7nCj9PN%2FWqdkKKQb0kE4m2qwyb1hYPLL0yRe7xjMVJu2eRM8ader%2Bl%2F5MA70NFE3AE26Ckqw6dvlESqnIPx3vwwDQfS%2FuA8upYOE2woC%2BiipluGvkYp%2B58xuCSTO9FaYVv14lvBckOSyISPhUojdfKtlDGHmV3S2cOkHOwSnfyeNtIpU1%2BBaj9dJ37fEHk9aA0keOMXjaZhUViClSI1teVzWcQggF1tFo%2BxB4j4wnikVkP8NplHD8lzmykHQXjE6EmqGrMKf33teZZqY4HJhx0dIXdSZjLmkpqbDO2BVXdh3IpjPUtx0t6OnXZHHKJG4PDOh4lp53SdBsf2Zeaqd1tk&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240713T142412Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA2UC3D2DTXBGZ5JN7%2F20240713%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Signature=f7ab76be823602ec077abcd4602c9c2293c69a2a17974c780c29f072c9fc85d5"

const rectangles = [
    {
        left: 91,
        top: 28,
        width: 330,
        height: 20,
        type: 'name'
    },
    {
        left: 90,
        top: 0,
        width: 350,
        height: 25,
        type: 'type'
    },
    {
        left: 91,
        top: 47,
        width: 340,
        height: 21,
        type: 'source'
    },
    {
        left: 470,
        top: 21,
        width: 231,
        height: 25,
        type: 'time'
    },
];

async function read(url) {
    const worker = await createWorker(['eng', 'rus'], 1, {
        langPath: './tessdata',
    });

    const values = {};

    for (let rectangle of rectangles) {

        const { data: { text } } = await worker.recognize(url, { rectangle });
        values[rectangle.type] = text
    }
    console.log(values);
    await worker.terminate();

    return values //name, type, source, time, status


}

module.exports = { read }