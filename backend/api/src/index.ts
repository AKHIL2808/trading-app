import { Hono } from 'hono'
import depthRoutes from './routes/depth'
import klineRoutes from './routes/kline'
import tickerRoutes from './routes/ticker'
import tradeRoutes from './routes/trade'
import orderRoutes from './routes/order'
const app = new Hono()

app.route('/api/v1/depth', depthRoutes)
app.route('/api/v1/kline', klineRoutes)
app.route('/api/v1/ticker', tickerRoutes)
app.route('/api/v1/trade', tradeRoutes)
app.route('/api/v1/order', orderRoutes)

export default app
