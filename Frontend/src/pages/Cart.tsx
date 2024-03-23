import axios from 'axios'
import useCart from '../hooks/useCart'
import { FaMinus, FaPlus } from 'react-icons/fa'

const Cart = (): JSX.Element => {
  const { cart, subtotal } = useCart()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const handleCheckout = async (): Promise<void> => {
    const { data } = await axios.post(
      `${BACKEND_URL}/stripe/create-checkout-session`,
      cart
    )
    location.replace(data)
  }

  return (
    <div className='container mx-auto min-h-dvh gap-x-3 px-5 pb-8 md:flex lg:w-[90%]'>
      <div className='flex flex-col gap-y-3 md:w-4/6'>
        <h1 className='mt-3 text-center font-semibold lg:text-2xl'>
          Your Cart
        </h1>
        {cart.map(item => {
          const { name, price, quantity, images } = item
          return (
            <div
              key={item.id}
              className='flex h-40 items-center rounded-lg border bg-gray-100 p-4'
            >
              <div className='md:block'>
                <img
                  src={images[0]}
                  alt={name}
                  className='w-20 min-w-20 rounded-lg md:w-24 md:min-w-24 lg:w-32 lg:min-w-32'
                />
              </div>

              <div className='mx-2 md:mx-10'>
                <h3 className='font-bold'>{name}</h3>
                <span className='md:text-lg'>${price}</span>
              </div>

              <div className='ml-auto flex flex-col gap-x-3 gap-y-3 md:flex-row'>
                <div className='flex items-center'>
                  <button
                    // onClick={}
                    disabled={quantity === 1}
                    className='flex items-center rounded-l-md bg-gray-200 p-1 md:p-2'
                  >
                    <FaMinus />
                  </button>

                  <input
                    type='number'
                    value={quantity}
                    // onChange={}
                    min='1'
                    // max={stock}
                    className='h-6 w-10 border-2 border-black text-center md:h-8 md:w-16'
                  />

                  <button
                    // onClick={() => setQuantity(quantity + 1)}
                    // disabled={quantity === stock || stock === 0}
                    className='rounded-r-md bg-gray-200 p-1 md:p-2'
                  >
                    <FaPlus />
                  </button>
                </div>

                <button
                  // onClick={() => deleteItem(item)}
                  className='rounded-md border-2 border-black p-1 text-sm transition-colors duration-300 hover:border-white hover:bg-red-500 hover:text-white'
                >
                  Remove
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className='md:w-2/6'>
        <h2 className='my-3 text-center font-semibold lg:text-2xl'>
          Order Summary
        </h2>
        <div className='rounded-lg border p-3'>
          <h3 className='mb-3 font-semibold'>Items</h3>
          {cart.map(item => (
            <div className='grid grid-cols-3 gap-2' key={item.id}>
              <div className='col-span-2'>{item.name}</div>
              <div className='text-right'>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          <hr className='my-3' />
          <div className='grid grid-cols-2 gap-2'>
            <div>Subtotal:</div>
            <div className='text-right font-semibold'>
              ${subtotal.toFixed(2)}
            </div>
            <div>Shipping:</div>
            <div className='text-right text-xs lg:text-base'>
              Calculated at checkout
            </div>
            <div>Tax:</div>
            <div className='text-right text-xs lg:text-base'>
              Calculated at checkout
            </div>
            <button
              onClick={() => handleCheckout}
              className='col-span-full mt-4 rounded-lg bg-black p-1 text-xl text-white'
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
