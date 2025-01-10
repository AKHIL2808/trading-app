export default function generateFirstBidsTable(fullBids1: string[][]) {
  const fullBids = [...fullBids1].reverse()
  let bidLength = 20
  if (fullBids.length < 20) {
    bidLength = fullBids.length
  }

  const bids: number[][] = []

  let totalBidsShare = 0

  for (let i = 0; i < bidLength; i++) {
    let arrayOfBidsWithTotal: number[] = []
    const price: number = Number(fullBids[i][0])
    const quantity: number = Number(fullBids[i][1])
    totalBidsShare = Math.round((totalBidsShare + quantity) * 100) / 100
    arrayOfBidsWithTotal.push(price, quantity, totalBidsShare)
    bids.push(arrayOfBidsWithTotal)
  }
  return bids
}
