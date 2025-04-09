import { ReactNode } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

interface MainLayoutProps {
    children: ReactNode;
}

export default function Main({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-[#0B0118] flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
} 