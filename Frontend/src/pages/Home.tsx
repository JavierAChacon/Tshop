import axios from 'axios'
import { useState, useEffect } from 'react'

interface Processor {
  brand: string
  model: string
}

interface Screen {
  size: number
  resolution: string
  touchScreen: boolean
}

interface Storage {
  capacity: string
  storageType: ('HDD' | 'SSD')[]
}

interface GraphicCard {
  brand?: string
  model?: string
}

interface Laptop {
  _id: string
  stock: number
  price: number
  brand: string
  OS: string
  model: string
  ram: number
  processor: Processor
  screen: Screen
  storage: Storage
  graphicCard?: GraphicCard
  images: string[]
  createdAt: Date
  updatedAt: Date
}

const Home = (): JSX.Element => {
  const [laptops, setLaptops] = useState<Laptop[]>([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_BACKEND_URL}/admin/laptops`
        )
        setLaptops(data.laptops)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData().then().catch(console.error)
  }, [])

  return (
    <div className='h-screen'>
      <h1>Hola hermano</h1>
    </div>
  )
}

export default Home
