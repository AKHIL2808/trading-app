import { createClient, RedisClientType } from "redis"

export class RedisManager {
  private client: RedisClientType
  private static instance: RedisManager

  private constructor() {
    this.client = createClient()
    this.client.connect()
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RedisManager()
    }
    return this.instance
  }

  public sendResponseToApi(clientId: string, message) {
    this.client.publish(clientId, JSON.parse(message))
  }
}
