import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Home.css';
import Product from './Product';

const baseURL = "https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products";

function Home() {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        const arr = [];
        axios.get(`${baseURL}`).then((response) => {

            const temp = response.data.reduce((proObj, pro) => {
                return Object.assign(proObj, { [pro.id]: { ...pro } });

            }, {})
            return temp;
        }).then((res) => {
            for (const key in res) {
                arr.push(<Product
                    key={key}
                    id={key}
                    title={res[key].title}
                    price={res[key].price}
                    rating={res[key].rating}
                    image={res[key].image}

                />);

            }
            setProducts([...arr]);
        });


    }, []);
    return products && (
        <div className='home'>
            <img
                className='home_banner'
                src='https://m.media-amazon.com/images/I/61p8fxhYxPL._QL85_V1_.jpg'
                alt="banner"
            />

            <div className="home_row">
                {products}
            </div>

            Home
        </div>
    )
}

export default Home