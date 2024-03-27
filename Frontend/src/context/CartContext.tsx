import { createContext, useEffect, useState } from 'react'
import type { CartContextType, CartItem, ProviderProps } from '../interfaces'

const CartContext = createContext<CartContextType>({
  cart: [],
  subtotal: 0,
  addToCart: () => {},
  deleteItem: () => {},
  updateQuantity: () => {},
  getQuantityInCart: () => 0
})

export const CartProvider: React.FC<ProviderProps> = ({ children }) => {
  const SHOPPING_CART = 'SHOPPING_CART'
  // eslint-disable-next-line
  const initialCart: CartItem[] = JSON.parse(localStorage.getItem(SHOPPING_CART) || '[]')
  const [cart, setCart] = useState<CartItem[]>(initialCart)
  const [subtotal, setSubtotal] = useState<number>(0)

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

  const deleteItem = (item: CartItem): void => {
    const updatedCart = cart.filter(cartItem => item.id !== cartItem.id)
    setCart(updatedCart)
  }

  const updateQuantity = (itemId: string, newQuantity: number): void => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const getQuantityInCart = (itemId: string | undefined): number => {
    const itemInCart = cart.find(item => item.id === itemId)
    return itemInCart !== undefined ? itemInCart.quantity : 0
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

    if (cart !== null) {
      localStorage.setItem(SHOPPING_CART, JSON.stringify(cart))
    }
  }, [cart])

  return (
    <CartContext.Provider
      value={{ cart, addToCart, subtotal, deleteItem, updateQuantity, getQuantityInCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
