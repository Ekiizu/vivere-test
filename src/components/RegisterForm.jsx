// import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const RegisterForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(null); 

    const handleSubmit = (e) => {
        e.preventDefault();

        
        setError(null);

        axios
            .post(`https://fed-medical-clinic-api.vercel.app/register`, form)
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
        <div className="container mt-5">
            <h1 className="title is-3 has-text-centered">Register</h1>
            <form onSubmit={handleSubmit} className="box">
                {error && <div className="notification is-danger">{error}</div>} 
                
                <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                        <input
                            className="input"
                            onChange={handleChange}
                            value={form.first_name}
                            type="text"
                            name="first_name"
                            placeholder="Ryan"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                        <input
                            className="input"
                            onChange={handleChange}
                            value={form.last_name}
                            type="text"
                            name="last_name"
                            placeholder="Crinnion"
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
                            placeholder="holymoly@frontend.com"
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
                    <div className="control">
                        <button className="button is-success is-fullwidth" type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;