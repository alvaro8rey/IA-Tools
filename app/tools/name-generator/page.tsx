import { useState } from 'react';
import BackHome from '@/components/CVTemplates/BackHome';

export default function NameGeneratorPage() {
  const [type, setType] = useState('marca');
  const [description, setDescription] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setNames([]);

    try {
      const res = await fetch('/api/name-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, description }),
      });

      const data = await res.json();
      if (data.names) {
        setNames(data.names);
      } else {
        alert('No se generaron nombres.');
      }
    } catch (error) {
      alert('Error al contactar con el servidor.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <BackHome />
      <h1 className="text-3xl font-bold mb-2 text-center">🧠 Generador de nombres</h1>
      <p className="text-center text-gray-600 mb-6">
        Crea nombres creativos y originales para todo tipo de ideas. Puedes generar nombres para marcas, personas, mascotas, proyectos, startups y mucho más, adaptándolos a una temática o estilo que tú elijas.
      </p>


      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tipo de nombre</label>
          <select
            className="w-full p-3 border rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="marca">Nombre para una marca</option>
            <option value="persona">Nombre de persona</option>
            <option value="mascota">Nombre para mascota</option>
            <option value="proyecto">Nombre de proyecto</option>
            <option value="startup">Nombre de startup</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción (opcional)</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            placeholder="Ej: tecnología, comida, naturaleza..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Generando...' : 'Generar nombres'}
        </button>

        {names.length > 0 && (
          <div className="mt-6 space-y-2">
            <h2 className="text-lg font-semibold">🎉 Nombres sugeridos:</h2>
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              {names.map((name, idx) => (
                <li key={idx} className="bg-gray-100 px-3 py-1 rounded">{name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
