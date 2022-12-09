import Loading from "src/components/common/loading"
import Table from "src/components/common/table"
import { trpc } from "src/utils/trpc"
import Meta from "src/components/common/meta"
import { GetServerSidePropsContext } from "next"
import { ssrInit } from "src/utils/ssg"

const Drafts = () => {
  const { data, isError, isLoading } = trpc.blog.getDraftBlogs.useQuery()

  if (isError) {
    return <div>Error!</div>
  }
  return (
    <div className="container mx-auto p-2">
      <Meta title="Drafts" description="" keywords="" />
      <h2 className="title mb-4">Drafted Blogs</h2>
      {isLoading && <Loading />}
      {data && <Table blogs={data} />}
    </div>
  )
}

export default Drafts

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { ssg, session } = await ssrInit(context)

  const email = session?.user?.email as string

  if (email) {
    const user = await ssg.user.getAdminByEmail.fetch({ email })

    if (user) {
      await ssg.blog.getDraftBlogs.prefetch()
      return {
        props: {
          trpcState: ssg.dehydrate(),
        },
      }
    } else {
      return {
        props: {
          trpcState: ssg.dehydrate(),
        },
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    }
  } else {
    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
}
