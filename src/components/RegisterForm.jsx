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
        <div className="container ml-165 mt-70">
            <h1 className="title is-3 has-text-centered">Register</h1>
            <form onSubmit={handleSubmit} className="box">
                {error && <div className="notification is-danger">{error}</div>} 
                
                <div className="field">
                    <label className="label">username</label>
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