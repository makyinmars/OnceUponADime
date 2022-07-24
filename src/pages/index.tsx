import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import { trpc } from "@/utils/trpc"

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["blog.getLatestPublishedBlogs"])

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
        <h3 className="text-xl font-bold">Latest blogs</h3>
        <div className="grid grid-cols-2 gap-4">
          {isLoading ? <p>Loading latest blogs...</p> : null}
          {data &&
            data.map((blog) => (
              <div
                key={blog.id}
                className="p-4 bg-transparent border-2 rounded shadow-sm border-slate-700 shadow-slate-700"
              >
                <h2 className="pb-4 text-lg font-bold text-center">
                  {blog.title}
                </h2>
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
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
