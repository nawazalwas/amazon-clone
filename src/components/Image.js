import React from 'react';
import { Link } from 'react-router-dom';
import './Image.css';

function Image({image,className,id}) {
  return (
    <Link to={{
        pathname: `/product/${id}`,
      }}>
        <img src={image} alt=""  className={className}/>
      </Link>
    
  )
}

export default Image