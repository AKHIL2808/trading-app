"use client"
import { useAppSelector } from "@/lib/hooks"
// import axios from "axios"
// import AsksTable from "./AsksTable"
// import BidsTable from "./BidsTable"
import BookTradeBtnClicked from "./BookTradeBtnClicked"
import CurrentValue from "./CurrentValue"
// import TradesTable from "./TradesTable"
import Skeleton from "react-loading-skeleton"
import { lazy, Suspense } from "react"
const AsksTable = lazy(() => import("./AsksTable"))
const BidsTable = lazy(() => import("./BidsTable"))
const TradesTable = lazy(() => import("./TradesTable"))


export default function OrderBook({ path }: { path: string }) {
  // const bidsAndAsks = await axios.get(`https://api.backpack.exchange/api/v1/depth?symbol=${path}`)
  const coinName = path.split("_")[0]
  const clicked = useAppSelector((state) => state.bookTradeBtnClicked.value)
  // const fullAsks = bidsAndAsks.data.asks
  // const fullBids = (bidsAndAsks.data.bids).reverse()
  // console.log(fullAsks)
  // const [success, setSuccess] = useState(false)
  // if (!success) {
  //   callAllFunction(path)
  //   setSuccess(true)
  // }
  return (
    <div className="grid m-4 gap-4 overflow-auto">
      {/* <CallAllFunctions path={path} /> */}
      <div className="sticky grid grid-rows-4 max-h-20">
        <div className=" grid grid-cols-4 row-span-2">
          <BookTradeBtnClicked value={"Book"} />
          <BookTradeBtnClicked value={"Trade"} />
        </div>
        {clicked == "Book" &&
          <div className="row-span-2 mt-2 bg-background-tile/100 z-10 top-0">
            <div className="grid grid-cols-3 bg-background-tile/100">
              <h2 className="flex justify-center items-center font-bold">Price(USDC)</h2>
              <h2 className="flex justify-center items-center text-trade-text-color/100">Size({coinName})</h2>
              <h2 className="flex justify-center items-center text-trade-text-color/100">Total({coinName})</h2>
            </div>
          </div>}

        {clicked == "Trade" &&
          <div className="row-span-2 mt-2 bg-background-tile/100 z-10 top-0">
            <div className="grid grid-cols-3 bg-background-tile/100">
              <h2 className="flex justify-center items-center text-trade-text-color/100">Price(USDC)</h2>
              <h2 className="flex justify-center items-center text-trade-text-color/100">Qty({coinName})</h2>
            </div>
          </div>}
      </div>
      {clicked == "Book" && <div className="grid max-h-full overflow-y-scroll no-scrollbar">

        <Suspense fallback={
          <div className="w-full h-64">
            <Skeleton
              className="w-full h-full animate-pulse rounded-md"
              baseColor="rgba(32, 33, 39, 0.8)" // Base color for the skeleton background
              highlightColor="rgba(32, 33, 39, 0.6)" // Highlight color for the shimmer
              style={{
                backgroundColor: "rgba(32, 33, 39, 1)", // Ensures the background matches
                borderRadius: "8px", // Optional: Rounded corners
              }}
            />
          </div>
        }>
          <AsksTable path={path} />
        </Suspense>

        {<CurrentValue /> || <Skeleton />}

        <Suspense fallback={
          <div className="w-full h-64">
            <Skeleton
              className="w-full h-full animate-pulse rounded-md"
              baseColor="rgba(32, 33, 39, 0.8)" // Base color for the skeleton background
              highlightColor="rgba(32, 33, 39, 0.6)" // Highlight color for the shimmer
              style={{
                backgroundColor: "rgba(32, 33, 39, 1)", // Ensures the background matches
                borderRadius: "8px", // Optional: Rounded corners
              }}
            />
          </div>
        }>
          <BidsTable path={path} />
        </Suspense>
      </div>}

      {clicked == "Trade" && <div className="grid max-h-full overflow-y-scroll no-scrollbar">

        <Suspense fallback={
          <div className="w-full h-screen">
            <Skeleton
              className="w-full h-full animate-pulse rounded-md"
              baseColor="rgba(32, 33, 39, 0.8)" // Base color for the skeleton background
              highlightColor="rgba(32, 33, 39, 0.6)" // Highlight color for the shimmer
              style={{
                backgroundColor: "rgba(32, 33, 39, 1)", // Ensures the background matches
                borderRadius: "8px", // Optional: Rounded corners
              }}
            />
          </div>
        }>
          <TradesTable path={path} />
        </Suspense>
      </div>}
    </div>

  )
} 
