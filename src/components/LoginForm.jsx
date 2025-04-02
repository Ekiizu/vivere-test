import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`https://viverebackend-main-girysq.laravel.cloud/api/login`, form)
        .then((res) => {
            console.log(res)
            localStorage.setItem('user', JSON.stringify(res.data.data));
            login(form.email, form.password);
            navigate('/');
        })
        .catch((err) => {
            console.error(err);
        });
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="relative w-[900px] h-[500px] border-2 border-primary rounded-lg shadow-lg flex">
                <div className="w-1/2 flex flex-col justify-center p-8">
                    <h1 className="text-3xl font-bold">Welcome to Vivere</h1>
                    <p className="mt-4 text-secondary-content">Immerse yourself in a world of art! ＼（＾○＾）人（＾○＾）／</p>
                    <p className="mt-4">Don't have an account? <span className="text-primary cursor-pointer" onClick={() => navigate("/register")}>Register here</span></p>
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center p-8  rounded-r-lg">
                    <h2 className="text-2xl font-semibold mb-4">Login</h2>
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block">Email</label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block">Password</label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>Remember me</span>
                            </div>
                            <span className="text-primary-600 cursor-pointer">Forgot your password?</span>
                        </div>
                        <button type="submit" className="w-full py-2 bg-primary text-white rounded-lg shadow-md hover:bg-secondary-700 transition">
                            Log in
                        </button>
                    </form>
                    <div className="flex items-center justify-center mt-4">
                        <span className="mx-2 cursor-pointer">
                            <img src="/images/ozbox.jpg" alt="Google" className="w-6 h-6" />
                        </span>
                        <span className="mx-2 cursor-pointer">
                            <img src="/images/ozzypaw.jpg" alt="Facebook" className="w-6 h-6" />
                        </span>
                        <span className="mx-2 cursor-pointer">
                            <img src="/images/ozzy.jpg" alt="Apple" className="w-6 h-6" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;