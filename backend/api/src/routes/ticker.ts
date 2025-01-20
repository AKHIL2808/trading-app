import { Hono } from "hono";

const ticker = new Hono()

ticker.get("/", (c) => {
  return c.text("this is the ticker")
})

export default ticker
