"use client"

import { setOrderValue } from "@/lib/features/calculateInputValue/calculateInputValueSlice"
import { setLimit, setMarket } from "@/lib/features/limitMarketBtnClicked/limitMarketBtnClickedSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"

export default function LimitMarketBtn({ order }: { order: string }) {
  const clicked = useAppSelector((state) => state.limitMarketBtnClicked.value)
  const setClicked = useAppDispatch()
  return (

    <div onClick={() => {
      if (order == "Limit") {
        setClicked(setLimit())
        setClicked(setOrderValue(0))
      } else {
        setClicked(setMarket())
        setClicked(setOrderValue(0))
      }
    }} className={`flex justify-center items-center hover:cursor-pointer  ${clicked == order ? "bg-background-tile-top/100 text-white  rounded-md" : "  text-trade-text-color/70 rounded-md"}  `}> <button value={order} >{order}</button>
    </div>
  )
}
