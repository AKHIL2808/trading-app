//
"use client"

import { setFalse, setTrue } from "@/lib/features/buySellBtnClicked/buySellBtnClickedSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"

// import { useState } from "react"

export default function () {
  // const [clicked, setClicked] = useState(true)
  const clicked = useAppSelector((state) => state.buySellBtnClicked.value)
  const setClicked = useAppDispatch()
  return (
    <div className="grid grid-cols-2 bg-background-tile-top/100 rounded-lg" >
      <div onClick={() => {
        setClicked(setTrue())
      }} className={`cursor-pointer hover:text-radium-green ${clicked ? " text-radium-green bg-radium-green/[16%] rounded-lg flex justify-center items-center " : "text-trade-text-color/100 bg-background-tile-top/100  rounded-lg flex justify-center items-center"}`}>
        <button >Buy</button>
      </div>
      <div onClick={() => {
        setClicked(setFalse())
      }} className={`cursor-pointer hover:text-radium-red ${!clicked ? " text-radium-red bg-radium-red/[16%] rounded-lg flex justify-center items-center" : " text-trade-text-color/100 bg-background-tile-top/100 rounded-lg flex justify-center items-center"}`}>
        <button >Sell</button>
      </div>
    </div>
  )
}
