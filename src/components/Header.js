import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { AmazonUseContext } from './StateProvider';
import { auth } from './firebase.js';
import { SearchOff, ShoppingCartOutlined } from '@mui/icons-material';
import { signOut } from "firebase/auth";

function Header() {
  const [{count,user},dispatch] = AmazonUseContext();

  function login(){
    if(user){
      signOut(auth);
    }

  }
  return (
    <nav className='header'>
      <Link to='/'>
        <img className='header_logo'
          src='https://www.nicepng.com/png/full/16-167642_amazon-logo-amazon-logo-white-text.png'
          alt="logo" />
      </Link>
      <div className='header_search'>
        <input typte="text" className='header_search_input' />
        <SearchOff className='header_search_icon' />
      </div>
      <div className='header_nav' >
        <Link to={!user && '/login'} className='header_link'>
          <div onClick = {login} className='header_option'>
            <span className='header_option_lineone'>Hello {!user ? 'Guest' : user.email}</span>
            <span className='header_option_linetwo'>{user ? 'Sign Out' : 'Sign In'}</span>
          </div>

        </Link>
        <Link to='/orders' className='header_link'>
          <div className='header_option'>
            <span className='header_option_lineone'>Returns</span>
            <span className='header_option_linetwo'>& Orders</span>
          </div>

        </Link>
        <Link to='/' className='header_link'>
          <div className='header_option'>
            <span className='header_option_lineone'>Your</span>
            <span className='header_option_linetwo'>Prime</span>
          </div>

        </Link>
        <Link to="/checkout" className='header_link'>
          <div className='header_option_cart'>
            <ShoppingCartOutlined />
            <span className='header_option_linetwo header_option_cart_count'>{count}</span>

          </div>
        </Link>
      </div>

    </nav>

  )
}

export default Header