import Image from "next/image"

import LoadingSVG from "src/assets/puff.svg"

const Loading = () => {
  return (
    <div className="flex items-center justify-center p-8 animate-fade-in-delay">
      <Image src={LoadingSVG} alt="loading..." width={200} height={200} />
    </div>
  )
}

export default Loading
