import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar'
import './Verification.css'

function Verification() {
    const { username } = useParams();
    const [u_email, setEmail] = useState('');

    useEffect(() => {
        async function fetchEmail() {
            const response = await axios.get(`https://starfish-app-dgren.ondigitalocean.app/api/getEmail?username=${username}`);
            setEmail(response.data);
            sendEmail(response.data);
        }
        fetchEmail();
    }, []);

    async function sendEmail(email){
        const {data , error }= await axios.get(`https://starfish-app-dgren.ondigitalocean.app/api/verification?email=${email}&user=${username}`);
    }

    if(window.innerWidth > 1024){
        return (
            <>
                <Navbar />
                <div>
                    <header className='header mb-5 mt-5 pt-5'>
                        <h1 className='header-title mt-5 pt-5'>Let's verify your email address!</h1>
                        <img src='/Email.png' className='mb-3'></img>

                        <p className='header-sub'>Please verify your email address. We've sent a confirmation email to</p>
                        <p className='email'>{u_email}</p>
                        <p className='header-sub'>Didn't recieve the email? Check your Spam folder, it may have been caught by a filter.If<br></br>you still don't see it, you can <a onClick={sendEmail} className='re'>resend the confirmation email</a></p>
                    </header>
                </div>
            </>
        );
    }else{
       return(
            <>
                <Navbar />
                <div>
                    <header className='header m-1'>
                        <h1 className='header-title'>Let's verify your email address!</h1>
                        <img src='/Email.png' className='mb-3'></img>

                        <p className='header-sub'>Please verify your email address. We've sent a confirmation email to</p>
                        <p className='email'>{u_email}</p>
                        <p className='header-sub'>Didn't recieve the email? Check your Spam folder, it may have been caught by a filter.<br></br>If you still don't see it, you can<br></br> <button onClick={sendEmail} className='re'>resend the confirmation email</button></p>
                    </header>
                </div>
            </>
       );
    }
}

export default Verification;