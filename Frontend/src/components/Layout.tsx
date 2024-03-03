import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className='pt-10'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
