import { Link } from 'react-router-dom'
const Header = (): JSX.Element => {
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Shop</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header
