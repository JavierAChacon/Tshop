import { FaXmark, FaCheck } from 'react-icons/fa6'
import useNotification from '../hooks/useNotification'

const Notification = (): JSX.Element => {
  const { isVisible, message, closeNotification } = useNotification()

  return (
    <div
      className={`${isVisible ? 'left-2 opacity-100 lg:left-4' : '-left-full opacity-0'} shadow-3xl fixed top-12 w-72 rounded-lg border bg-green-500 transition-all duration-500 lg:top-14`}
    >
      <div className='ml-auto flex w-[calc(18rem-0.3rem)] items-center justify-between rounded-md bg-white p-2 text-black'>
        <div className='flex items-center gap-x-1'>
          <FaCheck className='text-lg text-green-500' />
          {message}
        </div>
        <button
          onClick={closeNotification}
          className='text-gray-700 hover:text-red-500'
        >
          <FaXmark />
        </button>
      </div>
    </div>
  )
}

export default Notification
