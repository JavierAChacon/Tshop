import { createContext, useState } from 'react'
import type { NotificationContextType, ProviderProps } from '../interfaces'

const NotificationContext = createContext<NotificationContextType>({
  isVisible: false,
  message: '',
  showNotification: () => {},
  closeNotification: () => {}
})

export const NotificationProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const showNotification = (message: string): void => {
    setMessage(message)
    setIsVisible(true)

    setTimeout(() => {
      setIsVisible(false)
    }, 3000)
  }

  const closeNotification = (): void => {
    setIsVisible(false)
  }

  return (
    <NotificationContext.Provider
      value={{ isVisible, message, showNotification, closeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
