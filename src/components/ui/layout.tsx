import Footer from "./footer"
import Header from "./header"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen py-4">
      <Header />
      <div className="p-4 grow">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
