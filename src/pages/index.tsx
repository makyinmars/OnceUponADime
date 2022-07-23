import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"

const latestBlogs = [
  {
    id: "1",
    title: "Hello World",
    summary: "This is a blog post",
    imageUrl: "https://source.unsplash.com/random/900×700/?fruit",
    content: "This is the content of the blog post",
    createdAt: "2020-01-01",
    updatedAt: "2020-01-01",
  },
  {
    id: "2",
    title: "Hello World 2",
    summary: "This is a blog post 2",
    imageUrl: "https://source.unsplash.com/random/?city,night",
    content: "This is the content of the blog post",
    createdAt: "2020-01-01",
    updatedAt: "2020-01-01",
  },
]

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Once Upon A Dime</title>
        <meta name="description" content="Once Upon A Dime Economics Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center gap-4">
        <div>
          <Image
            src="/assets/once-upon-a-dime.png"
            alt="Once Upon A Dime"
            width={250}
            height={250}
          />
        </div>
        <h1 className="text-xl font-bold">HOME MESSAGE</h1>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et culpa
          architecto cupiditate modi! Commodi dolorem minima, nulla
          exercitationem atque, architecto dicta, explicabo ut repellendus
          asperiores labore! Ex quae eum ullam. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Et culpa architecto cupiditate modi!
          Commodi dolorem minima, nulla exercitationem atque, architecto dicta,
          explicabo ut repellendus asperiores labore! Ex quae eum ullam. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Et culpa architecto
          cupiditate modi! Commodi dolorem minima, nulla exercitationem atque,
          architecto dicta, explicabo ut repellendus asperiores labore! Ex quae
          eum ullam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
          culpa architecto cupiditate modi! Commodi dolorem minima, nulla
          exercitationem atque, architecto dicta, explicabo ut repellendus
          asperiores labore! Ex quae eum ullam
        </p>
        <div className="grid grid-cols-2 gap-4">
          {latestBlogs.map((blog) => (
            <div
              key={blog.id}
              className="p-4 rounded shadow-sm bg-slate-100 shadow-slate-700"
            >
              <h2 className="pb-4 text-lg font-bold text-center">
                {blog.title}
              </h2>
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                width={300}
                height={300}
                className="rounded-lg"
              />
              <div className="p-2 rounded shadow-inner shadow-slate-700">
                <p>
                  <span className="font-bold">Reading Time: </span>2 min
                </p>
                <p>{blog.summary}</p>
              </div>
              <div className="flex justify-center pt-4">
                <button className="p-2 font-bold rounded shadow-md bg-slate-200 hover:bg-slate-700 hover:text-slate-200 shadow-slate-700">
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold">OTHER INFO MESSAGE</h2>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et culpa
          architecto cupiditate modi! Commodi dolorem minima, nulla
          exercitationem atque, architecto dicta, explicabo ut repellendus
          asperiores labore! Ex quae eum ullam. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Et culpa architecto cupiditate modi!
          Commodi dolorem minima, nulla exercitationem atque, architecto dicta,
          explicabo ut repellendus asperiores labore! Ex quae eum ullam. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Et culpa architecto
          cupiditate modi! Commodi dolorem minima, nulla exercitationem atque,
          architecto dicta, explicabo ut repellendus asperiores labore! Ex quae
          eum ullam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
          culpa architecto cupiditate modi! Commodi dolorem minima, nulla
          exercitationem atque, architecto dicta, explicabo ut repellendus
          asperiores labore! Ex quae eum ullam
        </p>
      </div>
    </>
  )
}

export default Home
