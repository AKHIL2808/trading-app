import BuySellBtn from "./BuySellBtn"
import InputValue from "./InputValue"
import LimitMarketBtn from "./LimitMarketBtn"
import SignTrade from "./SignTrade"

export default function BuySell({ path }: { path: string }) {
  return <div className="overflow-auto grid grid-cols-1 grid-rows-8 gap-4 p-4 ">
    <div className="row-span-1 grid">
      <BuySellBtn />
    </div>
    <div className="row-span-1 grid grid-cols-4 grid-rows-2">
      <LimitMarketBtn order={"Limit"} />
      <LimitMarketBtn order={"Market"} />
    </div>
    <InputValue path={path} />
    <div className="row-span-2 grid">
      <SignTrade />
    </div>
  </div>
}
