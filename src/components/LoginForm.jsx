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
            localStorage.setItem('user', JSON.stringify(res.data.user));
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
            {/* <div className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 rotate-[-90deg] text-orange-500 text-3xl font-bold">Welcome</div> */}
            <div className="relative w-[800px] h-[500px] border-2 border-black rounded-lg p-8 shadow-lg flex">
                
                
                <div className="w-full flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black shadow-md">
                        <img src="images/ozzy.jpg" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm mt-2">LOG IN TEST</p>

                    <form className="w-3/4 mt-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block">Email</label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                type="email"
                                name="email"
                                placeholder="test@vivere.ie"
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
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="w-full py-2 bg-accent text-secondary rounded-lg shadow-md hover:bg-green-600 transition">
                            Log In
                        </button>

                        <button
                            type="button"
                            className="w-full mt-3 py-2 bg-accent text-secondary rounded-lg shadow-md hover:bg-gray-400 transition"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
