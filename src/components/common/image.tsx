import ImageNext from "next/image"

interface ImageProps {
  src: string
  alt: string
}

const Image = ({ src, alt }: ImageProps) => {
  return (
    <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
      <ImageNext src={src} alt={alt} layout="responsive" className="rounded" />
    </div>
  )
}

export default Image
