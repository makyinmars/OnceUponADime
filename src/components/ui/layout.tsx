import Footer from "./footer"
import Header from "./header"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="m-4">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
