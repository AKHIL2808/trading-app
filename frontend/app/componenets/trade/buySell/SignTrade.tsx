import { auth } from "@/auth";
import Link from "next/link";
import BuyBtnOrSellBtn from "./BuyBtnOrSellBtn";

export default async function SignTrade() {
  const session = await auth()
  if (!session) {
    return (
      <div className="grid grid-rows-2 gap-2">
        <Link href={"/signup"} className="bg-white text-black rounded-lg flex justify-center items-center text-lg font-bold">Sign up to trade</Link>
        <Link href={"/signin"} className="bg-background-tile-top/100 text-white rounded-lg flex justify-center items-center text-lg font-bold">Sign in to trade</Link>
      </div>
    )
  } else {
    return (
      <div className="grid grid-rows-2 gap-2">
        <BuyBtnOrSellBtn />
      </div>
    )
  }
}
