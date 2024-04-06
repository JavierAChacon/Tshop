import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import CheckoutSuccess from './pages/CheckoutSuccess'
import { CartProvider } from './context/CartContext'
import { NotificationProvider } from './context/NotificationContext'
import AllLaptops from './pages/AllLaptops'

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <CartProvider>
        <NotificationProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/:id' element={<Product />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/all' element={<AllLaptops />} />
            </Route>

            <Route path='checkout' element={<Layout />}>
              <Route path='/checkout/success' element={<CheckoutSuccess />} />
            </Route>
          </Routes>
        </NotificationProvider>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
