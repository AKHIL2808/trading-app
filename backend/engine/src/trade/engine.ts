import { RedisManager } from "../RedisManager"

interface apiMessageDataType {
  price: string,
  market: string,
  side: string,
  quantity: string,
  userId: string
}
interface apiMessageType {
  type: string,
  data: apiMessageDataType
}
export class Engine {
  private orderbook = []
  private balances = new Map()
  process({ clientId, message }: { clientId: string, message: apiMessageType }) {
    switch (message.type) {
      case "CREATE_ORDER":
        try {
          // const { executedQuantity, fills, orderId } = this.createOrder(message.data.market, message.data.side, message.data.quantity, message.data.userId, message.data.price)
          RedisManager.getInstance().sendResponseToApi(clientId, {
            data: {
              // executedQuantity,
              // fills,
              // orderId
            }
          })
        } catch (e) {
          console.log(e)
        }
    }
  }

  createOrder(market: string, side: string, quantity: string, userId: string, price: string) {

  }

}
