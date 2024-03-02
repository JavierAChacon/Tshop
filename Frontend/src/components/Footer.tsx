import { Link } from 'react-router-dom'
import { TiSocialFacebook, TiSocialLinkedin } from 'react-icons/ti'
import { IoLogoInstagram, IoLogoTwitter } from 'react-icons/io'

const Footer = (): JSX.Element => {
  const navigationLinks = [
    {
      column: 'Company',
      links: [
        { title: 'About us', url: '/' },
        { title: 'Our services', url: '/' },
        { title: 'Privacy policy', url: '/' }
      ]
    },
    {
      column: 'Help',
      links: [
        { title: 'Questions', url: '/' },
        { title: 'Purchases', url: '/' },
        { title: 'Shipping', url: '/' },
        { title: 'Order status', url: '/' },
        { title: 'Payment', url: '/' }
      ]
    },
    {
      column: 'Shop',
      links: [
        { title: 'Gaming', url: '/' },
        { title: 'Businness', url: '/' },
        { title: '2-in-1', url: '/' }
      ]
    }
  ]

  return (
    <footer className='flex h-auto flex-col gap-y-10 bg-[#25262a] p-5 text-center text-gray-300 md:grid md:grid-cols-5 md:text-left'>
      {navigationLinks.map(column => (
        <div key={column.column}>
          <h4 className='mb-3 text-white underline decoration-sky-500 underline-offset-8'>
            {column.column}
          </h4>

          <ul>
            {column.links.map(link => (
              <li key={link.title}>
                <Link
                  to={link.url}
                  className='text-gray-300 duration-300 hover:ml-1 hover:text-white'
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className='col-span-2 text-white'>
        <h4 className='mb-5 underline decoration-sky-500 underline-offset-8'>
          Follow us
        </h4>

        <div className='flex justify-center gap-x-2 text-4xl md:justify-start'>
          <Link to='/'>
            <TiSocialFacebook className='rounded-full bg-gray-700 p-1 duration-500 hover:bg-sky-500' />
          </Link>

          <Link to='/'>
            <IoLogoInstagram className='rounded-full bg-gray-700 p-1 duration-500 hover:bg-sky-500' />
          </Link>

          <Link to='/'>
            <IoLogoTwitter className='rounded-full bg-gray-700 p-2 duration-500 hover:bg-sky-500' />
          </Link>

          <Link to='/'>
            <TiSocialLinkedin className='rounded-full bg-gray-700 p-1 duration-500 hover:bg-sky-500' />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
