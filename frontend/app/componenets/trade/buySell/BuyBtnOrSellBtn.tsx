"use client"

import { useAppSelector } from "@/lib/hooks";

export default function BuyBtnOrSellBtn() {
  const clicked = useAppSelector((state) => state.buySellBtnClicked.value)

  return (
    <button className={`text-black rounded-md font-bold ${clicked ? "bg-radium-green/[50%]" : "bg-radium-red/[50%]"}`}>{clicked ? "Buy" : "Sell"}</button>
  )

}
