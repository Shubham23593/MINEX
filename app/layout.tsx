import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import { MineProvider } from '@/context/MineContext';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MINEX | AI-Powered Manganese Exploration & Production Intelligence',
  description:
    'Smart India Hackathon SIH26009 prototype for MOIL Limited. AI/ML and Space Technology for Manganese Reserve Prospectivity & Production Shortfall Forecasting.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className={`${inter.className} min-h-full flex bg-[#060913] text-slate-100`}>
        <MineProvider>
          <div className="flex w-full min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0">
              <Header />
              <main className="flex-1 p-6 overflow-y-auto">{children}</main>
            </div>
          </div>
        </MineProvider>
      </body>
    </html>
  );
}
