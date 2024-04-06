import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaGamepad,
  FaBriefcase,
  FaPaintBrush,
  FaHome,
  FaShoppingCart,
  FaLaptop
} from 'react-icons/fa'
import { Sling as Hamburger } from 'hamburger-react'
import { TbTriangleFilled } from 'react-icons/tb'

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
      title: 'Categories',
      categories: [
        {
          title: 'All laptops',
          to: '/all',
          Icon: FaLaptop
        },
        {
          title: 'Gaming',
          to: '/gaming',
          Icon: FaGamepad
        },
        {
          title: 'Business',
          to: '/business',
          Icon: FaBriefcase
        },
        {
          title: 'Creativity',
          to: '/creativity',
          Icon: FaPaintBrush
        }
      ]
    }
  ]

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [showCategories, setShowCategories] = useState<boolean>(false)

  return (
    <header className='fixed z-[1] flex h-10 w-full max-w-screen-2xl bg-black pl-4 text-gray-300 lg:shadow-none'>
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
            className={`${isOpen ? 'right-0' : '-right-full'} absolute top-10 rounded-md bg-white text-black shadow-2xl duration-300 lg:right-0 lg:top-0 lg:flex lg:h-10 lg:items-center lg:bg-black lg:text-gray-300`}
          >
            {routes.map(route => {
              const { Icon, title, to, categories } = route

              if (title === 'Cart' && to !== undefined) {
                return (
                  <li
                    key={title}
                    className='hidden duration-300 hover:translate-x-1 lg:block lg:hover:text-white'
                  >
                    <Link
                      to={to}
                      className='flex items-center gap-x-2 p-5 text-lg'
                    >
                      {title} <Icon />
                    </Link>
                  </li>
                )
              } else if (title === 'Categories' && categories !== undefined) {
                return (
                  <li key={title} className='relative w-40 '>
                    <div
                      onClick={() => setShowCategories(!showCategories)}
                      className={`${showCategories ? 'lg:top-[104px]' : 'lg:top-0'} relative cursor-pointer items-center gap-x-2 p-5 text-lg `}
                    >
                      <span className='flex items-center gap-x-1 duration-300 hover:translate-x-1 lg:hover:text-white'>
                        {title}
                        <TbTriangleFilled
                          className={`${showCategories ? 'rotate-180' : 'rotate-0'} h-3 transition-transform`}
                        />
                      </span>

                      {showCategories && (
                        <ul className='rounded-md bg-white shadow-md'>
                          {categories.map(category => (
                            <li key={category.title} className='py-3'>
                              <Link
                                to={category.to}
                                className='flex items-center justify-center gap-x-2 text-gray-500 hover:text-black'
                              >
                                <category.Icon /> {category.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                )
              } else if (to !== undefined) {
                return (
                  <li
                    key={title}
                    className='duration-300 hover:translate-x-1 lg:hover:text-white'
                  >
                    <Link
                      to={to}
                      className='flex items-center gap-x-2 p-5 text-lg'
                    >
                      {title} <Icon />
                    </Link>
                  </li>
                )
              }
              return null
            })}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
