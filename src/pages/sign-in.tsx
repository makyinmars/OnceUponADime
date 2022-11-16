import { useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { GetServerSidePropsContext } from "next"
import { User } from "@prisma/client"

import { getServerAuthSession } from "src/server/common/get-server-session"
import { trpc } from "src/utils/trpc"
import { useStore } from "src/utils/zustand"
import Meta from "src/components/common/meta"

const SignIn = () => {
  const { data: session } = useSession()
  const { setUser, user } = useStore()

  let dataUser: User | null = user ? user : null

  if (session) {
    const email = session.user?.email as string
    const { data } = trpc.user.getUserByEmail.useQuery({ email })
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
    const { data } = trpc.user.getAdminByEmail.useQuery({ email })
    if (data?.isAdmin) {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <Meta
            title="Sign In - Sign Out"
            description="Sign in and sign out"
            keywords="Sign in, login, logout, Sign out"
          />
          <p className="text-lg">Signed in as {data.email}</p>
          <p></p>
          <button onClick={() => signOut()} className="button">
            Sign out
          </button>
          <Link href="/admin">
            <button onClick={() => setUser(data)} className="button">
              Admin page
            </button>
          </Link>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <p>Signed in as {session.user?.email}</p>
          <p>You can add comments on blogs now</p>
          <button onClick={() => signOut()} className="button">
            Sign out
          </button>
        </div>
      )
    }
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p>Not signed in</p>
        <button onClick={() => signIn()} className="button">
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
      session: await getServerAuthSession(ctx),
    },
  }
}
