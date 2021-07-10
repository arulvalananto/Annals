const redis = require("redis");

const redisUrl = "redis://127.0.0.1:6379";

const client = redis.createClient(redisUrl);

// const redisValues = {
//   spanish: {
//     red: "rojo",
//     orange: "naranja",
//     blue: "azul",
//   },
//   german: {
//     red: "rot",
//     orange: "orange",
//     blue: "blau",
//   },
// };

client.set("hi", "there");
client.get("hi", console.log);      // client.get("hi", (err, val) => console.log(val));

client.hset("german", "red", "rot");
client.hget("german", "red", console.log);

client.set("colors", JSON.stringify({ red: "rojo" }));
client.get("colors", (err, val) => console.log(JSON.parse(val)));
