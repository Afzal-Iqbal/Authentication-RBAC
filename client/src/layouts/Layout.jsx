import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="font-sans antialiased text-base-content min-h-screen flex flex-col bg-base-100">
            <Navbar />
            <main className="flex-grow relative">
                <Outlet />
            </main>
            <Toaster position="top-right" />
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by RBAC Demo</p>
                </aside>
            </footer>
        </div>
    );
};
export default Layout;
