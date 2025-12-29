import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Lock, Shield } from 'lucide-react';

const Register = () => {
    const [userData, setUserData] = useState({ username: '', password: '', role: 'user' });
    const { register } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const success = await register(userData);
        setIsLoading(false);
        if (success) {
            navigate('/login');
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200 flex justify-center items-center">
            <div className="card w-full max-w-sm shrink-0 shadow-2xl bg-base-100/90 backdrop-blur border border-base-200">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold justify-center mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Create Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 focus-within:ring-2 focus-within:ring-secondary focus-within:outline-none">
                                <User size={16} className="text-base-content/60" />
                                <input
                                    type="text"
                                    name="username"
                                    className="grow"
                                    placeholder="Choose username"
                                    value={userData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 focus-within:ring-2 focus-within:ring-secondary focus-within:outline-none">
                                <Lock size={16} className="text-base-content/60" />
                                <input
                                    type="password"
                                    name="password"
                                    className="grow"
                                    placeholder="Create password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 focus-within:ring-2 focus-within:ring-secondary focus-within:outline-none">
                                <Shield size={16} className="text-base-content/60" />
                                <select
                                    name="role"
                                    className="grow bg-transparent outline-none border-none p-0"
                                    value={userData.role}
                                    onChange={handleChange}
                                >
                                    <option value="user">User</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className={`btn btn-secondary bg-gradient-to-r from-secondary to-accent border-none hover:scale-[1.02] active:scale-[0.98] transition-all text-white font-bold ${isLoading ? 'btn-disabled' : ''}`}>
                                {isLoading ? <span className="loading loading-spinner"></span> : <><UserPlus size={18} /> Register</>}
                            </button>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <div className="text-center">
                        <span className="text-sm">Already have an account? </span>
                        <Link to="/login" className="link link-secondary font-semibold">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
