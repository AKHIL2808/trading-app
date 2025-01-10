"use client"

import { setOrderValue, setPrice, setQuantity } from "@/lib/features/calculateInputValue/calculateInputValueSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import axios from "axios"
import Image from "next/image"
import { useEffect } from "react"

export default function InputValue({ path }: { path: string }) {
  const clicked = useAppSelector((state) => state.limitMarketBtnClicked.value)
  const { price, quantity, orderValue } = useAppSelector((state) => state.calculateInputValue)
  const pathStirng = path.split("_")[0].toLocaleLowerCase()
  const setValue = useAppDispatch()
  useEffect(() => {
    fetchPrice(path).then((price) => {
      setValue(setPrice(price))
    })
  }, [])
  return (
    <div className={clicked == "Limit" ? "row-span-3 grid grid-rows-3 gap-2" : "row-span-1 grid grid-rows-1"}>
      <div className={clicked == "Limit" ? "row-span-1 grid grid-rows-3 " : "hidden"}>
        <p className="row-span-1 text-trade-text-color/100">Price</p>
        <div className="row-span-2 grid grid-cols-5 bg-background-tile-top/100 rounded-md focus-within:border focus-within:border-radium-blue focus-within:outline-radium-blue">
          {/* <FaSearch className="m-1" /> */}
          <input type="number" placeholder="0" value={price} onChange={(e) => {
            setValue(setPrice(e.target.value))
            setValue(setOrderValue())
          }} className="p-2 col-span-4 appearance-none bg-transparent flex items-center justify-around text-3xl focus:border-transparent focus:outline-none" />
          <div className="flex justify-center items-center">
            <Image className="rounded-full" src={`/images/usdc.webp`} alt={`usdc logo`} width={30} height={30} />
          </div>
        </div>
      </div>

      <div className={clicked == "Limit" ? "row-span-1 grid grid-rows-3 " : "hidden"}>
        <p className="row-span-1 text-trade-text-color/100">Quantity</p>
        <div className="row-span-2 grid grid-cols-5 bg-background-tile-top/100 rounded-md focus-within:border focus-within:border-radium-blue focus-within:outline-radium-blue">
          {/* <FaSearch className="m-1" /> */}
          <input type="number" placeholder="0" value={quantity} onChange={(e) => {
            setValue(setQuantity(e.target.value))
            setValue(setOrderValue())
          }} className="p-2 col-span-4 appearance-none bg-transparent flex items-center justify-around text-3xl focus:border-transparent focus:outline-none" />

          <div className="flex justify-center items-center">
            <Image className="rounded-full" src={`/images/${pathStirng}.webp`} alt={`${pathStirng} logo`} width={30} height={30} />
          </div>
        </div>
      </div>
      <div className="row-span-1 grid grid-rows-3 ">
        <p className="row-span-1 text-trade-text-color/100">Order Value</p>
        <div className="row-span-2 grid grid-cols-5 bg-background-tile-top/100 rounded-md focus-within:border focus-within:border-radium-blue focus-within:outline-radium-blue">
          {/* <FaSearch className="m-1" /> */}
          <input type="number" placeholder="0" value={orderValue} onChange={(e) => { setValue(setOrderValue(Number(e.target.value))) }}
            className="p-2 col-span-4 appearance-none bg-transparent flex items-center justify-around text-3xl focus:border-transparent focus:outline-none" />
          <div className="flex justify-center items-center">
            <Image className="rounded-full" src={`/images/usdc.webp`} alt={`usdc logo`} width={30} height={30} />
          </div>
        </div>
      </div>
    </div>
  )
}

async function fetchPrice(path: string) {
  const allCoins = await axios.get("/api/ticker")
  const coin = allCoins.data.find((coin) => coin.symbol === path)
  return coin.lastPrice
}
