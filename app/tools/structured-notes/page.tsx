'use client';

import { useState, useRef } from 'react';
import BackHome from '@/components/CVTemplates/BackHome';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function StructuredNotesPage() {
  const [mode, setMode] = useState<'to-schema' | 'to-notes'>('to-schema');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [complexity, setComplexity] = useState<'breve' | 'medio' | 'completo'>('medio');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [wasTruncated, setWasTruncated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleModeChange = (newMode: 'to-schema' | 'to-notes') => {
    setMode(newMode);
    setText('');
    setFile(null);
    setResult('');
    setWasTruncated(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setText('');
    setResult('');
    setWasTruncated(false);

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const res = await fetch('/api/extract-pdf-text', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setText(data.text || '');
    } catch (err) {
      alert('❌ Error al procesar el PDF.');
    }
  };

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult('');
    setWasTruncated(false);

    try {
      const res = await fetch('/api/structured-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, text, complexity }),
      });

      const data = await res.json();
      setResult(data.result || '❌ No se pudo generar el contenido.');
      if (data.wasTruncated) setWasTruncated(true);
    } catch (err) {
      setResult('❌ Error al contactar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    alert('✅ Texto copiado al portapapeles.');
  };

  const exportToPDF = () => {
    const pdf = new jsPDF();
    const marginLeft = 20;
    const marginTop = 30;
    const maxWidth = 170;
    const lineHeight = 10;
  
    const fileName = mode === 'to-schema' ? 'esquema.pdf' : 'apuntes.pdf';
    const title = mode === 'to-schema' ? '📘 Esquema Generado' : '📄 Apuntes Generados';
  
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.text(title, 105, 20, { align: 'center' });
  
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
  
    const lines = pdf.splitTextToSize(result, maxWidth);
    let y = marginTop;
  
    lines.forEach((line, i) => {
      if (y > 280) {
        pdf.addPage();
        y = marginTop;
      }
  
      pdf.text(line, marginLeft, y);
      y += lineHeight;
    });
  
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.text(`Página ${i} de ${pageCount}`, 105, 290, { align: 'center' });
    }
  
    pdf.save(fileName);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <BackHome />
      <h1 className="text-3xl font-bold mb-2 text-center">📚 Generador de esquemas y apuntes</h1>
      <p className="text-center text-gray-600 mb-6">
        Genera esquemas a partir de apuntes largos o desarrolla apuntes desde un esquema. También puedes subir archivos PDF.
      </p>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleModeChange('to-schema')}
          className={`px-4 py-2 rounded ${mode === 'to-schema' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Texto → Esquema
        </button>
        <button
          onClick={() => handleModeChange('to-notes')}
          className={`px-4 py-2 rounded ${mode === 'to-notes' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Esquema → Apuntes
        </button>
      </div>

      <div className="mb-4">
        <textarea
          className="w-full h-40 p-3 border rounded text-sm"
          placeholder={mode === 'to-schema'
            ? 'Pega aquí tus apuntes largos para generar un esquema estructurado...'
            : 'Pega aquí un esquema con títulos y subtítulos para desarrollar apuntes...'}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="text-sm text-gray-500 mt-2">O sube un archivo PDF:</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="mt-2"
        />
        {file && (
          <div className="mt-2 flex items-center justify-between bg-white border rounded px-3 py-2 text-sm">
            <span className="text-gray-700 truncate max-w-[80%]">{file.name}</span>
            <button
              onClick={() => {
                setFile(null);
                setText('');
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              className="text-red-500 font-bold hover:underline ml-4"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {mode === 'to-notes' && (
        <div className="mb-4">
          <label className="font-medium mr-2">Nivel de profundidad:</label>
          <select
            className="border rounded p-2"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value as any)}
          >
            <option value="breve">Breve</option>
            <option value="medio">Medio</option>
            <option value="completo">Completo</option>
          </select>
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Generando...' : 'Generar'}
      </button>

      {wasTruncated && (
        <p className="text-sm text-yellow-700 bg-yellow-100 border border-yellow-300 p-3 rounded mt-6">
          ⚠️ El contenido era muy largo. Solo se ha procesado una parte del archivo para evitar errores de límite de tokens.
        </p>
      )}

      {result && (
        <div ref={resultRef} className="mt-4 p-4 bg-gray-100 border rounded max-h-[500px] overflow-auto whitespace-pre-wrap font-mono text-sm leading-relaxed">
          <h2 className="font-semibold mb-3">🧾 Resultado generado:</h2>
          <p>{result}</p>

          <div className="mt-4 flex gap-4">
            <button
              onClick={handleCopy}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Copiar al portapapeles
            </button>
            <button
              onClick={exportToPDF}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Exportar como PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
