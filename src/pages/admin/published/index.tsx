import { GetServerSidePropsContext } from "next"

import { trpc } from "src/utils/trpc"
import Loading from "src/components/common/loading"
import Table from "src/components/common/table"
import Meta from "src/components/common/meta"
import { ssrInit } from "src/utils/ssg"

const Published = () => {
  const { data, isError, isLoading } =
    trpc.blog.getAdminPublishedBlogs.useQuery()

  if (isError) {
    return <div>Error!</div>
  }

  return (
    <div className="container mx-auto p-2">
      <Meta title="Published blogs" description="" keywords="" />
      <h2 className="title mb-4">Published Blogs</h2>
      {isLoading && <Loading />}
      {data && <Table blogs={data} />}
    </div>
  )
}

export default Published

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { ssg, session } = await ssrInit(context)

  const email = session?.user?.email as string

  if (email) {
    const user = await ssg.user.getAdminByEmail.fetch({ email })

    if (user) {
      await ssg.blog.getAdminPublishedBlogs.prefetch()
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
