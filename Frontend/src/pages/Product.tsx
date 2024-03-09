import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { FaShoppingCart } from 'react-icons/fa'
import capitalizeCamelCase from '../helpers/capitalizeCamelCase'
import type { Laptop } from '../interfaces'

const Product = (): JSX.Element => {
  const { id } = useParams()
  const [laptop, setLaptop] = useState<Laptop>()
  const [imageSelected, setImageSelected] = useState<number>(0)
  // const [quantity, setQuantity] = useState<number>()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
      const { data } = await axios(`${BACKEND_URL}/${id}`)
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

    console.log(techSpecs)

    return (
      <div className='p-5 md:mx-auto md:w-4/5 lg:p-0'>
        <section className='flex-row-reverse items-center justify-between lg:flex lg:gap-x-32'>
          <div className='lg:w-1/2'>
            <div className='cursor-pointer lg:mx-auto lg:w-4/5'>
              <img src={images[imageSelected]} alt={brand + '' + model} />
            </div>

            <div className='grid grid-cols-3 gap-3'>
              {images.map((image, index) => (
                <div
                  key={image}
                  onClick={() => setImageSelected(index)}
                  className='mx-auto cursor-pointer border-2 p-1 hover:border-gray-700'
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
            <select
              // onChange={e => setQuantity(Number(e.target.value))}
              className='w-16 rounded-md border-2 border-black py-1 pl-2 text-lg'
            >
              {Array.from({ length: stock }, (_, index) => index + 1).map(
                option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
              )}
            </select>

            <button className='mx-auto mt-4 flex w-full items-center justify-center gap-x-2 rounded-lg border-2 border-black py-2  text-lg duration-300 hover:bg-black hover:text-white md:w-4/5 md:px-7'>
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
                  <span>{value === true ? 'Yes' : value}</span>
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
