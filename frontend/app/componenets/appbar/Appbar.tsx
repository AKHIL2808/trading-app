import Link from "next/link"
// import { FaSearch } from "react-icons/fa"
import ConditionBtn from "./SignupInBtn"
import InputComponent from "./InputComponent"
import { cryptocurrencies } from "@/app/utils/coinVaues"
import axios from "axios"
import { symlinkSync } from "fs"

export default async function Appbar() {
  const nameAndSymbols = cryptocurrencies
  const tickerValues = await axios.get(
    "https://api.backpack.exchange/api/v1/tickers"
  );
  const relevantData = nameAndSymbols.map((data, index) => {
    const filteredData = tickerValues.data.find(
      (tickerValue) =>
        tickerValue.symbol.split("_")[0].toLowerCase() === data.symbol.toLowerCase()
    )
    // console.log(filteredData)
    let change = null
    if (filteredData) {
      const stringOFChange = String(filteredData.priceChangePercent)
      if (stringOFChange.startsWith("-")) {
        const value = String(Math.floor((parseFloat(stringOFChange.substring(1)) * 100) * 100) / 100)
        change = `-${value}`
      } else {
        const value = String(Math.floor((parseFloat(stringOFChange) * 100) * 100) / 100)
        change = value
      }
    }
    return {
      key: index,
      name: data.name,
      symbol: data.symbol,
      pairs: filteredData ? filteredData.symbol.toLowerCase() : null,
      price: filteredData ? filteredData.lastPrice : null,
      change: change
    }
  })
  return (
    <div className="bg-black sticky grid grid-cols-3 grid-rows-1 ">
      <div className="flex align-middle">
        <Link href={"/market"} className="m-2 p-2 flex justify-center items-center">Market</Link>
        <Link href={"/trade/sol_usdc"} className="m-2 p-2 flex justify-center items-center">Spot</Link>
      </div>

      < div className="flex justify-center items-center">
        {/* <div className="bg-background-tile/100 flex justify-center items-center h-10 w-72 rounded-xl focus-within:border focus-within:border-radium-blue focus-within:outline-radium-blue"> */}
        {/*   <FaSearch className="m-1" /> */}
        {/*   <input type="search" placeholder="Search Coins..." className="bg-transparent p-1 m-1 focus:border-transparent focus:outline-none" /> */}
        {/* </div> */}
        <InputComponent datas={relevantData} />
      </div>
      <ConditionBtn></ConditionBtn>
    </div>

  )
}
