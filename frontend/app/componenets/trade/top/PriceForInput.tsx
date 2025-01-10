"use client"

import { setPrice } from "@/lib/features/calculateInputValue/calculateInputValueSlice"
import { useAppDispatch } from "@/lib/hooks"
import { useEffect, useRef } from "react"

export default function PriceForInput({ value, top }: { value: string, top: string }) {

  // const setInputPrice = useAppDispatch()
  // useEffect(() => {
  //   setInputPrice(setPrice(Number(value)))
  // }, [])
  const currentValue = value
  const previousValue = usePrevious(currentValue)
  return (
    <div className="flex flex-col justify-center items-center">
      <div className={Number(currentValue) > Number(previousValue) ? "text-radium-green text-xl font-bold" : "text-radium-red text-xl font-bold"}>{value}</div>
      <div className="text-trade-text-color/100 ">{top}</div>
    </div>

  )
}

function usePrevious(currentValue) {
  const ref = useRef()
  useEffect(() => {
    ref.current = currentValue
  })
  return ref.current
}
