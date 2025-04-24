'use client';

import Link from 'next/link';

const sections = [
  {
    title: '🎓 Herramientas para estudiantes',
    tools: [
      {
        name: 'Resumen de apuntes',
        description:
          'Sube un texto y obtén un resumen claro y estructurado, ideal para repasar rápidamente.',
        link: '/tools/note-summary',
        bg: 'bg-blue-100',
      },
      {
        name: 'Chat con documentos PDF',
        description:
          'Sube un PDF y hazle preguntas como si hablaras con un experto. Ideal para estudiar textos largos.',
        link: '/tools/chat-with-pdf',
        bg: 'bg-indigo-100',
      },
      {
        name: 'Explicador de conceptos',
        description:
          'Pega un texto complejo y la IA lo explica con palabras sencillas. Puedes elegir si la explicación es para un niño, un adolescente o un universitario.',
        link: '/tools/concept-explainer',
        bg: 'bg-sky-100',
      },
      {
        name: 'Generador de preguntas tipo test',
        description:
          'Pega texto o sube un archivo PDF, Word o TXT y la IA generará preguntas de opción múltiple para repasar o autoevaluarte.',
        link: '/tools/test-question-generator',
        bg: 'bg-orange-100',
      },
      {
        name: 'Asistente de respuestas inteligente',
        description:
          'Pega un texto que contenga preguntas (tipo test o abiertas) y la IA extraerá las preguntas y responderá cada una de forma razonada.',
        link: '/tools/question-solver',
        bg: 'bg-pink-100',
      },
      {
        name: 'Esquemas y apuntes inteligentes',
        description:
          'Convierte apuntes largos en esquemas estructurados o desarrolla apuntes a partir de un esquema con distintos niveles de profundidad.',
        link: '/tools/structured-notes',
        bg: 'bg-violet-100',
      },      
    ],
  },
  {
    title: '💼 Herramientas profesionales',
    tools: [
      {
        name: 'Generador de CV',
        description:
          'Crea y personaliza tu currículum eligiendo entre varias plantillas. Guarda y exporta a PDF.',
        link: '/tools/cv-generator',
        bg: 'bg-green-100',
      },
      {
        name: 'Revisión inteligente de CV',
        description:
          'Analiza tu currículum y obtén sugerencias para mejorar su contenido, estructura, impacto y uso de palabras clave.',
        link: '/tools/cv-review',
        bg: 'bg-yellow-100',
      },    
    ],
  },
  {
    title: '🧑‍💼 Herramientas para mejorar textos',
    tools: [
      {
        name: 'Reescritor de texto',
        description:
          'Transforma cualquier texto en uno más claro, formal, breve o mejor redactado con ayuda de la IA.',
        link: '/tools/text-rewriter',
        bg: 'bg-purple-100',
      },
    ],
  },
  {
    title: '💡 Creatividad y contenido',
    tools: [
      {
        name: 'Generador de ideas',
        description:
          'Crea ideas originales para negocios, contenido, YouTube, apps y más según un tema o categoría.',
        link: '/tools/idea-generator',
        bg: 'bg-yellow-100',
      },
      {
        name: 'Generador de nombres',
        description:
          'Obtén nombres creativos para marcas, proyectos, mascotas, personajes y más según una temática.',
        link: '/tools/name-generator',
        bg: 'bg-pink-100',
      },
    ],
  },
  {
    title: '🛠️ Herramientas para programadores',
    tools: [
      {
        name: 'Detector de errores en código',
        description:
          'Analiza y encuentra errores en fragmentos de código automáticamente.',
        link: '/tools/code-debugger',
        bg: 'bg-red-100',
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">🧰 Herramientas con IA</h1>
      <p className="text-center text-gray-600 mb-12">
        Explora una colección de herramientas que usan inteligencia artificial para ayudarte a trabajar, estudiar o crear.
      </p>
      <div className="space-y-12">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.tools.map((tool, i) => (
                <Link
                  key={i}
                  href={tool.link}
                  className={`block rounded-xl p-5 shadow-sm border hover:shadow-md transition ${tool.bg}`}
                >
                  <h3 className="text-lg font-bold mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-700">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
