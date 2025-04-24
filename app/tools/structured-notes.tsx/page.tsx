import { useState } from 'react';
import BackHome from '@/components/CVTemplates/BackHome';

export default function CVReviewPage() {
  const [inputType, setInputType] = useState<'text' | 'file'>('text');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [summary, setSummary] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;
    setFile(uploaded);
    setText('');
  };

  const extractTextFromFile = async (): Promise<string> => {
    if (!file) return '';
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      const contentType = res.headers.get('Content-Type');
      if (!res.ok) return '';

      if (contentType?.includes('application/json')) {
        const data = await res.json();
        return data.text || '';
      } else {
        return '';
      }
    } catch (err) {
      console.error('Error al extraer texto del archivo:', err);
      return '';
    }
  };

  const handleReview = async () => {
    setLoading(true);
    setFeedback('');
    setScore(null);
    setSummary('');

    let content = text;
    if (inputType === 'file' && file) {
      content = await extractTextFromFile();
    }

    try {
      const res = await fetch('/api/cv-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content }),
      });

      const data = await res.json();
      setScore(data.score || null);
      setSummary(data.summary || '');
      setFeedback(data.feedback || 'No se pudo generar una respuesta.');
    } catch (err) {
      setFeedback('Error al contactar con el servidor.');
    }

    setLoading(false);
  };

  const handleReset = () => {
    setText('');
    setFile(null);
    setFeedback('');
    setScore(null);
    setSummary('');
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <BackHome />
      <h1 className="text-3xl font-bold mb-2 text-center">🧠 Revisión inteligente de CV</h1>
      <p className="text-center text-gray-600 mb-6">
        Pega el contenido de tu currículum o sube un archivo (.pdf, .txt, .docx) y deja que la IA te dé consejos personalizados para mejorarlo.
      </p>

      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setInputType('text')}
          className={`px-4 py-2 rounded ${inputType === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Escribir texto
        </button>
        <button
          onClick={() => setInputType('file')}
          className={`px-4 py-2 rounded ${inputType === 'file' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Subir archivo
        </button>
      </div>

      {inputType === 'text' ? (
        <textarea
          className="w-full h-40 p-3 border rounded text-sm mb-4"
          placeholder="Pega aquí el contenido de tu CV..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <input
          type="file"
          accept=".pdf,.txt,.docx"
          onChange={handleFileUpload}
          className="mb-4"
        />
      )}

      <div className="flex gap-4 flex-wrap mb-6">
        <button
          onClick={handleReview}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Analizando...' : 'Revisar CV'}
        </button>
        <button
          onClick={handleReset}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Reiniciar
        </button>
      </div>

      {(score || summary || feedback) && (
        <div className="bg-gray-50 border rounded p-4">
          {score !== null && (
            <p className="text-lg font-semibold mb-2">⭐ Puntuación general: {score} / 10</p>
          )}

          {summary && (
            <p className="text-sm italic mb-4 text-gray-700">📝 Resumen del CV: "{summary}"</p>
          )}

          {feedback && (
            <>
              <h2 className="font-semibold mb-2">📋 Recomendaciones detalladas:</h2>
              <p className="text-sm whitespace-pre-line">{feedback}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
