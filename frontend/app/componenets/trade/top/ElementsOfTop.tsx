

import PriceForInput from "./PriceForInput"

interface propsElement {
  top: string,
  value: string,
  name: string
}



export default function ElementsOfTop({ top, value, name }: propsElement) {
  if (name === "price") {
    return <PriceForInput top={top} value={value} />
  }
  // "use server"
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-trade-text-color/100">{top}</div>
      <div>{value}</div>
    </div>

  )
}
