import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const RegisterForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        date_of_birth: "",
        bio: "",
    });

    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        axios.post(`https://viverebackend-main-girysq.laravel.cloud/api/register`, form)
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                login(form.email, form.password);
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
                setError("Registration failed. Please try again.");
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
            <div className="relative w-[800px] h-[600px] border-2 border-black rounded-lg p-8 shadow-lg flex">
                {/* <div className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 rotate-[-90deg] text-orange-500 text-3xl font-bold">Welcome</div> */}
                
                <div className="w-full flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black shadow-md">
                        <img src="images/ozzy.jpg" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <p className="text text-sm mt-2">REGISTER</p>

                    <form className="w-3/4 mt-4" onSubmit={handleSubmit}>
                        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                        <input className="w-full mb-2 px-4 py-2 border rounded-lg" type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
                        <input className="w-full mb-2 px-4 py-2 border rounded-lg" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                        <input className="w-full mb-2 px-4 py-2 border rounded-lg" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                        <input className="w-full mb-2 px-4 py-2 border rounded-lg" type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} required />
                        <input className="w-full mb-4 px-4 py-2 border rounded-lg" type="text" name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} />
                        
                        <button type="submit" className="w-full py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition">Register</button>
                        <button type="button" className="w-full mt-3 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-yellow-400 transition" onClick={() => navigate("/Login")}>Back to Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
