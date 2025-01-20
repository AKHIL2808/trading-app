import { Hono } from "hono";

const depth = new Hono()

depth.get("/", (c) => {
  return c.text("this is depth")
})

export default depth
