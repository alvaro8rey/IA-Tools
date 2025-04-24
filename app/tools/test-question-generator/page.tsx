import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import BackHome from '@/components/CVTemplates/BackHome';

export default function TestQuestionGeneratorPage() {
  const [inputType, setInputType] = useState<'text' | 'file'>('text');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
    setText('');
  };

  const extractTextFromFile = async () => {
    if (!file) return '';
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        toast.error('❌ Error al procesar el archivo.');
        return '';
      }

      const contentType = res.headers.get('Content-Type');
      if (contentType?.includes('application/json')) {
        const data = await res.json();
        return data.text || '';
      } else {
        const raw = await res.text();
        console.error('❌ Respuesta inesperada del servidor:', raw);
        return '';
      }
    } catch (err) {
      toast.error('❌ Error al subir el archivo.');
      return '';
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setQuestions([]);

    let content = text;
    if (inputType === 'file' && file) {
      content = await extractTextFromFile();
    }

    try {
      const res = await fetch('/api/test-question-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content, quantity }),
      });

      const contentType = res.headers.get('Content-Type');

      if (!res.ok) {
        const errorMsg = await res.text();
        toast.error('❌ Error al generar las preguntas.');
        return;
      }

      if (contentType?.includes('application/json')) {
        const data = await res.json();
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
          toast.success('✅ Preguntas generadas correctamente');
        } else {
          toast.error('⚠️ No se generaron preguntas.');
        }
      }
    } catch (err) {
      toast.error('❌ Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText('');
    setFile(null);
    setQuestions([]);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <BackHome />
      <h1 className="text-3xl font-bold mb-2 text-center">📝 Generador de preguntas tipo test</h1>
      <p className="text-center text-gray-600 mb-6">
        Pega un texto o sube unos apuntes en PDF, Word o TXT. La IA generará preguntas tipo test basadas en el contenido.
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
          placeholder="Escribe o pega aquí el contenido..."
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

      <div className="mb-4 flex items-center gap-4">
        <label className="font-medium">Cantidad de preguntas:</label>
        <select
          className="border p-2 rounded"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {[3, 5, 10, 15].map((q) => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-4 flex-wrap mb-6">
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Generando...' : 'Generar preguntas'}
        </button>
        <button
          onClick={handleReset}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Reiniciar
        </button>
      </div>

      {questions.length > 0 && (
        <div className="bg-gray-50 border rounded p-4">
          <h2 className="font-semibold mb-3">📋 Preguntas generadas:</h2>
          <ul className="space-y-2 text-sm mb-4">
            {questions.map((q, i) => {
              const formatted = q.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
              return (
                <li key={i} className="p-2 bg-white border rounded" dangerouslySetInnerHTML={{ __html: formatted }} />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
