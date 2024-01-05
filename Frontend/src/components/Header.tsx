import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCartShopping } from 'react-icons/fa6'
import { FaSearch } from 'react-icons/fa'
import { IoMenu, IoClose } from 'react-icons/io5'
const Header = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <header className='bg-black px-2 text-white lg:px-7 fixed w-full'>
      <nav className='flex h-10 items-center justify-between lg:h-12'>
        <p className='lg:text-2xl lg:font-bold'>Tshop</p>
        <div className='flex items-center gap-x-3 lg:gap-x-6'>
          <form
            onSubmit={handleSubmit}
            className='flex w-32 items-center rounded-lg bg-white px-2 text-black lg:h-7 lg:w-56'
          >
            <label htmlFor='search' />
            <input
              id='search'
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full'
            />
            <button type='submit'>
              <FaSearch />
            </button>
          </form>
          <ul
            className={`${
              isOpen ? 'block' : 'translate-x-full lg:flex'
            } absolute right-0 top-10 flex h-32 w-32  flex-col justify-center gap-2 bg-gray-400 pl-3 text-lg transition-all ease-in-out lg:static lg:h-auto lg:w-auto lg:flex-row lg:gap-x-5 lg:bg-black`}
          >
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/'>All products</Link>
            </li>
            <li>
              <Link to='/'>Categories</Link>
            </li>
          </ul>
          <div className='flex items-center gap-x-1 rounded-lg bg-gray-700 px-2 lg:text-lg'>
            <p>Cart</p>
            <FaCartShopping className='lg:text-md relative top-[1px] lg:top-[2px]' />
          </div>
          <IoMenu
            onClick={() => setIsOpen(!isOpen)}
            className={`${isOpen ? 'hidden' : 'block'} text-2xl lg:hidden`}
          />
          <IoClose
            onClick={() => setIsOpen(!isOpen)}
            className={`${isOpen ? 'block' : 'hidden'} text-2xl lg:hidden`}
          />
        </div>
      </nav>
    </header>
  )
}

export default Header
