import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <span className="loading loading-infinity loading-lg text-primary"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold text-error">Access Denied</h1>
                        <p className="py-6">You do not have permission to view this page. Required role: {allowedRoles.join(', ')}</p>
                        <button className="btn btn-primary" onClick={() => window.history.back()}>Go Back</button>
                    </div>
                </div>
            </div>
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;
