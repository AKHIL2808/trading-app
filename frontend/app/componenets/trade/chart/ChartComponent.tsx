import CandleSticks from "./CandleSticks"
export default async function ChartComponent({ path }: { path: string }) {
  return (
    <CandleSticks path={path} />
  )

}
