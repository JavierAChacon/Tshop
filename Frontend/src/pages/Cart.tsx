import axios from 'axios'
import useCart from '../hooks/useCart'

const Cart = (): JSX.Element => {
  const { cart } = useCart()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const handleClick = async (): Promise<void> => {
    const { data } = await axios.post(
      `${BACKEND_URL}/stripe/create-checkout-session`,
      cart
    )
    location.replace(data)
  }

  return (
    <div>
      <button onClick={handleClick}>PAY!</button>
    </div>
  )
}

export default Cart
