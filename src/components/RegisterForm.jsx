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
                console.log(res)
                localStorage.setItem("user", JSON.stringify(res.data.data));
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
            <div className="relative w-[800px] h-[600px] border-3 border-primary rounded-lg shadow-lg flex">
                
                {/* left side - welcome message */}
                <div className="w-1/2 flex flex-col justify-center p-8">

                <img
                    src="images/VivereLogoWhite.svg"
                    alt="User Profile"
                    className="w-28 h-28 rounded-full object-cover"
                    />
                    <h1 className="text-2xl font-bold">Join Vivere Today! (∪ ◡ ∪)</h1>
                    <p className="text-sm mt-2 text-secondary-content">Create an account and start exploring and art website by artists for artists tailored just for you.</p>
                    
                </div>

                {/* right side - registration form */}
                <div className="w-1/2 flex flex-col items-center p-8">
                    <h2 className="text-xl font-semibold">Register</h2>
                    {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                    <form className="w-full mt-4" onSubmit={handleSubmit}>
                        <input className="w-full mb-2 px-4 py-2 border rounded-lg" type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
                        <input className="w-full mb-2 px-4 py-2 border rounded-lg" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                        <input className="w-full mb-2 px-4 py-2 border rounded-lg" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                        <input className="w-full mb-2 px-4 py-2 border rounded-lg" type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} required />
                        <input className="w-full mb-4 px-4 py-2 border rounded-lg" type="text" name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} />
                        
                        <button type="submit" className="w-full py-2 bg-primary text-secondary rounded-lg shadow-md hover:bg-secondary-600 transition">Register</button>
                        <button type="button" className="w-full mt-3 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition" onClick={() => navigate("/login")}>Back to Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
