import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, User, Lock } from 'lucide-react';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const success = await login(credentials);
        setIsLoading(false);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200 flex justify-center items-center">
            <div className="card w-full max-w-sm shrink-0 shadow-2xl bg-base-100/90 backdrop-blur border border-base-200">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold justify-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Welcome Back</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary">
                                <User size={16} className="text-base-content/60" />
                                <input
                                    type="text"
                                    name="username"
                                    className="grow"
                                    placeholder="Enter username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary">
                                <Lock size={16} className="text-base-content/60" />
                                <input
                                    type="password"
                                    name="password"
                                    className="grow"
                                    placeholder="Enter password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className={`btn btn-primary bg-gradient-to-r from-primary to-secondary border-none hover:scale-[1.02] active:scale-[0.98] transition-all text-white font-bold ${isLoading ? 'btn-disabled' : ''}`}>
                                {isLoading ? <span className="loading loading-spinner"></span> : <><LogIn size={18} /> Login</>}
                            </button>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <div className="text-center">
                        <span className="text-sm">Don't have an account? </span>
                        <Link to="/register" className="link link-primary font-semibold">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
