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
        
        axios
        .post(`https://viverebackend-main-girysq.laravel.cloud/api/login`, form)
        .then((res) => {
            console.log(res);

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
        <div className="ml-150 mt-70">
            <div className="flex-1 border-2 border-black p-4 rounded">
            <h1 className="text-xl font-bold mt-2 text-primary">Login</h1>
            <form className="box" onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            type="email"
                            name="email"
                            placeholder="test@vivere.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button type="submit" className="mt-3 px-4 py-2 bg-primary text-white rounded-lg ">
                            Login
                        </button>
                    </div>

                            <button
                                className="mt-3 px-4 py-2 bg-primary text-white rounded-lg"
                                onClick={() => navigate("/Register")}
                            >
                                Register
                            </button>       
                          
                </div>
            </form>
        </div>
        </div>
        
    );
};

export default LoginForm;