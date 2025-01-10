"use client"

import { setBook, setTrade } from "@/lib/features/bookTradeBtnClicked/BookTradeBtnClicked"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
// import { useState } from "react"

export default function BookTradeBtnClicked({ value }: { value: string }) {
  // const [clicked, setClicked] = useState("Book")
  const clicked = useAppSelector((state) => state.bookTradeBtnClicked.value)
  const setClicked = useAppDispatch()
  // console.log("value", value)
  return (
    <div onClick={() => {
      if (value == "Book") {
        setClicked(setBook())
      } else {
        setClicked(setTrade())
      }
    }} className={`flex justify-center items-center hover:cursor-pointer  ${clicked == value ? "bg-background-tile-top/100 text-white  rounded-md" : "  text-trade-text-color/70 rounded-md"}  `}>
      <button value={value}>{value}</button>
    </div>
  )
}
