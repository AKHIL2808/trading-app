import BuySell from "@/app/componenets/trade/buySell/BuySell";
import ChartComponent from "@/app/componenets/trade/chart/ChartComponent";
import OrderBook from "@/app/componenets/trade/orderBook/OrderBook";
import Top from "@/app/componenets/trade/top/Top";
interface TradePageProps {
  params: {
    tradePair: string;
  };
}
export default function ({ params }: TradePageProps) {
  const { tradePair } = params
  const capitalPath = tradePair.toUpperCase()
  // console.log(`capitalPath : ${capitalPath}`)
  return (
    <div className="grid overflow-hidden  grid-cols-8 grid-rows-8 h-full">
      <div className="row-span-1 col-span-8 rounded-lg bg-background-tile/100 mx-4 mt-4 mb-2 grid grid-cols-1 grid-rows-1"><Top path={capitalPath} /></div>
      <div className="row-span-7 col-span-2 bg-background-tile/100 rounded-lg mr-2 mt-2 mb-4 ml-4 grid"><OrderBook path={capitalPath} /></div>
      <div className="row-span-7 col-span-4 bg-background-tile/100 rounded-lg mt-2 mx-2 mb-4 grid grid-cols-1"><ChartComponent path={capitalPath} /></div>
      <div className="row-span-7 col-span-2 bg-background-tile/100 rounded-lg ml-2 mr-4 mt-2 mb-4 grid grid-cols-1 grid-rows-1"><BuySell path={capitalPath} /></div>
    </div>
  )
}
