const crypto = require("crypto");

// generate 32 bytes of random data
const iv = crypto.randomBytes(32).toString("hex").slice(0, 16);

// secret key
const key = "jjhsAIyuKJJHThjhjfjhREhgfhvgSWKL";

exports.encrypt = (message) => {
  const encrypter = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encryptedMsg =
    encrypter.update(message, "utf-8", "hex") + encrypter.final("hex");

  return encryptedMsg;
};

exports.decrypt = (encryptedMsg) => {
  const decrypter = crypto.createDecipheriv("aes-256-cbc", key, iv);

  let decryptedMsg =
    decrypter.update(encryptedMsg, "hex", "utf8") + decrypter.final("utf8");

  return decryptedMsg;
};
