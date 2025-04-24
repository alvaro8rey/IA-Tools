'use client';

import Head from 'next/head';

export default function WorkingOnIt() {
  return (
    <>
      <Head>
        <title>Trabajando en el Sitio - Tool AI</title>
        <meta name="description" content="Estamos mejorando el sitio para brindarte una mejor experiencia. Vuelve pronto para explorar todas las herramientas." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">🚧 Estamos trabajando en ello...</h1>
        <p className="text-xl text-gray-600 mb-6">
          Estamos mejorando el sitio para brindarte una mejor experiencia. Vuelve pronto para explorar todas las herramientas.
        </p>
        <div className="w-32 h-32 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-lg text-gray-500">
          ¡Gracias por tu paciencia!
        </p>
      </div>
    </>
  );
}
