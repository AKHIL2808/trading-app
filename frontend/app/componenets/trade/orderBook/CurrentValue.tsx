"use client"

import { useAppSelector } from "@/lib/hooks"
import { useEffect, useRef } from "react"

export default function CurrentValue() {
  const currentValue = useAppSelector((state) => state.fetchTickerValue.tickerData?.lastPrice) || ""
  let previousValue

  previousValue = usePrevious(currentValue)
  // console.log(currentValue)
  // console.log(previousValue)
  return (
    <div className={Number(currentValue) > Number(previousValue) ? "text-radium-green text-xl font-bold" : "text-radium-red text-xl font-bold"}>{currentValue}</div>
  )
}

function usePrevious(currentValue) {
  const ref = useRef()
  useEffect(() => {
    ref.current = currentValue
  })
  return ref.current
}
