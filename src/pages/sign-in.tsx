import { useSession, signIn, signOut } from "next-auth/react"
import { GetServerSidePropsContext } from "next"

import Meta from "src/components/common/meta"
import { ssrInit } from "src/utils/ssg"

const SignIn = () => {
  const { data: session } = useSession()

  return (
    <div>
      <Meta
        title="Sign In - Sign Out"
        description="Sign in and sign out"
        keywords="Sign in, login, logout, Sign out"
      />

      {session ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <p>Signed in as {session.user?.email}</p>
          <p>You can add comments on blogs now</p>
          <button onClick={() => signOut()} className="button">
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <p>Not signed in</p>
          <button onClick={() => signIn()} className="button">
            Sign in
          </button>
        </div>
      )}
    </div>
  )
}

export default SignIn

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { ssg, session } = await ssrInit(context)

  const email = session?.user?.email as string

  if (email) {
    const user = await ssg.user.getAdminByEmail.fetch({ email })

    if (user) {
      await ssg.blog.getLatestPublishedBlogs.prefetch()

      return {
        props: {
          trpcState: ssg.dehydrate(),
        },
        redirect: {
          destination: "/admin",
          permanent: false,
        },
      }
    } else {
      return {
        props: {
          trpcState: ssg.dehydrate(),
        },
      }
    }
  } else {
    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
    }
  }
}
