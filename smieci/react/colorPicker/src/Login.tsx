import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Props = {
    onLogin: (isLoggedIn: boolean) => void;
}

function Login({ onLogin }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
                email,
                password
            });

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                onLogin(true);
                navigate('/dashboard');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Login failed: ', error);
            alert('Login failed');
        }
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const HandlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input type='email' onChange={handleEmailChange} required />
                <label>Password</label>
                <input type='password' onChange={HandlePasswordChange} required />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login