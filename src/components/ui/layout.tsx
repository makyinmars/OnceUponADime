import Footer from "./footer"
import Header from "./header"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen py-4">
      <Header />
      <div className="p-4 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 text-slate-700 grow">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
