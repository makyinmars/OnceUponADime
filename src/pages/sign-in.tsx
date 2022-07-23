import { useSession, signIn, signOut } from "next-auth/react"
import { GetServerSidePropsContext } from "next"

import { getOnceUponADimeAuthSession } from "@/server/common/get-server-session"
import { trpc } from "@/utils/trpc"
import { useStore } from "@/utils/zustand"
import { useEffect, useMemo } from "react"
import { User } from "@prisma/client"

const SignIn = () => {
  const { data: session } = useSession()
  const { setUser, user } = useStore()

  console.log(user)

  let dataUser: User | null = user ? user : null

  if (session) {
    const email = session.user?.email as string
    const { data, isLoading } = trpc.useQuery([
      "user.getUserByEmail",
      { email },
    ])
    if (data) {
      dataUser = data
    }
  }

  useEffect(() => {
    if (!session) {
      setUser(null)
    } else {
      setUser(dataUser)
    }
  }, [session, setUser, dataUser])

  if (session) {
    const email = session.user?.email as string
    const { data, isLoading } = trpc.useQuery([
      "user.getUserByEmail",
      { email },
    ])
    if (isLoading) {
      return <div>Loading...</div>
    }
    if (data?.isAdmin) {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-lg">Signed in as {data.name}</p>
          <p></p>
          <button
            onClick={() => signOut()}
            className="p-2 mx-auto rounded bg-slate-200"
          >
            Sign out
          </button>
          <button
            onClick={() => setUser(data)}
            className="p-2 mx-auto rounded bg-slate-200"
          >
            Admin page
          </button>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col">
          <p>Signed in as {session.user?.email}</p>
          <p>You are not an admin but you can comment on blogs!!</p>
          <button
            onClick={() => signOut()}
            className="p-2 mx-auto rounded bg-slate-200"
          >
            Sign out
          </button>
        </div>
      )
    }
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <p>Not signed in</p>
        <button
          onClick={() => signIn()}
          className="p-2 mx-auto rounded bg-slate-200"
        >
          Sign in
        </button>
      </div>
    )
  }
}

export default SignIn

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      session: await getOnceUponADimeAuthSession(ctx),
    },
  }
}
