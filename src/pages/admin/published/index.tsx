import { trpc } from "@/utils/trpc"

const Published = () => {
  const { data, isError, isLoading } = trpc.useQuery(["blog.getPublishedBlogs"])
  return (
    <div>
      <h2 className="text-center">Published</h2>
      {isLoading && <div>Loading...</div>}
      {data && (
        <div>
          {data.map((blog) => (
            <div key={blog.id}>
              <h3>{blog.title}</h3>
              <h3>{blog.author}</h3>
              <p>{blog.summary}</p>
              <img src={blog.imageUrl} alt={blog.title} />
              <p>{blog.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Published
