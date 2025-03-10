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

        axios
            .post(`https://viverebackend-main-girysq.laravel.cloud/api/register`, form)
            .then((res) => {
                console.log(res);

                localStorage.setItem("user", JSON.stringify(res.data.user));

                login(form.email, form.password);

                // redirect to the homepage after successful registration
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
        <div className="ml-150 mt-50">
            <div className="flex-1 border-2 border-black p-4 rounded">
            <h1 className="text-xl font-bold mt-2 text-primary">Register</h1>
            <form onSubmit={handleSubmit} className="box">
                {error && <div className="notification is-danger">{error}</div>} 
                
                <div className="field">
                    <label className="label">Username ! </label>
                    <div className="control">
                        <input
                            className="input"
                            onChange={handleChange}
                            value={form.username}
                            type="text"
                            name="username"
                            placeholder="Emma"
                        />
                    </div>
                </div>
              
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            onChange={handleChange}
                            value={form.email}
                            type="email"
                            name="email"
                            placeholder="test@vivere.com"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className="input"
                            onChange={handleChange}
                            value={form.password}
                            type="password"
                            name="password"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Date Of Birth</label>
                    <div className="control">
                        <input
                            className="input"
                            onChange={handleChange}
                            value={form.date_of_birth}
                            type="date"
                            name="date_of_birth"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Bio</label>
                    <div className="control">
                        <input
                            className="input"
                            onChange={handleChange}
                            value={form.bio}
                            type="text"
                            name="bio"
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="mt-3 px-4 py-2 bg-primary text-white rounded-lg" type="submit">
                            Submit
                        </button>
                    </div>
                </div>
                
            </form>
        </div>
        </div>
        
    );
};

export default RegisterForm;