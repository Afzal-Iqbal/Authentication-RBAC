import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Shield, Briefcase, UserCheck, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [content, setContent] = useState({ admin: null, manager: null, user: null });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Always fetch user content
                const userRes = await api.get('/users/user');
                setContent(prev => ({ ...prev, user: userRes.data.msg }));

                // Fetch manager content if role allows
                if (['manager', 'admin'].includes(user.role)) {
                    try {
                        const managerRes = await api.get('/users/manager');
                        setContent(prev => ({ ...prev, manager: managerRes.data.msg }));
                    } catch (e) { console.error(e) }
                }

                // Fetch admin content if role allows
                if (user.role === 'admin') {
                    try {
                        const adminRes = await api.get('/users/admin');
                        setContent(prev => ({ ...prev, admin: adminRes.data.msg }));
                    } catch (e) { console.error(e) }
                }
            } catch (err) {
                console.error("Error fetching data", err);
                setError("Failed to fetch some data");
            }
        };

        if (user) fetchData();
    }, [user]);

    return (
        <div className="p-8 min-h-screen bg-base-200">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="hero rounded-2xl bg-gradient-to-br from-base-100 to-base-200 shadow-xl overflow-hidden p-6">
                    <div className="hero-content flex-col lg:flex-row-reverse w-full justify-between">
                        <div className="text-5xl opacity-20 rotate-12 absolute right-10">
                            {user.role === 'admin' ? <Shield size={200} /> : user.role === 'manager' ? <Briefcase size={200} /> : <UserCheck size={200} />}
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">Dashboard</h1>
                            <p className="py-2 text-lg text-base-content/70">Welcome back, <span className="font-semibold text-primary">{user.username}</span>!</p>
                            <div className="badge badge-lg badge-outline gap-2 capitalize mt-2 border-primary text-primary">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                {user.role} Access
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* User Content Card */}
                    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                        <div className="card-body">
                            <h2 className="card-title text-success"><UserCheck /> User Area</h2>
                            <p>{content.user ? content.user : "Loading..."}</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-success badge-outline">Available</div>
                            </div>
                        </div>
                    </div>

                    {/* Manager Content Card */}
                    <div className={`card bg-base-100 shadow-lg transition-all ${['manager', 'admin'].includes(user.role) ? 'hover:shadow-2xl hover:-translate-y-1' : 'opacity-60 grayscale'}`}>
                        <div className="card-body">
                            <h2 className="card-title text-warning"><Briefcase /> Manager Area</h2>
                            {['manager', 'admin'].includes(user.role) ? (
                                <p>{content.manager || "Loading..."}</p>
                            ) : (
                                <p className="text-error flex items-center gap-1"><AlertTriangle size={16} /> Access Denied</p>
                            )}
                            <div className="card-actions justify-end">
                                {['manager', 'admin'].includes(user.role) ? <div className="badge badge-warning badge-outline">Unlocked</div> : <div className="badge badge-ghost">Locked</div>}
                            </div>
                        </div>
                    </div>

                    {/* Admin Content Card */}
                    <div className={`card bg-base-100 shadow-lg transition-all ${user.role === 'admin' ? 'hover:shadow-2xl hover:-translate-y-1' : 'opacity-60 grayscale'}`}>
                        <div className="card-body">
                            <h2 className="card-title text-error"><Shield /> Admin Area</h2>
                            {user.role === 'admin' ? (
                                <p>{content.admin || "Loading..."}</p>
                            ) : (
                                <p className="text-error flex items-center gap-1"><AlertTriangle size={16} /> Access Denied</p>
                            )}
                            <div className="card-actions justify-end">
                                {user.role === 'admin' ? <div className="badge badge-error badge-outline">Unlocked</div> : <div className="badge badge-ghost">Locked</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
