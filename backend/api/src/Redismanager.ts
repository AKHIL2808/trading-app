import { createClient, RedisClientType } from "redis"
export class RedisManager {
  private client: RedisClientType
  private publisher: RedisClientType
  private static instance: RedisManager

  private constructor() {
    this.client = createClient();
    this.client.connect()
    this.publisher = createClient();
    this.publisher.connect()
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RedisManager()
    }
    return this.instance
  }

  public getReponseForOrderPlaced(message) {
    return new Promise((resolve) => {
      const id = this.generateRandomId()
      this.client.subscribe(id, (message) => {
        this.client.unsubscribe(id)
        resolve(JSON.stringify(message))
      })
      this.publisher.lPush("messages", JSON.stringify({ clientId: id, message }))
    })
  }

  public generateRandomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 25)
  }
}
