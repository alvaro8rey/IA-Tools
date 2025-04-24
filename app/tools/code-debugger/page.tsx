'use client';

import { useState } from 'react';
import BackHome from '../../../components/CVTemplates/BackHome';

export default function CodeDebuggerPage() {
  const [code, setCode] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDebug = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/code-debugger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      if (data.analysis) {
        setResponse(data.analysis);
      } else {
        setResponse('No se pudo analizar el código.');
      }
    } catch (err) {
      console.error(err);
      setResponse('Error al contactar con el servidor.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <BackHome />
      <h1 className="text-3xl font-bold mb-2 text-center">🛠️ Analizador de código</h1>
      <p className="text-center text-gray-600 mb-6">
        Pega aquí tu código y detecta posibles errores, advertencias o mejoras con ayuda de inteligencia artificial.
      </p>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <textarea
          className="w-full h-64 p-3 border rounded font-mono text-sm"
          placeholder="Pega aquí tu código..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <div className="flex gap-4">
          <button
            onClick={handleDebug}
            disabled={loading || !code.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Analizando...' : 'Analizar código'}
          </button>

          <button
            onClick={() => {
              setCode('');
              setResponse('');
            }}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Volver a empezar
          </button>
        </div>


        {response && (
          <div className="bg-gray-50 border rounded p-4 whitespace-pre-wrap">
            <h2 className="font-semibold mb-2">💡 Resultados del análisis:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
