import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
