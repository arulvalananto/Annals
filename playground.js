const crypto = require("./utils/crypto");

const hash = {
    iv: "66daa1b9f6eb2bd15899b7793e849355",
    content: "277efd069f6977f78f",
};

const text = crypto.decrypt(hash);

console.log(text);
