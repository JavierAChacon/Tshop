import { ReactNode } from 'react'

export interface Laptop {
  _id: string
  price: number
  stock: number
  description: string
  brand: string
  model: string
  operativeSystem: string
  processor: string
  graphicCard: string
  storage: number
  ram: number
  touchscreen: boolean
  screen: number
  images: string[]
}

export interface CartItem {
  name: string
  images: string[]
  id: string
  price: number
  quantity: number
}

export interface CartContextType {
  addToCart: (item: CartItem) => void
  cart: CartItem[]
  subtotal: number
}

export interface ProviderProps {
  children: ReactNode
}

export interface NotificationContextType {
  isVisible: boolean
  message: string
  showNotification: (message: string) => void
  closeNotification: () => void
}
