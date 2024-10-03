"use client"; // Mark this file as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [pwd, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Log the values to check if they are being set correctly
        console.log('Username:', username);
        console.log('Password:', pwd);

        const response = await fetch('http://localhost:8090/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, pwd }),
        });

        if (response.ok) {
            // Redirect to the author page upon successful login
            router.push('/author'); // Adjust the path as needed
        } else {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="username">
                        Username
                    </label>
                    <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                        className="w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="password">
                        Password
                    </label>
                    <Input
                        id="password"
                        type="password"
                        value={pwd}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full"
                    />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </form>
        </div>
    );
};

export default Login;
