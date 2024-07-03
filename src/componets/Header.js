import './components.css';
import { FaRegHeart } from 'react-icons/fa';
import { IoPersonOutline } from 'react-icons/io5';
import { BsCart3 } from 'react-icons/bs';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div>
          <h1>Exclusive</h1>
        </div>

        <ul className="links">
          <li>Home</li>
          <li>Contact</li>
          <li>About</li>
          <li>Signup</li>
        </ul>

        <div className="icons">
          <FaRegHeart
            style={{
              height: '20px',
              width: '20px',
            }}
          />
          <BsCart3
            style={{
              height: '20px',
              width: '20px',
            }}
          />
          <IoPersonOutline
            style={{
              height: '20px',
              width: '20px',
            }}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
