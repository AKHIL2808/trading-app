import { Hono } from 'hono'
import depthRoutes from './routes/depth'
import klineRoutes from './routes/kline'
import tickerRoutes from './routes/ticker'
import tradeRoutes from './routes/trade'
const app = new Hono()

app.route('/api/v1/depth', depthRoutes)
app.route('/api/v1/kline', klineRoutes)
app.route('/api/v1/ticker', tickerRoutes)
app.route('/api/v1/trade', tradeRoutes)

export default app
