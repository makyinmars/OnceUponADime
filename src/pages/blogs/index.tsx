import type { InferGetStaticPropsType } from "next"
import { useState } from "react"
import superjson from "superjson"
import { createSSGHelpers } from "@trpc/react/ssg"

import { createContext } from "@/server/router/context"
import { appRouter } from "@/server/router/"
import { trpc } from "@/utils/trpc"

import BlogsCommon from "@/components/common/blogs"
import Loading from "@/components/common/loading"
import Meta from "@/components/common/meta"

const Blogs = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data, isLoading } = trpc.useQuery(["blog.getPublishedBlogs"])

  const [search, setSearch] = useState("")

  const { data: dataSearch, isLoading: isLoadingSearch } = trpc.useQuery([
    "blog.searchPublishedBlogs",
    { search: search },
  ])

  return (
    <div className="container p-4 mx-auto">
      <Meta
        title="Blogs"
        description="Displays all the blogs for the latest economics news"
        keywords="economics, news, blogs, latest blogs"
      />
      <h2 className="mb-4 title">Blogs</h2>
      <div className="flex justify-center gap-2 pb-4">
        <input
          type="text"
          className="input"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      {isLoadingSearch && <Loading />}
      <div className="flex flex-col gap-4">
        {dataSearch && <BlogsCommon blogs={dataSearch} />}
        {dataSearch && dataSearch.length <= 0 && (
          <p className="self-center font-bold text-slate-700 md:text-lg lg:text-xl">
            No results with that search. Try again :D
          </p>
        )}
      </div>
    </div>
  )
}

export default Blogs

export async function getStaticProps() {
  const { req, res, session, prisma } = await createContext()

  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: { req, res, session, prisma },
    transformer: superjson,
  })

  await ssg.fetchQuery("blog.getLatestPublishedBlogs")

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  }
}
