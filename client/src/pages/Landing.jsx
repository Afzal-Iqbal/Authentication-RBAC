import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Lock, Zap } from 'lucide-react';

const Landing = () => {
    return (
        <div className="bg-base-100">
            {/* Hero Section */}
            <div className="hero min-h-[80vh] bg-base-200 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2629&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center relative">
                <div className="hero-overlay bg-opacity-70 bg-black"></div>
                <div className="hero-content text-center text-neutral-content relative z-10">
                    <div className="max-w-xl">
                        <h1 className="mb-5 text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg">
                            Secure RBAC System
                        </h1>
                        <p className="mb-8 text-lg text-gray-200">
                            A powerful Role-Based Access Control implementation using React, Node.js, and MongoDB. Secure, scalable, and beautifully designed.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link to="/register" className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-transform">Get Started</Link>
                            <Link to="/login" className="btn btn-outline btn-secondary btn-lg shadow-lg hover:scale-105 transition-transform backdrop-blur-sm text-white">Live Demo</Link>
                        </div>
                    </div>
                </div>

                {/* Abstract Shapes/Blur */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            {/* Features Section */}
            <div className="py-20 px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Why use this RBAC?</h2>
                    <p className="max-w-2xl mx-auto opacity-70">Built with modern principles to ensure security and flexibility for any application structure.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="card bg-base-100 shadow-xl border border-base-200 hover:border-primary transition-colors">
                        <div className="card-body items-center text-center">
                            <div className="p-4 bg-primary/10 rounded-full mb-2">
                                <ShieldCheck size={32} className="text-primary" />
                            </div>
                            <h2 className="card-title">Secure Authentication</h2>
                            <p>JWT-based secure authentication flow with protected routes and token management.</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl border border-base-200 hover:border-secondary transition-colors">
                        <div className="card-body items-center text-center">
                            <div className="p-4 bg-secondary/10 rounded-full mb-2">
                                <Users size={32} className="text-secondary" />
                            </div>
                            <h2 className="card-title">Granular Roles</h2>
                            <p>Distinct Admin, Manager, and User roles with specific access privileges and content.</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl border border-base-200 hover:border-accent transition-colors">
                        <div className="card-body items-center text-center">
                            <div className="p-4 bg-accent/10 rounded-full mb-2">
                                <Zap size={32} className="text-accent" />
                            </div>
                            <h2 className="card-title">Modern Stack</h2>
                            <p>Built with React 19, TailwindCSS, DaisyUI, and Node.js for high performance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
