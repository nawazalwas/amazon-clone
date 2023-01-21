import React from 'react';
import './Checkout.css';
import { AmazonUseContext } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';

function Checkout() {
  const [{ cart, count }, dispatch] = AmazonUseContext();

  function item(cart) {
    const arr = [];
    for (const id in cart) {
      console.log(JSON.stringify(cart));
      arr.push(<CheckoutProduct
        key={id}
        id={id}
        title={cart[id].title}
        price={cart[id].price}
        rating={cart[id].rating}
        image={cart[id].image}
        quantity={cart[id].quantity}
      />);
    }

    return arr;

  }


  return (
    <div className='checkout'>
      <div className="checkout_left">
        <img
          src='https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/AUX/ILB_BrightColors_Approved._TTW_.jpg'
          className='checkout_ads'
          alt='ad' />
        {!count ? (
          <div className='checkout_product'>
            <h2 className='checkout_title'>Your Shopping Cart is empty!</h2>
          </div>)
          : (
            <div className='checkout_product'>
              <h2 className='checkout_title'>Your Shopping Basket</h2>
              {item(cart)}
            </div>

          )
        }
      </div>
      {(count > 0)&&<div className='checkout_right'>
        <Subtotal />
      </div>}

    </div>
  )
}

export default Checkout