import React from 'react';
import { Link } from 'react-router-dom';
import './Title.css';

function Title({title,className,id}) {
  return (
    <Link className='link' to={{
        pathname: `/product/${id}`,
      }}>
        <p className={className}>{title}</p>
      </Link>
    
  )
}

export default Title