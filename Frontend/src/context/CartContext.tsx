import { createContext, useEffect, useState } from 'react'
import type {
  CartContextType,
  CartItem,
  ProviderProps
} from '../interfaces'

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  subtotal: 0
})

export const CartProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [subtotal, setSubtotal] = useState<number>(0)
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
    const newSubtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
    setSubtotal(newSubtotal)
    if (cart.length !== 0) {
      localStorage.setItem(SHOPPING_CART, JSON.stringify(cart))
    }
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, addToCart, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
