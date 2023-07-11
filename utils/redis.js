import redis from "redis";
import { promisify } from "util";

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on("error", (err) => {
      console.log("Error " + err);
    });

    this.asyncGet = promisify(this.client.get).bind(this.client);
    this.asyncSetEx = promisify(this.client.setex).bind(this.client);
    this.asyncDel = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return await this.asyncGet(key);
  }

  async set(key, value, duration) {
    await this.asyncSetEx(key, duration, value);
  }

  async del(key) {
    await this.asyncDel(key);
  }
}
