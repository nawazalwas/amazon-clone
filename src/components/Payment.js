import React, { useState, useEffect } from 'react';
import './Payment.css';
import { AmazonUseContext } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./Reducer";
import axios from './axios';
import { db } from "./firebase";
import { collection, addDoc, doc } from "firebase/firestore";

function Payment() {
    const [{ cart, user }, dispatch] = AmazonUseContext();
    const history = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `https://us-central1-clone-196e9.cloudfunctions.net/api/payments/create?total=${getBasketTotal(cart) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [cart])

    console.log('THE SECRET IS >>>', clientSecret)
    console.log('👱', user)
    const handleDb = async (cart, paymentIntent, user) => {
        console.log(paymentIntent);
        const users = collection(db, 'users')
        const userId = doc(users, user?.uid);
        const orders = collection(userId, 'orders')
        await addDoc(orders, {
            paymentId: paymentIntent.id,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
            items: cart
        }).then(docRef => {
            console.log("Document has been added successfully");
        }).catch(error => {
            console.log(error);
        })
    }

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            handleDb(cart, paymentIntent, user);
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_CART'
            });

            history('/orders', { replace: true });
        })

    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                    <Link to="/checkout">{cart?.length} items</Link>
                    )
                </h1>


                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {Object.keys(cart).map(key => (
                            <CheckoutProduct
                                key={key}
                                id={key}
                                title={cart[key].title}
                                image={cart[key].image}
                                price={cart[key].price}
                                rating={cart[key].rating}
                                quantity={cart[key].quantity}
                            />
                        ))}
                    </div>
                </div>


                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe magic will go */}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(cart)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment