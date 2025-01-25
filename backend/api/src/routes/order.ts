import { Hono } from "hono";
import { RedisManager } from "../Redismanager";

const order = new Hono()

order.post("/", async (c) => {
  const { price, market, side, quantity, userId } = await c.req.json()
  const response = await RedisManager.getInstance().getReponseForOrderPlaced({
    type: "CREATE_ORDER",
    data: {
      price,
      market,
      side,
      quantity,
      userId
    }
  })
  console.log(response)
})

order.delete("/", async (c) => {
  const { market, orderId } = await c.req.json()
  const response = await RedisManager.getInstance().getReponseForOrderPlaced({
    type: "CANCEL_ORDER",
    data: {
      market,
      orderId
    }
  })
  console.log(response)
})

order.get("/open", async (c) => {
  const { userId, market } = await c.req.json()
  const response = await RedisManager.getInstance().getReponseForOrderPlaced({
    type: "OPEN_ORDER",
    data: {
      market,
      userId
    }
  })
  console.log(response)
})


export default order
