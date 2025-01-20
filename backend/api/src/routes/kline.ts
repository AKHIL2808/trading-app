import { Hono } from "hono";

const kline = new Hono()

kline.get("/", (c) => {
  return c.text("this is the kline")
})

export default kline
