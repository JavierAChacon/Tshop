import { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'
import type { NotificationContextType } from '../interfaces'

const useNotification = (): NotificationContextType => {
  return useContext(NotificationContext)
}

export default useNotification
