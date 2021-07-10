const mongoose = require("mongoose");
const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();
client.get = promisify(client.get);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = async function (options = {}) {
  this._cache = true;
  this.hashKey = JSON.stringify(options.key || "default");

  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this._cache) {
    console.log("from mongodb");
    return await exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );
  console.log("from cache");

  //  See if we have a value for 'key' in redis
  const cacheValue = await client.get(key);

  // If we do, return that
  if (cacheValue) {
    // return JSON.parse(cacheValue);
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  // otherwise, issue the query and store the result in redis

  const result = await exec.apply(this, arguments);
  client.set(key, JSON.stringify(result));

  return result;
};
