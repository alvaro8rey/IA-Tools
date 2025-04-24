import { useState } from "react";
import BackHome from "@/components/CVTemplates/BackHome";

export default function ChatWithPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'upload' | 'ask'>('upload');
  const [history, setHistory] = useState<{ question: string; answer: string }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setText("");
    setAnswer("");
    setStep('upload');
    setHistory([]);
  };

  const handleExtractText = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/extract-pdf-text", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.text) {
        setText(data.text);
        setStep('ask');
      } else {
        alert("No se pudo extraer el texto del PDF.");
      }
    } catch (err) {
      alert("Error al procesar el archivo.");
    }

    setLoading(false);
  };

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    const res = await fetch("/api/ask-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, question }),
    });
    const data = await res.json();
    setAnswer(data.answer);
    setHistory(prev => [...prev, { question, answer: data.answer }]);
    setQuestion("");
    setLoading(false);
  };

  const handleReset = () => {
    setFile(null);
    setText("");
    setQuestion("");
    setAnswer("");
    setStep('upload');
    setHistory([]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="mb-2">
        <BackHome />
      </div>

      <h1 className="text-3xl font-bold mb-2 text-center">🧾 Chat con documentos PDF</h1>
      <p className="text-center text-gray-600 mb-6">
        Sube cualquier documento PDF, extrae automáticamente su contenido y hazle preguntas como si hablaras con un experto del tema. Perfecto para estudiar, analizar informes o entender textos complejos fácilmente.
      </p>


      <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
        {step === 'upload' && (
          <>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="mb-4 block w-full text-sm text-gray-700"
            />
            <button
              onClick={handleExtractText}
              disabled={!file || loading}
              className="bg-blue-600 text-white font-medium px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 w-full"
            >
              {loading ? "Procesando PDF..." : "Extraer texto del PDF"}
            </button>
          </>
        )}

        {step === 'ask' && (
          <>
            <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm">
  <button
    onClick={() => alert(text)}
    className="underline text-blue-600 hover:text-blue-800"
  >
    📄 Ver texto completo del PDF
  </button>
  <button
    onClick={handleReset}
    className="underline text-red-600 hover:text-red-700"
  >
    🔄 Reiniciar todo
  </button>
</div>


            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded bg-gray-100 text-sm mb-4"
              value={text.slice(0, 1500)}
              readOnly
            />

            <div className="flex flex-col space-y-3">
              <input
                className="w-full p-3 border border-gray-300 rounded text-sm"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Haz una pregunta sobre el documento"
              />
              <button
                onClick={handleAsk}
                className="bg-green-600 text-white font-medium px-6 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
                disabled={loading || !question.trim()}
              >
                {loading ? "Pensando..." : "Preguntar"}
              </button>
            </div>

            {answer && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded shadow">
                <h2 className="font-semibold mb-2">💬 Última respuesta:</h2>
                <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
              </div>
            )}

            {history.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">🕘 Historial de preguntas:</h3>
                <ul className="space-y-3">
                  {history.map((entry, index) => (
                    <li key={index} className="border border-gray-200 rounded p-3 bg-gray-50">
                      <p className="font-medium text-gray-700">❓ {entry.question}</p>
                      <p className="text-sm text-gray-800 mt-1">💬 {entry.answer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
