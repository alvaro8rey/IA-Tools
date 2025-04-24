'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [email, setEmail] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  return (
    <div>
      {/* Navbar con position fixed */}
      <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-20">
        <div className="flex items-center justify-between p-4">
          {/* Logo o nombre de la página */}
          <Link href="/" className="text-2xl font-bold">Tool AI</Link>
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
