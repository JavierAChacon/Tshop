import { createContext, useEffect, useState } from 'react'
import type {
  CartContextType,
  CartItem,
  ProviderProps
} from '../interfaces'

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {}
})

export const CartProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const SHOPPING_CART = 'SHOPPING_CART'

  const addToCart = (item: CartItem): void => {
    const isItemInCart = cart.find(cartItem => cartItem.id === item.id)

    if (isItemInCart !== undefined) {
      setCart(
        cart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      )
    } else {
      setCart([...cart, item])
    }
  }

  useEffect(() => {
    const cartItems = localStorage.getItem(SHOPPING_CART)
    if (cartItems !== null) {
      setCart(JSON.parse(cartItems))
    }
  }, [])

  useEffect(() => {
    if (cart.length !== 0) {
      localStorage.setItem(SHOPPING_CART, JSON.stringify(cart))
    }
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
