import { useRouter } from "next/router"

import { trpc } from "src/utils/trpc"

interface PublishOrDraftBlogProps {
  id: string
  draft: boolean
  published: boolean
}

const PublishOrDraftBlog = ({
  id,
  draft,
  published,
}: PublishOrDraftBlogProps) => {
  const router = useRouter()

  const utils = trpc.useContext()
  const publishBlog = trpc.blog.publishBlog.useMutation({
    async onSuccess() {
      await utils.blog.getAdminPublishedBlogs.invalidate()
      router.push("/admin/published")
    },
  })
  const draftBlog = trpc.blog.draftBlog.useMutation({
    async onSuccess() {
      await utils.blog.getDraftBlogs.invalidate()
      router.push("/admin/drafts")
    },
  })

  const deleteBlog = trpc.blog.deleteBlog.useMutation({
    async onSuccess() {
      // Check what type of blog deletes to invalidate the proper query
      router.push("/admin")
    },
  })

  const onPublishOrDraft = async () => {
    try {
      if (draft) {
        await publishBlog.mutateAsync({ id })
      }
      if (published) {
        await draftBlog.mutateAsync({ id })
      }
    } catch {}
  }

  const onDeleteBlog = async () => {
    try {
      await deleteBlog.mutateAsync({ id })
    } catch {}
  }

  return (
    <div className="flex gap-4 justify-center">
      <div className="flex justify-center gap-4">
        <button
          className="button"
          type="submit"
          onClick={() => onPublishOrDraft()}
        >
          {draft ? "Publish Me" : "Draft me"}
        </button>
      </div>
      <div className="flex justify-center gap-4">
        <button className="button" type="submit" onClick={() => onDeleteBlog()}>
          Delete Me
        </button>
      </div>
    </div>
  )
}

export default PublishOrDraftBlog
