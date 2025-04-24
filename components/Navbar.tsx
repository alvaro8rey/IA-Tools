'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Navbar() {
  const [email, setEmail] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user?.email) {
      setEmail(user.email);
    } else {
      setEmail(null);
    }
  };

  useEffect(() => {
    fetchUserData();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUserData();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setEmail(null);
    setShowMenu(false);
    router.push('/');
  };

  return (
    <div>
      {/* Navbar con position fixed */}
      <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-20">
        <div className="flex items-center justify-between p-4">
          {/* Logo o nombre de la página */}
          <Link href="/" className="text-2xl font-bold">IATools</Link>

          {/* Si el usuario está logueado, mostramos un pequeño menú */}
          {email && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="bg-blue-700 text-white px-4 py-2 rounded-lg focus:outline-none"
              >
                {email} {/* Mostrar el email del usuario */}
              </button>

              {/* Menú de usuario */}
              {showMenu && (
                <div className="absolute right-0 mt-2 bg-white text-black border rounded shadow-lg w-48">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Botón de contacto (en móvil o si lo prefieres visible siempre) */}
          <Link href="/contact">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Contacto
            </button>
          </Link>
        </div>
      </nav>

      {/* Espacio para no superponer contenido con la navbar */}
      <div className="pt-20">
        {/* Aquí va el contenido de la página */}
      </div>
    </div>
  );
}
