import { useContext } from 'react'
import CartContext from '../context/CartContext'

const useCart = (): unknown => {
  return useContext(CartContext)
}

export default useCart
