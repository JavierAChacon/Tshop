import { useEffect, useState } from 'react'
import { Laptop, CartItem } from '../interfaces'
import { Link } from 'react-router-dom'
import axios from 'axios'
import useNotification from '../hooks/useNotification'

const AllLaptops = (): JSX.Element => {
  const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/laptops`
  const [laptops, setLaptops] = useState<Laptop[]>()
  // const { addToCart } = useCart()
  const { showNotification } = useNotification()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const { data } = await axios(BACKEND_URL)
      setLaptops(data)
    }
    fetchData().catch(error => console.error(error))
  }, [])

  return (
    <div className='flex flex-wrap'>
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
  )
}

export default AllLaptops
