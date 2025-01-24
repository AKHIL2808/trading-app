import { Hono } from "hono";

const order = new Hono()

order.post("/", (c) => {
  return c.text("this the order router")
})


export default order
