import type { NextPage } from "next"
import Image from "next/image"

const Home: NextPage = () => {
  return (
    <main className="flex flex-col justify-center gap-4">
      <div className="flex justify-center mt-4">
        <Image
          src="/assets/once-upon-a-dime.png"
          width={100}
          height={100}
          alt="Once Upon A Dime log"
        />
      </div>
      <div>
        <h2 className="font-bold text-center text-md">WELCOME MESSAGE</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec</p>
      </div>
      <h2 className="text-lg font-bold text-center">Latest blogs</h2>
      <div className="p-2 rounded bg-violet-800">
        <h3 className="text-center">TITLE</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem molestiae optio earum, voluptatum, distinctio error
          perspiciatis delectus ab laboriosam est laudantium expedita debitis
          officia illum perferendis culpa aperiam saepe unde?
        </p>
        <p className="text-center">READ MORE</p>
      </div>
      <div className="p-2 rounded bg-violet-800">
        <h3 className="text-center">TITLE</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem molestiae optio earum, voluptatum, distinctio error
          perspiciatis delectus ab laboriosam est laudantium expedita debitis
          officia illum perferendis culpa aperiam saepe unde?
        </p>
        <p className="text-center">READ MORE</p>
      </div>
      <div className="p-2 rounded bg-violet-800">
        <h3 className="text-center">TITLE</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem molestiae optio earum, voluptatum, distinctio error
          perspiciatis delectus ab laboriosam est laudantium expedita debitis
          officia illum perferendis culpa aperiam saepe unde?
        </p>
        <p className="text-center">READ MORE</p>
      </div>
    </main>
  )
}

export default Home
