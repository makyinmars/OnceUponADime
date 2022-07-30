import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"

import { trpc } from "@/utils/trpc"
import Loading from "@/components/common/loading"
import Blogs from "@/components/common/blogs"

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["blog.getLatestPublishedBlogs"])

  return (
    <div className="container mx-auto">
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
        <h1 className="title">home message</h1>
        <p className="text-center lg:max-w-7xl">
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
        <h2 className="title">latest blogs</h2>
        {isLoading && <Loading />}
        <div className="flex flex-col gap-4">
          {data && <Blogs blogs={data} />}
        </div>

        <h2 className="title">other info message</h2>
        <p className="text-center lg:max-w-7xl">
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
    </div>
  )
}

export default Home
