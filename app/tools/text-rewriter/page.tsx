import { useState, useEffect } from 'react';
import BackHome from '@/components/CVTemplates/BackHome';

interface RewriteHistoryItem {
  original: string;
  rewritten: string;
  options: {
    mode: string;
    tone: string;
    language: string;
    purpose: string;
    correct: boolean;
    explain: boolean;
  };
}

export default function TextRewriterPage() {
  const [text, setText] = useState('');
  const [rewritten, setRewritten] = useState('');
  const [explanation, setExplanation] = useState('');
  const [alternatives, setAlternatives] = useState<string[]>([]);
  const [mode, setMode] = useState('más claro');
  const [tone, setTone] = useState('neutro');
  const [language, setLanguage] = useState('español');
  const [purpose, setPurpose] = useState('general');
  const [correct, setCorrect] = useState(false);
  const [explain, setExplain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<RewriteHistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('rewrite-history');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const saveToHistory = (item: RewriteHistoryItem) => {
    const updated = [item, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem('rewrite-history', JSON.stringify(updated));
  };

  const handleRewrite = async (includeAlternatives = false) => {
    if (!text.trim()) return;
    setLoading(true);
    setRewritten('');
    setExplanation('');
    setAlternatives([]);

    try {
      const res = await fetch('/api/text-rewriter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          mode,
          tone,
          language,
          purpose,
          correct,
          explain,
          alternatives: includeAlternatives,
        }),
      });

      const data = await res.json();
      if (data.result) setRewritten(data.result);
      if (data.explanation) setExplanation(data.explanation);
      if (data.alternatives) setAlternatives(data.alternatives);
      saveToHistory({ original: text, rewritten: data.result, options: { mode, tone, language, purpose, correct, explain } });
    } catch {
      setRewritten('Error al contactar con el servidor.');
    }

    setLoading(false);
  };

  const handleReset = () => {
    setText('');
    setRewritten('');
    setExplanation('');
    setAlternatives([]);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <BackHome />
      <h1 className="text-3xl font-bold mb-2 text-center">✍️ Reescritor de texto avanzado</h1>
      <p className="text-center text-gray-600 mb-6">
        Transforma tus textos con inteligencia artificial. Ajusta el estilo, tono, idioma y objetivo. Puedes incluso corregir errores y obtener explicaciones o varias versiones del resultado.
      </p>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <textarea
          className="w-full h-48 p-3 border rounded text-sm"
          placeholder="Escribe o pega tu texto aquí..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <label className="font-medium">Estilo</label>
            <select className="w-full p-2 border rounded" value={mode} onChange={e => setMode(e.target.value)}>
              <option>más claro</option>
              <option>más formal</option>
              <option>más breve</option>
              <option>más natural</option>
              <option>mejor redactado</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Tono</label>
            <select className="w-full p-2 border rounded" value={tone} onChange={e => setTone(e.target.value)}>
              <option>neutro</option>
              <option>profesional</option>
              <option>amistoso</option>
              <option>informal</option>
              <option>persuasivo</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Idioma</label>
            <select className="w-full p-2 border rounded" value={language} onChange={e => setLanguage(e.target.value)}>
              <option>español</option>
              <option>inglés</option>
              <option>francés</option>
              <option>alemán</option>
              <option>italiano</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="font-medium">Objetivo</label>
            <select className="w-full p-2 border rounded" value={purpose} onChange={e => setPurpose(e.target.value)}>
              <option value="general">General</option>
              <option value="email profesional">Email profesional</option>
              <option value="redes sociales">Redes sociales</option>
              <option value="resumen académico">Resumen académico</option>
              <option value="respuesta formal">Respuesta formal</option>
            </select>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={correct} onChange={() => setCorrect(!correct)} />
              Corregir errores
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={explain} onChange={() => setExplain(!explain)} />
              Explicar cambios
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleRewrite(false)}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Reescribiendo...' : 'Reescribir texto'}
          </button>

          <button
            onClick={() => handleRewrite(true)}
            disabled={loading}
            className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition"
          >
            {loading ? 'Generando...' : 'Varias versiones'}
          </button>

          <button
            onClick={handleReset}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Volver a empezar
          </button>
        </div>

        {rewritten && (
          <div className="mt-6 bg-gray-50 border rounded p-4">
            <h2 className="font-semibold text-lg mb-2">✅ Resultado</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-1 text-gray-500">Texto original</h3>
                <div className="p-2 bg-white border rounded text-sm whitespace-pre-wrap">{text}</div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1 text-gray-500">Texto reescrito</h3>
                <div className="p-2 bg-white border rounded text-sm whitespace-pre-wrap">{rewritten}</div>
              </div>
            </div>

            {explanation && (
              <div className="mt-4 text-sm text-gray-700">
                <h3 className="font-semibold">🔍 Explicación:</h3>
                <p className="mt-1 whitespace-pre-wrap">{explanation}</p>
              </div>
            )}
          </div>
        )}

        {alternatives.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold text-lg mb-2">✨ Otras versiones generadas:</h2>
            <ul className="space-y-2 text-sm">
              {alternatives.map((alt, idx) => (
                <li key={idx} className="bg-white border rounded p-3 whitespace-pre-wrap">{alt}</li>
              ))}
            </ul>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6">
            <h2 className="text-md font-semibold mb-2">🕘 Historial (últimos 5)</h2>
            <ul className="space-y-1 text-sm text-gray-600">
              {history.map((item, i) => (
                <li key={i} className="border p-2 bg-white rounded">
                  <strong>{item.options.mode}</strong> ({item.options.language}, tono {item.options.tone}) — {item.original.slice(0, 50)}...
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}