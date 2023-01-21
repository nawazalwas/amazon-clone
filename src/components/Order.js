import React from 'react'
import './Order.css'
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
    return (
        <div className='order'>
            <h2>Order</h2>
            <p>{moment.unix(order.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <h4 className='order__payment__id'>Payment Id : {order.paymentId}</h4>
            </p>
            {Object.keys(order?.items).map(key => (
                <CheckoutProduct
                    key={key}
                    id={key}
                    title={order?.items[key].title}
                    image={order?.items[key].image}
                    price={order?.items[key].price}
                    rating={order?.items[key].rating}
                    quantity = {order?.items[key].quantity}
                    hideButton = "order"
                />
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order__total">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={order?.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    )
}

export default Order;