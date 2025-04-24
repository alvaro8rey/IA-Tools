'use client';

import { useState } from 'react';
import BackHome from '@/components/CVTemplates/BackHome';

export default function IdeaGeneratorPage() {
  const [category, setCategory] = useState('negocios');
  const [description, setDescription] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setIdeas([]);

    try {
      const res = await fetch('/api/idea-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, description }),
      });

      const data = await res.json();
      if (data.ideas) {
        setIdeas(data.ideas);
      } else {
        setIdeas(['No se generaron ideas.']);
      }
    } catch (err) {
      setIdeas(['Error al contactar con el servidor.']);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <BackHome />
      <h1 className="text-3xl font-bold mb-2 text-center">💡 Generador de ideas</h1>
      <p className="text-center text-gray-600 mb-6">
        Elige una categoría, describe tu tema o necesidad y obtén una lluvia de ideas creativas gracias a la IA.
      </p>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Categoría</label>
          <select
            className="w-full p-3 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="negocios">Ideas de negocios</option>
            <option value="contenido">Ideas para contenido</option>
            <option value="youtube">Ideas para YouTube</option>
            <option value="apps">Ideas de apps o software</option>
            <option value="marketing">Ideas para campañas de marketing</option>
            <option value="otros">Otros tipos de ideas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción o contexto</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            placeholder="Ej: contenido sobre mascotas, idea de app para ahorrar dinero..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Generando ideas...' : 'Generar ideas'}
        </button>

        {ideas.length > 0 && (
          <div className="mt-6 space-y-2">
            <h2 className="text-lg font-semibold">🎯 Ideas generadas:</h2>
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              {ideas.map((idea, idx) => (
                <li key={idx} className="bg-gray-100 px-3 py-1 rounded">{idea}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
