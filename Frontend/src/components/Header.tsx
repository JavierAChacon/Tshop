import { Link } from 'react-router-dom'
import {
  FaGamepad,
  FaBriefcase,
  FaPaintBrush,
  FaHome,
  FaShoppingCart
} from 'react-icons/fa'
import { Sling as Hamburger } from 'hamburger-react'
import { useState } from 'react'

const Header = (): JSX.Element => {
  const routes = [
    {
      title: 'Cart',
      to: '/cart',
      Icon: FaShoppingCart
    },
    {
      title: 'Home',
      to: '/',
      Icon: FaHome
    },
    {
      title: 'Gaming',
      to: '/',
      Icon: FaGamepad
    },
    {
      title: 'Business',
      to: '/',
      Icon: FaBriefcase
    },
    {
      title: 'Creativity',
      to: '/',
      Icon: FaPaintBrush
    }
  ]

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <header className='fixed z-[1] flex h-10 w-full max-w-screen-2xl bg-black pl-4 text-gray-300'>
      <nav className='flex w-full items-center justify-between'>
        <Link
          to='/'
          className='text-2xl font-semibold duration-150 hover:text-white'
        >
          Tshop
        </Link>

        <div className='flex items-center gap-x-2 duration-300 '>
          <Link to='/cart'>
            <FaShoppingCart className='text-xl hover:scale-105 lg:hidden' />
          </Link>
          <div className='lg:hidden'>
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              size={24}
              duration={0.3}
            />
          </div>
          <ul
            className={`${isOpen ? 'right-0' : '-right-full'} absolute top-10 bg-white text-black duration-300 lg:right-0 lg:top-0 lg:flex lg:h-10 lg:items-center lg:bg-black lg:text-gray-300`}
          >
            {routes.map(route => {
              const { Icon, title, to } = route

              if (title === 'Cart') {
                return (
                  <li
                    key={title}
                    className='hidden duration-300 hover:translate-x-1 lg:block lg:hover:text-white'
                  >
                    <Link
                      to={to}
                      className='flex items-center gap-x-2 p-5 text-lg'
                    >
                      <Icon /> {title}
                    </Link>
                  </li>
                )
              }

              return (
                <li
                  key={title}
                  className='duration-300 hover:translate-x-1 lg:hover:text-white'
                >
                  <Link
                    to={to}
                    className='flex items-center gap-x-2 p-5 text-lg'
                  >
                    <Icon /> {title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
