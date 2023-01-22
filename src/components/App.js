import React, { useEffect } from 'react'
import '../styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { AmazonUseContext } from './StateProvider';
import { auth } from './firebase.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { onAuthStateChanged } from 'firebase/auth';
import Payment from './Payment';
import Orders from './Orders';
import ProductDetails from './ProductDetails';

const promise = loadStripe('pk_test_51MRlRVSJI7NO355FLOOxmh9SVOL3Tgt9mhvMhqzcSuQh4v72AeSQ2TRhU1TwlFh014W96LVYFPj42WTqOQQdD6pq00yxUANTje');
const App = () => {
  const [{ user }, dispatch] = AmazonUseContext();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userIn) => {
      if (userIn) {
        dispatch({
          type: 'SET_USER',
          user: userIn
        });

      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        });

      }

    });



    return () => {
      unsubscribe();
    }


  }, []);

  useEffect(() => {
    const state = localStorage.getItem("state");
    state && dispatch({ type: 'LOCAL_STORAGE', state: { ...JSON.parse(state), user: user } });
    console.log(state);
  }, [])


  console.log(user);



  return (
    < Router >
      <div className="app">

        <Routes>
          <Route exact path='/' element={
            <>
              <Header />
              <Home />
            </>

          } />
          <Route exact path='/login' element={
            <>
              <Header />
              <Login />
            </>
          } />
          <Route exact path='/checkout' element={
            <>
              <Header />
              <Checkout />
            </>
          } />
          <Route exact path='/payment' element={
            <>
              <Header />
              <Elements stripe={promise} >
                <Payment />
              </Elements>

            </>
          } />
          <Route exact path='/orders' element={
            <>
              <Header />
              <Orders />
            </>
          } />
          <Route exact path='/product' element={
            <>
              <Header />
              <ProductDetails />
            </>
          } />
          <Route exact path='/product/:id' element={
            <>
              <Header />
              <ProductDetails />
            </>
          } />


        </Routes>

      </div>

    </Router >
  )
}


export default App;
