import { Dialog, Transition } from "@headlessui/react"
import { Editor } from "@tinymce/tinymce-react"
import { Fragment, useState, useEffect, useRef } from "react"
import { Blog } from "@prisma/client"
import { useForm, SubmitHandler } from "react-hook-form"

import { trpc } from "@/utils/trpc"

interface BlogModalProps {
  id: string
  title: string
  author: string
  summary: string
  content: string
  imageUrl: string
  draft: boolean
  published: boolean
}

const BlogModal = ({
  id,
  title,
  author,
  summary,
  content,
  imageUrl,
  draft,
  published,
}: BlogModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<Blog>({
    defaultValues: {
      id: id,
      title: title,
      author: author,
      summary: summary,
      imageUrl: imageUrl,
      draft: draft,
      published: published,
    },
  })

  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const editorRef = useRef<any>(null)

  const utils = trpc.useContext()

  const updateDraft = trpc.useMutation("blog.updateBlog", {
    async onSuccess() {
      await utils.invalidateQueries(["blog.getDraftBlog", { id }])
      await utils.invalidateQueries(["blog.getDraftBlogs"])
      closeModal()
    },
  })

  const updatePublished = trpc.useMutation("blog.updateBlog", {
    async onSuccess() {
      await utils.invalidateQueries(["blog.getAdminPublishedBlog", { id }])
      await utils.invalidateQueries(["blog.getAdminPublishedBlogs"])
      closeModal()
    },
  })

  const onSumbit: SubmitHandler<Blog> = async (data) => {
    try {
      if (editorRef.current) {
        data.content = editorRef.current.getContent() as string
      }
      if (data.draft) {
        await updateDraft.mutateAsync(data)
      }
      if (data.published) {
        await updatePublished.mutateAsync(data)
      }
    } catch {}
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  return (
    <>
      <div className="flex justify-center">
        <button type="button" onClick={openModal} className="button">
          Edit Blog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-7/12 transform overflow-hidden rounded-2xl p-6 bg-violet-400 bg-opacity-80 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 text-slate-700 text-center font-bold md:text-xl"
                  >
                    {draft ? "Edit draft" : "Edit published"}
                  </Dialog.Title>
                  <div className="mt-2">
                    <form
                      className="flex flex-col gap-2"
                      onSubmit={handleSubmit(onSumbit)}
                    >
                      <input
                        type="text"
                        id="id"
                        {...register("id")}
                        className="hidden"
                      />
                      <label className="text-center" htmlFor="title">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        {...register("title")}
                        className="input"
                      />

                      <label className="text-center" htmlFor="author">
                        Author
                      </label>
                      <input
                        type="text"
                        id="author"
                        {...register("author")}
                        className="input"
                      />
                      <label className="text-center" htmlFor="summary">
                        Summary
                      </label>
                      <textarea
                        cols={4}
                        rows={4}
                        id="summary"
                        {...register("summary")}
                        className="input"
                      />
                      <label className="text-center" htmlFor="imageUrl">
                        Image Url
                      </label>
                      <input
                        type="text"
                        id="imageUrl"
                        {...register("imageUrl")}
                        className="input"
                      />
                      <label className="text-center" htmlFor="draft">
                        Draft
                      </label>

                      <input
                        type="text"
                        id="draft"
                        {...register("draft")}
                        className="input"
                      />
                      <label className="text-center" htmlFor="published">
                        Published
                      </label>
                      <input
                        type="text"
                        id="published"
                        {...register("published")}
                        className="input"
                      />

                      <div className="flex justify-center items-center pt-5">
                        <Editor
                          onInit={(evt, editor) =>
                            (editorRef.current = editor as any)
                          }
                          initialValue={content}
                          init={{
                            height: 900,
                            width: 900,
                            menubar: false,
                            plugins: [
                              "advlist",
                              "autolink",
                              "lists",
                              "link",
                              "image",
                              "charmap",
                              "anchor",
                              "searchreplace",
                              "visualblocks",
                              "code",
                              "image",
                              "fullscreen",
                              "insertdatetime",
                              "media",
                              "table",
                              "preview",
                              "help",
                              "wordcount",
                            ],
                            toolbar:
                              "image " +
                              "undo redo | blocks | " +
                              "bold italic forecolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | " +
                              "removeformat | help",
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          }}
                        />
                      </div>
                      <div className="mt-4 flex justify-center">
                        <button type="submit" className="button">
                          {draft ? "Update draft" : "Update published"}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default BlogModal
