import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
