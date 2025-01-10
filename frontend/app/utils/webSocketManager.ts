export class webSocketManager {
  private static instance: webSocketManager
  private ws: WebSocket
  private arrayMessage: any[] = []
  private initialised: boolean = false
  private callback: any = {}
  private id: number = 1

  private constructor() {
    this.ws = new WebSocket("wss://ws.backpack.exchange/")
    this.arrayMessage = []
    this.id = 1
    this.init()
  }

  public static getInstance() {
    if (!this.instance) {
      return this.instance = new webSocketManager()
    }
    return this.instance
  }


  init() {
    this.ws.onopen = () => {
      this.initialised = true
      this.arrayMessage.forEach((message) => {
        this.ws.send(JSON.stringify(message))
      })
      this.arrayMessage = []
    }
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      // console.log(message.data)
      const type = message.data.e
      // console.log(type)
      if (this.callback[type]) {
        this.callback[type].forEach(({ callback }) => {
          if (type == "ticker") {
            // console.log("ticker")
            const newTicker: any = {
              lastPrice: message.data.c,
              high: message.data.h,
              low: message.data.l,
              volume: message.data.v,
              quoteVolume: message.data.V,
              symbol: message.data.s,
            }

            callback(newTicker);
          }
          if (type == "depth") {
            // console.log(`message : ${message}`)
            const newAsks = message.data.a
            // console.log(newAsks)
            const newBids = message.data.b
            callback({ updatedAsks: newAsks, updatedBids: newBids })
          }
          if (type == "kline") {
            // console.log("klines")
            const newCandleData: any = {
              open: Number(message.data.o),
              close: Number(message.data.c),
              high: Number(message.data.h),
              low: Number(message.data.l),
              time: message.data.T.split("T")[0]
            }
            const newHistogramData: any = {
              value: Number(message.data.v),
              time: message.data.T.split("T")[0]
            }
            // console.log("new candle")
            // console.log(newCandleData)
            // console.log("new histogram")
            // console.log(newHistogramData)
            callback({ newCandle: newCandleData, newHistogram: newHistogramData })
          }
          if (type == "trade") {

            // Example timestamp in microseconds
            const microseconds = message.data.E;

            // Convert microseconds to milliseconds
            const milliseconds = Math.floor(microseconds / 1000);

            // Create a Date object
            const date = new Date(milliseconds);

            // Extract hours, minutes, and seconds in local time
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');

            // Format the time in HH:mm:ss
            const localTime = `${hours}:${minutes}:${seconds}`;

            const newTrade: any = {
              price: message.data.p,
              quantity: message.data.q,
              timestamp: localTime
            }
            callback(newTrade)
          }
        })
      }

    }
  }

  sendMessage(message: any) {
    const messageToSend = {
      ...message,
      id: this.id++
    }
    if (!this.initialised) {
      this.arrayMessage.push(messageToSend)
      return
    }
    this.ws.send(JSON.stringify(messageToSend))
  }

  async registerCallback(type: string, callback: any, id: string) {
    this.callback[type] = this.callback[type] || []
    this.callback[type].push({ callback, id })
  }

  async deRegisterCallback(type: string, id: string) {
    if (this.callback[type]) {
      const index = this.callback[type].findIndex(callback => callback.id == id)
      if (index !== -1) {
        this.callback[type].splice(index, 1)
      }
    }
  }
}

