import { useState } from 'react';
import BackHome from "@/components/CVTemplates/BackHome";

export default function NoteSummaryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setSummary('');
    setText('');
  };

  const handleSummarize = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Paso 1: Extraer texto
      const extractRes = await fetch("/api/extract-pdf-text", {
        method: "POST",
        body: formData,
      });

      const extractData = await extractRes.json();
      const extractedText = extractData.text;

      // Paso 2: Resumir el texto extraído
      const res = await fetch('/api/note-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: extractedText }),
      });

      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
        setText(extractedText);
      } else {
        setSummary('Error al generar el resumen.');
      }
    } catch (err) {
      console.error(err);
      setSummary('Error al contactar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <BackHome />
      <h1 className="text-3xl font-bold mb-2 text-center">📚 Resumen de apuntes</h1>
      <p className="text-center text-gray-600 mb-6">
        Sube tus apuntes o textos en formato PDF y obtén un resumen claro, conciso y estructurado. Ideal para estudiantes que quieren repasar de forma rápida o preparar exámenes a partir de contenidos extensos.
      </p>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="block w-full text-sm"
        />

        {file && (
          <p className="text-sm text-gray-500">Archivo cargado: {file.name}</p>
        )}

        <button
          onClick={handleSummarize}
          disabled={loading || !file}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Resumiendo...' : 'Generar resumen'}
        </button>

        {summary && (
          <div className="mt-6 bg-gray-50 border rounded p-4">
            <h2 className="font-semibold mb-2 text-lg">📝 Resumen generado:</h2>
            <p className="whitespace-pre-wrap">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
