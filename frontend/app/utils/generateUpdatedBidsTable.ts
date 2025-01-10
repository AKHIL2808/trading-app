
export default function generateUpdatedBidsTable(updateValues, bidsTable1) {
  // Step 1: Convert the askTable into a Map for efficient lookups
  const bidsTable = [...bidsTable1].reverse()
  let mappedBidsTable = new Map(bidsTable.map(([price, quantity]) => [Number(price), Number(quantity)]));

  // Step 2: Process the updates from the websocket
  for (const [priceStr, quantityStr] of updateValues) {
    const price = Number(priceStr);
    const quantity = Number(quantityStr);

    if (quantity === 0) {
      // If quantity is 0, remove the entry
      mappedBidsTable.delete(price);
    } else {
      // Add or update the price with the new quantity
      mappedBidsTable.set(price, quantity);
    }
  }

  // Step 3: Convert the Map back to a sorted array
  const sortedBids = Array.from(mappedBidsTable)
    .sort((a, b) => b[0] - a[0]); // Ensure the order is ascending

  // Step 4: Prepare the first 20 elements with cumulative quantities
  const bids: number[][] = [];
  let totalAskShares = 0;

  for (let i = 0; i < Math.min(20, sortedBids.length); i++) {
    const [price, quantity] = sortedBids[i];
    totalAskShares = Math.round((totalAskShares + quantity) * 100) / 100;
    bids.push([price, quantity, totalAskShares]);
  }

  // Return both the updated full table and the top 20 asks
  return {
    updatedFullBids: sortedBids.reverse(),
    updatedBids: bids,
  };
}
