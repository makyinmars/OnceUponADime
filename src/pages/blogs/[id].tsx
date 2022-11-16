import { useEffect } from "react"
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import superjson from "superjson"

import { trpc } from "src/utils/trpc"
import { prisma } from "src/server/db/client"
import { appRouter } from "src/server/trpc/router/_app"
import { createContext, createContextInner } from "src/server/trpc/context"
import BlogCommon from "src/components/common/blog"
import Loading from "src/components/common/loading"

const Blog = () => {
  const id = ""
  const utils = trpc.useContext()
  const { data, isLoading } = trpc.blog.getPublishedBlog.useQuery({ id })
  const { data: blogComments } = trpc.comment.getCommentsByBlogId.useQuery({
    blogId: id,
  })

  useEffect(() => {
    if (data) {
      utils.blog.getPublishedBlog.invalidate()
    }
  }, [data, utils, id])

  return (
    <div className="container p-4 mx-auto">
      {isLoading && <Loading />}
      <BlogCommon blog={data} blogComments={blogComments} />
    </div>
  )
}

export default Blog

/* export async function getStaticProps( */
/*   context: GetStaticPropsContext<{ id: string }> */
/**/
/* ) { */
/*   const { session, prisma } = await createContextInner() */
/**/
/*   const ssg = createSSGHelpers({ */
/*     router: appRouter, */
/*     ctx: {  session, prisma }, */
/*     transformer: superjson, */
/*   }) */
/**/
/*   const id = context.params?.id as string */
/**/
/*   await ssg.fetchQuery("blog.getPublishedBlog", { id }) */
/**/
/*   return { */
/*     props: { */
/*       trpcState: ssg.dehydrate(), */
/*       id, */
/*     }, */
/*     revalidate: 1, */
/*   } */
/* } */
/**/
/* export const getStaticPaths: GetStaticPaths = async () => { */
/*   const blogs = await prisma.blog.findMany({ */
/*     where: { */
/*       published: true, */
/*     }, */
/*     select: { */
/*       id: true, */
/*     }, */
/*   }) */
/**/
/*   return { */
/*     paths: blogs.map((blog) => ({ params: { id: blog.id } })), */
/*     fallback: false, */
/*   } */
/* } */
