import { createClient } from "redis"

(async () => {
  const redisClient = createClient()
  await redisClient.connect()

  while (true) {
    const response = redisClient.rPop("messages" as string)
    if (!response) {

    } else {

    }
  }
})
