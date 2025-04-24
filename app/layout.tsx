'use client'
import './globals.css';
import { useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Footer from '../components/Footer';
import Navbar from '@/components/Navbar';
import { Toaster } from 'sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inicializar el cliente de Supabase una vez al montar el componente
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <Toaster />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
