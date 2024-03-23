import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa'
import capitalizeCamelCase from '../helpers/capitalizeCamelCase'
import type { CartItem, Laptop } from '../interfaces'
import useCart from '../hooks/useCart'
import useNotification from '../hooks/useNotification'

const Product = (): JSX.Element => {
  const { id } = useParams()
  const [laptop, setLaptop] = useState<Laptop>()
  const [imageSelected, setImageSelected] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)
  const { addToCart } = useCart()
  const { showNotification } = useNotification()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
      const { data } = await axios(`${BACKEND_URL}/laptops/${id}`)
      setLaptop(data.laptop)
    }
    fetchData().catch(error => console.error(error))
  }, [])

  if (laptop === undefined) {
    return (
      <div className='flex h-[calc(100dvh-2.5rem)] items-center justify-center'>
        <Loader />
      </div>
    )
  } else {
    const { brand, model, description, price, images, stock } = laptop
    const techSpecs = Object.entries(laptop).filter(([key]) =>
      [
        'graphicCard',
        'operativeSystem',
        'processor',
        'ram',
        'screen',
        'storage',
        'touchscreen'
      ].includes(key)
    )

    const handleCart = (): void => {
      if (id !== undefined) {
        const newItem: CartItem = {
          id,
          name: `${brand} ${model}`,
          price,
          quantity,
          images
        }
        addToCart(newItem)
        if (quantity === 1) {
          showNotification(`Added ${quantity} item to cart`)
        } else if (quantity > 1) {
          showNotification(`Added ${quantity} items to cart`)
        }
      }
    }

    return (
      <div className='p-5 md:mx-auto md:w-4/5 lg:p-0'>
        <section className='flex-row-reverse items-center justify-between lg:flex lg:gap-x-32'>
          <div className='lg:w-1/2'>
            <div className='container mx-auto cursor-pointer max-lg:my-5 lg:mx-auto lg:flex lg:h-96 lg:w-4/5 lg:items-center'>
              <img src={images[imageSelected]} alt={brand + '' + model} />
            </div>

            <div className='grid grid-cols-3 gap-3'>
              {images.map((image, index) => (
                <div
                  key={image}
                  onClick={() => setImageSelected(index)}
                  className='mx-auto flex h-full cursor-pointer items-center border-2 p-1 hover:border-gray-700'
                >
                  <img src={image} />
                </div>
              ))}
            </div>
          </div>

          <div className='lg:w-1/2'>
            <h1 className='mt-3 text-3xl font-bold text-gray-700'>
              {brand} {model}
            </h1>

            <strong className='mb-2 block text-2xl font-semibold'>
              ${price}
            </strong>

            <p>{description}</p>

            <strong className='mb-1 mt-4 block text-xl'>Quantity</strong>
            {stock !== 0 ? (
              <div className='flex items-center'>
                <button
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity === 1}
                  className='flex items-center rounded-l-md bg-gray-200 p-2'
                >
                  <FaMinus />
                </button>
                <input
                  type='number'
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  min='1'
                  max={stock}
                  className='h-8 w-16 border-2 border-black text-center'
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity === stock || stock === 0}
                  className='rounded-r-md bg-gray-200 p-2'
                >
                  <FaPlus />
                </button>
              </div>
            ) : (
              <strong>Out of stock</strong>
            )}

            <button
              onClick={handleCart}
              className='mx-auto mt-4 flex w-full items-center justify-center gap-x-2 rounded-lg border-2 border-black py-2  text-lg duration-300 hover:bg-black hover:text-white md:w-4/5 md:px-7'
            >
              Add to cart <FaShoppingCart />
            </button>
          </div>
        </section>

        <section>
          <h2 className='mb-5 mt-10 text-center text-2xl lg:text-3xl'>
            Technical Specifications
          </h2>
          <div className='mx-auto mb-5 flex flex-col items-center justify-center gap-y-3 md:grid md:grid-cols-3'>
            {techSpecs.map(([key, value]) => (
              <div
                key={value}
                className='text-center md:mx-auto md:w-max md:text-left'
              >
                <div className='w-40'>
                  <h3 className='font-bold'>
                    {key === 'ram'
                      ? key.toUpperCase()
                      : capitalizeCamelCase(key)}
                  </h3>
                  <span>
                    {key === 'touchscreen' && value === false
                      ? 'No'
                      : value === true && key === 'touchscreen'
                        ? 'Yes'
                        : value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }
}

export default Product
