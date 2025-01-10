import { signIn } from "@/auth"

export default function () {
  return <div>
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/market" })

      }}
    ><button type="submit">Signin with google</button> </form>
  </div>
}


// "use client"
// import { signIn } from "next-auth/react"
//
// export default function SignIn() {
//   return <button onClick={() => signIn("google")}>signin with google</button>
// }
