import { trpc } from "@/utils/trpc"

const Drafts = () => {
  const { data, isError, isLoading } = trpc.useQuery(["blog.getDraftBlogs"])
  console.log(data)
  return (
    <div>
      <h2>Drafts</h2>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
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

export default Drafts
