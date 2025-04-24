'use client';

import Link from 'next/link';

export default function BackHome() {
  return (
    <div className="mb-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition font-semibold shadow-sm"
      >
        ← Volver al inicio
      </Link>
    </div>
  );
}
