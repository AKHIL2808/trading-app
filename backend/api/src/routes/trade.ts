
import { Hono } from "hono";

const trade = new Hono()

trade.get("/", (c) => {
  return c.text("this is the trade")
})

export default trade
