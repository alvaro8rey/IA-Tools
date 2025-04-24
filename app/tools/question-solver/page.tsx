import { useState } from 'react';
import BackHome from '@/components/CVTemplates/BackHome';

export default function QuestionSolverPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/question-solver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setResult(data.result || 'No se pudo obtener respuesta.');
    } catch (err) {
      setResult('Error al contactar con el servidor.');
    }

    setLoading(false);
    setShowResult(true);
  };

  const handleReset = () => {
    setText('');
    setResult('');
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    alert('✅ Resultado copiado al portapapeles.');
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'respuestas.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <BackHome />
      <h1 className="text-3xl font-bold mb-4 text-center">🧠 Asistente de respuestas inteligente</h1>
      <p className="text-center text-gray-600 mb-6">
        Pega cualquier bloque de texto que contenga preguntas (tipo test o abiertas). La IA identificará y resolverá cada una, explicando la respuesta.
      </p>

      <textarea
        className="w-full h-48 p-4 border rounded mb-4 text-sm"
        placeholder="Pega aquí tus preguntas..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-4 flex-wrap mb-6">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Resolviendo...' : 'Resolver preguntas'}
        </button>
        <button
          onClick={handleReset}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Reiniciar
        </button>
        {result && (
          <button
            onClick={() => setShowResult(!showResult)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            {showResult ? 'Ocultar resultado' : 'Mostrar resultado'}
          </button>
        )}
      </div>

      {showResult && result && (
        <div className="bg-white border rounded p-5 shadow-sm transition whitespace-pre-wrap text-sm">
          <h2 className="font-semibold text-lg mb-3 text-blue-700">✅ Resultado generado:</h2>
          <div
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: result }}
          />
          <div className="flex gap-4">
            <button
              onClick={handleCopy}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Copiar al portapapeles
            </button>
            <button
              onClick={handleDownload}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Descargar como TXT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
