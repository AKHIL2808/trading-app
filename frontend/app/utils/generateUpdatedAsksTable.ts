

// export function generateUpdatedAsksTable(updateValues: string[][], asksTable: string[][]) {
//   let count = 0
//   let totalAsks = 0
//   const arrayToUpdate = updateValues
//   console.log("array to update length")
//   console.log(arrayToUpdate)
//   console.log(arrayToUpdate.length)
//   const asksCopy = asksTable
//   const asks = asksCopy
//   console.log("asks in generate")
//   console.log(asks)
//   const updatedAsks = []
//   if (arrayToUpdate.length != 0) {
//     for (let i = 0; i <= asks.length; i++) {
//       if (updatedAsks.length <= 20) {
//         for (let j = count; j <= asks.length; j++) {
//           if (updatedAsks.length <= 20) {
//             console.log("arrayToUpdate checking")
//             console.log(arrayToUpdate[i])
//             if (arrayToUpdate[i] != undefined && Number(arrayToUpdate[i][0]) == Number(asks[j][0])) {
//               if (arrayToUpdate[i][1] == "0.00") {
//                 // asks.splice(j, 1)
//                 count++
//                 break;
//               } else {
//                 // asks[j][1] = arrayToUpdate[i][1]
//                 const ask = Number(asks[j][0])
//                 const amount = Number(arrayToUpdate[i][1])
//                 const total = Number(totalAsks + amount)
//                 const single = []
//                 single.push(ask, amount, total)
//                 updatedAsks.push(single)
//                 count++
//                 break;
//               }
//             } else if (arrayToUpdate[i] != undefined && Number(arrayToUpdate[i][0]) < Number(asks[j][0])) {
//               const ask = Number(arrayToUpdate[i][0])
//               const amount = Number(arrayToUpdate[i][1])
//               const total = Number(totalAsks + amount)
//               const single = []
//               single.push(ask, amount, total)
//               updatedAsks.push(single)
//               break
//             } else {
//               const ask = Number(asks[j][0])
//               const amount = Number(asks[j][1])
//               const total = Number(totalAsks + amount)
//               const single = []
//               single.push(ask, amount, total)
//               updatedAsks.push(single)
//               count++
//             }
//           } else {
//             break;
//           }
//         }
//       } else {
//         break;
//       }
//     }
//   } else {
//     console.log("returning asks previous")
//     return asks
//   }
//   console.log("updated asks in generate table")
//   console.log(updatedAsks)
//   return updatedAsks
// }

import { argv0 } from "process"



// export function generateUpdatedAsksTable(updateValues, asksTable1) {
//   let updatedAsks = [];
//   let totalAsks = 0;
//   // const asksTable = asksTable1.reverse()
//   const asksTable = [...asksTable1].reverse()
//
//   // Create a map for quick lookup of updateValues
//   const updatesMap = new Map(updateValues.map(([price, amount]) => [Number(price), Number(amount)]));
//
//   // Process the asksTable while applying updates
//   for (let i = 0; i < asksTable.length; i++) {
//     const askPrice = Number(asksTable[i][0]);
//     const askAmount = Number(asksTable[i][1]);
//
//     if (updatesMap.has(askPrice)) {
//       const updatedAmount = updatesMap.get(askPrice);
//
//       if (updatedAmount === 0) {
//         // If the updated amount is zero, skip (remove the level)
//         updatesMap.delete(askPrice);
//         continue;
//       } else {
//         // Update the amount
//         totalAsks = Math.round((totalAsks + updatedAmount) * 100) / 100;
//         updatedAsks.push([askPrice, updatedAmount, totalAsks]);
//         updatesMap.delete(askPrice);
//       }
//     } else {
//       // No update for this price level, keep it as is
//       totalAsks = Math.round((totalAsks + askAmount) * 100) / 100;
//       updatedAsks.push([askPrice, askAmount, totalAsks]);
//     }
//
//     // Stop if we have 20 levels
//     if (updatedAsks.length === 20) break;
//   }
//
//   // Add remaining updates (new levels)
//   for (const [price, amount] of updatesMap.entries()) {
//     if (amount !== 0) {
//       totalAsks = Math.round((totalAsks + amount) * 100) / 100;
//       updatedAsks.push([price, amount, totalAsks]);
//     }
//
//     // Stop if we have 20 levels
//     if (updatedAsks.length === 20) break;
//   }
//
//   // Sort the updatedAsks array by price (ascending order)
//   updatedAsks.sort((a, b) => a[0] - b[0]);
//
//   return updatedAsks.reverse();
// }


//
// export default function generateUpdatedAsksTable(updateValues, asktable) {
//   const askTableCopy = [...asktable]
//   let mappedAskTable = new Map(asktable.map(([price, quantity]) => [Number(price), Number(quantity)]))
//   // const mappedUpdatedValues = new Map(updateValues.map(([price, quantity]) => [Number(price), Number(quantity)]))
//   let count = 0
//   for (let i = 0; i < updateValues.length; i++) {
//     const askPrice = Number(updateValues[i][0])
//     const askQuantity = Number(updateValues[i][1])
//     if (mappedAskTable.has(askPrice)) {
//       const index = askTableCopy.indexOf(askPrice)
//       count = index
//       if (askQuantity == 0) {
//         mappedAskTable.delete(askPrice)
//       } else {
//         mappedAskTable.set(askPrice, askQuantity)
//       }
//     } else {
//       const array: number[][] = Array.from(mappedAskTable)
//       for (let j = count; j < array.length; j++) {
//         if (askPrice < array[j][0]) {
//           array.splice(j, 0, [askPrice, askQuantity])
//           break
//         } else {
//           array.push([askPrice, askQuantity])
//           break
//         }
//       }
//       mappedAskTable = new Map(array)
//     }
//   }
//   const askForFirstTwenty = Array.from(mappedAskTable)
//   let askLength = 20
//   if (askForFirstTwenty.length < 20) {
//     askLength = askForFirstTwenty.length
//   }
//   const asks: number[][] = []
//   let totalAskShares = 0
//   for (let i = 0; i < askLength; i++) {
//     let arrayOfAskWithTotal: number[] = []
//     const price: number = Number(askForFirstTwenty[i][0])
//     const quantity: number = Number(askForFirstTwenty[i][1])
//     totalAskShares = Math.round((totalAskShares + quantity) * 100) / 100
//     arrayOfAskWithTotal.push(price, quantity, totalAskShares)
//     asks.push(arrayOfAskWithTotal)
//   }
//   return { updatedFullAsks: askForFirstTwenty, updatedAsks: asks }
// }




export default function generateUpdatedAsksTable(updateValues, askTable) {
  // Step 1: Convert the askTable into a Map for efficient lookups
  let mappedAskTable = new Map(askTable.map(([price, quantity]) => [Number(price), Number(quantity)]));

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

  // Return both the updated full table and the top 20 asks
  return {
    updatedFullAsks: sortedAsks,
    updatedAsks: asks.reverse(),
  };
}
