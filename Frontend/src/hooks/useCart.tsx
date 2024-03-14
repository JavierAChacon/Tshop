import { useContext } from 'react'
import CartContext from '../context/CartContext'
import { CartContextType } from '../interfaces'

const useCart = (): CartContextType => {
  return useContext(CartContext)
}

export default useCart
