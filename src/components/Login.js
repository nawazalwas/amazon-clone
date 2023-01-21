import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from './firebase.js';
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [err,setErr] = useState("");

    const login = (e)=>{
        e.preventDefault();
        setErr("");
        signInWithEmailAndPassword(auth,email,password).then((auth)=>{
            console.log(location?.state?.previousUrl);
            location?.state?.previousUrl?navigate(location?.state?.previousUrl):navigate('/');
            
        }).catch((err)=>setErr(()=>"something wrong please check"));

    };

    const register = (e)=>{
        e.preventDefault();
        setErr("");
        createUserWithEmailAndPassword(auth,email,password).then((res)=>{
            location.state.previousUrl?navigate(location.state.previousUrl):navigate('/');
        }).catch(err=>setErr(()=>"user already exist"));

    };
    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
                    

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    {err && <span>! {err}</span>}

                    <button type='submit' onClick={login} className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className='login__registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login