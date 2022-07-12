import Footer from "./footer"
import Header from "./header"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="my-4">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
