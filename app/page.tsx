'use client';

import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>IATools - Herramientas Inteligentes para Mejorar tu Productividad</title>
        <meta name="description" content="Genera ideas, automatiza tareas y mejora tu productividad con herramientas basadas en inteligencia artificial." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6 text-center">🧰 Herramientas con IA</h1>
        <p className="text-center text-gray-600 mb-12">
          Explora una colección de herramientas que usan inteligencia artificial para ayudarte a trabajar, estudiar o crear.
        </p>

        <div className="space-y-12">
          {/* Aquí puedes añadir las secciones de herramientas como lo hacías antes */}
        </div>
      </div>
    </>
  );
}
