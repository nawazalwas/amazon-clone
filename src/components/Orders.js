import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import './Orders.css'
import { AmazonUseContext } from "./StateProvider";
import { collection, addDoc, doc, query, orderBy, limit, getDocs } from "firebase/firestore";
import Order from './Order.js';

function Orders() {
    const [{ cart, user }, dispatch] = AmazonUseContext();
    const [orders, setOrders] = useState({});


    useEffect(() => {
        
        
        if (user) {
            const getDbHandler = async () => {
                const users = collection(db, 'users');
                const userId = doc(users, user?.uid);
                const orders = collection(userId, 'orders');
                
                const q = query(orders, orderBy('created', 'desc'));
                const querySnapshot = await getDocs(orders).then(res => {
                    const temp = {};
                    res.forEach((doc) => {
                        temp[doc.id] = doc.data();
                    });
                    setOrders({...temp});
                    
                });
            }

            getDbHandler();
            
        } else {
            setOrders([])
        }

    }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders&& Object.keys(orders).map((order,idx) => (
                    <Order key={idx} order={orders[order]} />
                ))}
                
            </div>
        </div>
    )
}

export default Orders