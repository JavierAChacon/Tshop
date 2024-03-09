import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
const Layout = (): JSX.Element => {
  return (
    <div className='max-w-screen-2xl mx-auto'>
      <Header />
      <main className='pt-10'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
