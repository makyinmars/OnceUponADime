import { useRouter } from "next/router"

import { trpc } from "@/utils/trpc"

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
  const publishBlog = trpc.useMutation(["blog.publisBlog"], {
    async onSuccess() {
      await utils.invalidateQueries(["blog.getAdminPublishedBlogs"])
      router.push("/admin/published")
    },
  })
  const draftBlog = trpc.useMutation(["blog.draftBlog"], {
    async onSuccess() {
      await utils.invalidateQueries(["blog.getDraftBlogs"])
      router.push("/admin/drafts")
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

  return (
    <div className="flex justify-center gap-4">
      <button
        className="button"
        type="submit"
        onClick={() => onPublishOrDraft()}
      >
        {draft ? "Publish Me" : "Draft me"}
      </button>

    </div>
  )
}

export default PublishOrDraftBlog
