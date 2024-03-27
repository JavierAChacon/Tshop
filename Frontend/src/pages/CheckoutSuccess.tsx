import { CiCircleCheck } from 'react-icons/ci'
import { Link } from 'react-router-dom'

const CheckoutSuccess = (): JSX.Element => {
  return (
    <div className='flex h-[calc(100dvh-2.5rem)] flex-col items-center justify-center text-center'>
      <div className='text-9xl text-green-500'>
        <CiCircleCheck />
      </div>
      <p className='text-lg md:text-2xl'>
        The order confirmation email with details of your order and a link to
        track its progress has been sent to your email addres
      </p>

      <button className='my-5 rounded-xl bg-gray-700 p-2 text-lg text-white transition-all duration-300 hover:scale-105'>
        <Link to='/'>Understood!</Link>
      </button>
    </div>
  )
}

export default CheckoutSuccess
