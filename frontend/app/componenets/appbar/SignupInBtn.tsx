import { auth, signOut } from "@/auth";
import Link from "next/link";
export default async function ConditionBtn() {
  const session = await auth()
  if (!session?.user) {
    return (
      <div className="flex flex-row-reverse  items-center">
        <Link href={"/signup"} className="p-2 m-2 text-radium-blue bg-radium-blue/[16%] rounded-lg">Sign up</Link>
        <Link href={"/signin"} className="m-2 p-2 text-radium-green bg-radium-green/[16%] rounded-lg">Sign in</Link>
      </div>
    )
  }
  return (
    <div className="flex flex-row-reverse m-2 p-2 items-center">
      <img className="rounded-full w-11 h-11" onClick={async () => {
        "use server"
        await signOut()
      }} src={session.user.image || ""} alt="avatar" />
    </div>
  )
}
