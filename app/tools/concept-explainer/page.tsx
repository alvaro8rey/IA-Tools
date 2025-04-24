import { useState } from 'react';
import BackHome from '@/components/CVTemplates/BackHome';

export default function ConceptExplainerPage() {
  const [input, setInput] = useState('');
  const [level, setLevel] = useState('niño');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/concept-explainer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, level }),
      });

      const data = await res.json();
      setResult(data.explanation || 'No se pudo generar la explicación.');
    } catch {
      setResult('Error al contactar con el servidor.');
    }

    setLoading(false);
  };

  const handleReset = () => {
    setInput('');
    setResult('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <BackHome />
      <h1 className="text-3xl font-bold mb-2 text-center">🧠 Explicador de conceptos</h1>
      <p className="text-center text-gray-600 mb-6">
        ¿No entiendes algo? Pega aquí un concepto, definición, fragmento o duda, y la IA lo explicará con palabras sencillas. Puedes elegir si quieres que lo entienda un niño, un adolescente o un universitario.
      </p>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <textarea
          className="w-full h-40 p-3 border rounded text-sm"
          placeholder="Ej: ¿Qué es el sistema nervioso central? o ¿Cómo funciona el blockchain?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="flex gap-4 items-center">
          <label className="font-medium text-sm">Nivel de explicación:</label>
          <select
            className="p-2 border rounded text-sm"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="niño">Para un niño</option>
            <option value="adolescente">Para un adolescente</option>
            <option value="universitario">Para un universitario</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleExplain}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Explicando...' : 'Explicar'}
          </button>

          <button
            onClick={handleReset}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Volver a empezar
          </button>
        </div>

        {result && (
          <div className="mt-6 bg-gray-50 border rounded p-4 whitespace-pre-wrap text-sm text-gray-800">
            <h2 className="font-semibold mb-2">🗣️ Explicación generada:</h2>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
