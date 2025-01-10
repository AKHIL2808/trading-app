export function generateFirstAsksTable(fullAsks: string[][]) {

  // console.log("in create table")
  let askLength = 20
  if (fullAsks.length < 20) {
    askLength = fullAsks.length
  }
  const asks: number[][] = []
  let totalAskShares = 0
  for (let i = 0; i < askLength; i++) {
    let arrayOfAskWithTotal: number[] = []
    const price: number = Number(fullAsks[i][0])
    const quantity: number = Number(fullAsks[i][1])
    totalAskShares = Math.round((totalAskShares + quantity) * 100) / 100
    arrayOfAskWithTotal.push(price, quantity, totalAskShares)
    asks.push(arrayOfAskWithTotal)
  }
  // console.log("asks from frist render")
  // console.log(asks)
  return asks.reverse()
}
