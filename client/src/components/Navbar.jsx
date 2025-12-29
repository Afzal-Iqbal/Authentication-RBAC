import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Shield, Briefcase } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-base-200">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold hover:scale-105 transition-transform">
                    RBAC Flow
                </Link>
            </div>
            <div className="flex-none gap-4">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                                <span className="text-xl">{user.username ? user.username[0].toUpperCase() : 'U'}</span>
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-300">
                            <li>
                                <div className="flex flex-col items-start gap-1 p-2 cursor-default hover:bg-transparent">
                                    <span className="font-semibold">{user.username || 'User'}</span>
                                    <span className="badge badge-primary badge-xs uppercase">{user.role}</span>
                                </div>
                            </li>
                            <div className="divider my-0"></div>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><button onClick={handleLogout} className="text-error">Logout <LogOut size={16} /></button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                        <Link to="/register" className="btn btn-primary btn-sm text-primary-content shadow-lg shadow-primary/30">Get Started</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
