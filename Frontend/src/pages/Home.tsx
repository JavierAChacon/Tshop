import axios from 'axios'
import { useState, useEffect } from 'react'
import macBook from '../../public/MacbookAir15.webp'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import Loader from '../components/Loader'
import type { CartItem, Laptop } from '../interfaces'
import useCart from '../hooks/useCart'
import useNotification from '../hooks/useNotification'

const Home = (): JSX.Element => {
  const [laptops, setLaptops] = useState<Laptop[]>([])
  const { addToCart } = useCart()
  const { showNotification } = useNotification()
  const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/laptops`

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const { data } = await axios(BACKEND_URL)
      setLaptops(data)
    }
    fetchData().catch(error => console.error(error))
  }, [])

  const laptopToFind: Laptop | undefined = laptops.find(
    laptop => laptop.model === 'MacBook Air 15'
  )
  const handleCart = (): void => {
    if (laptopToFind !== undefined) {
      const laptopToAdd: CartItem = {
        id: laptopToFind._id,
        name: `${laptopToFind.brand} ${laptopToFind.model}`,
        price: laptopToFind.price,
        quantity: 1,
        images: laptopToFind.images,
        stock: laptopToFind.stock
      }
      addToCart(laptopToAdd)
      showNotification('Added 1 item to cart')
    }
  }

  return (
    <>
      <section className='flex flex-col justify-between bg-gray-900 pt-20 text-white lg:flex-row lg:items-center lg:pl-10 lg:pr-5 lg:pt-24'>
        <div className='px-3 lg:w-[40rem] lg:px-0'>
          <h2 className='mb-3 text-center text-4xl md:mb-8 lg:mb-5'>
            Macbook Air 15
          </h2>

          <p className='text-center text-gray-400 lg:text-justify'>
            Experience the seamless blend of power and elegance with the MacBook
            Air 15. This iconic laptop, featuring the latest M2 processor,
            embodies Apple's commitment to performance and style. Slim,
            lightweight, and designed for excellence, it's your gateway to a new
            level of computing sophistication.
          </p>

          <div className='my-6 flex justify-center gap-x-7 lg:my-4 lg:justify-normal lg:gap-x-5'>
            <Link
              to={laptopToFind?._id !== undefined ? laptopToFind._id : '/'}
              className='rounded-lg border px-3 py-1 lg:px-5 lg:py-2'
            >
              See more
            </Link>

            <button
              onClick={handleCart}
              className='flex items-center rounded-lg bg-white px-3 py-1 text-black lg:gap-x-1 lg:px-5 lg:py-2'
            >
              <FaShoppingCart />
              Add to cart
            </button>
          </div>
        </div>

        <div className='mb-10'>
          <img
            src={macBook}
            alt='Macbook Air 15'
            className='mx-auto w-[20rem] md:w-[40rem] lg:w-[50rem]'
          />
        </div>
      </section>

      {laptops.length === 0 ? (
        <section className='flex items-center justify-center bg-slate-200 py-5'>
          <Loader />
        </section>
      ) : (
        <section className='bg-slate-200 pb-4 pt-2'>
          <h2 className='mb-2 ml-3 text-2xl font-semibold'>New Arrivals</h2>

          <div className='flex gap-x-5 overflow-x-scroll px-3'>
            {laptops?.map(laptop => {
              const { _id, images, brand, model, price, stock } = laptop

              const handleCart = (): void => {
                const laptopToAdd: CartItem = {
                  id: _id,
                  images,
                  name: `${brand} ${model}`,
                  price,
                  quantity: 1,
                  stock
                }
                addToCart(laptopToAdd)
                showNotification('Added 1 item to cart')
              }

              return (
                <div key={_id}>
                  <Link
                    to={_id}
                    className='flex h-72 w-72 items-center rounded-lg bg-white p-4'
                  >
                    <img src={images[0]} alt='' />
                  </Link>

                  <h3 className='mt-2 text-lg font-bold'>
                    <Link to={_id}>
                      {brand} {model}
                    </Link>
                  </h3>

                  <div className='flex items-center gap-x-5'>
                    <p className='text-lg font-semibold'>${price}</p>

                    <button
                      onClick={handleCart}
                      className='rounded-lg border-2 border-black p-1 duration-300 hover:bg-black hover:text-white'
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </>
  )
}

export default Home
