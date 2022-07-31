import Head from "next/head"

interface MetaProps {
  title: string
  description: string
  keywords: string
}

const Meta = ({ title, description, keywords }: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Meta
