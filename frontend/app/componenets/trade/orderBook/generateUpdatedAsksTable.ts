
self.onmessage = function (message) {
  // console.log("in worker")
  const { updateValues, askTableFull } = message.data

  let mappedAskTable = new Map(askTableFull.map(([price, quantity]) => [Number(price), Number(quantity)]));

  // Step 2: Process the updates from the websocket
  for (const [priceStr, quantityStr] of updateValues) {
    const price = Number(priceStr);
    const quantity = Number(quantityStr);

    if (quantity === 0) {
      // If quantity is 0, remove the entry
      mappedAskTable.delete(price);
    } else {
      // Add or update the price with the new quantity
      mappedAskTable.set(price, quantity);
    }
  }

  // Step 3: Convert the Map back to a sorted array
  const sortedAsks = Array.from(mappedAskTable)
    .sort((a, b) => a[0] - b[0]); // Ensure the order is ascending

  // Step 4: Prepare the first 20 elements with cumulative quantities
  const asks: number[][] = [];
  let totalAskShares = 0;

  for (let i = 0; i < Math.min(20, sortedAsks.length); i++) {
    const [price, quantity] = sortedAsks[i];
    totalAskShares = Math.round((totalAskShares + quantity) * 100) / 100;
    asks.push([price, quantity, totalAskShares]);
  }
  postMessage(
    {
      updatedFullAsks: sortedAsks,
      updatedAsks: asks.reverse(),
    });
}
