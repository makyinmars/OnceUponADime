import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react"
import { User } from "@prisma/client"

import { trpc } from "@/utils/trpc"
import { useStore } from "@/utils/zustand"
import { GetServerSidePropsContext } from "next"
import { getOnceUponADimeAuthSession } from "@/server/common/get-server-session"

const SignIn = () => {
  const { data: session } = useSession()
  const email = session?.user?.email as string

  const { data } = trpc.useQuery(["user.getUserByEmail", { email }])

  const { setUser } = useStore()

  useEffect(() => {
    setUser(data as User)
  }, [setUser, data])

  return (
    <div>
      {session ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <p>Signed in as {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="p-2 mx-auto rounded bg-slate-200"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <p>Not signed in</p>
          <button
            onClick={() => signIn()}
            className="p-2 mx-auto rounded bg-slate-200"
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  )
}

export default SignIn

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      session: await getOnceUponADimeAuthSession(ctx),
    },
  }
}
