import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Configuración de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Manejar la solicitud POST
export async function POST(request: Request) {
  const { text, question } = await request.json(); // Obtener datos de la solicitud

  if (!text || !question) {
    return NextResponse.json({ error: 'Faltan texto o pregunta' }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres un asistente útil que responde preguntas sobre el contenido de un documento.",
        },
        {
          role: "user",
          content: `Texto del documento:\n${text.slice(0, 3000)}\n\nPregunta: ${question}`,
        },
      ],
    });

    const answer = completion.choices?.[0]?.message?.content;
    if (!answer) {
      console.warn("❗ No se recibió respuesta válida de OpenAI");
      return NextResponse.json({ error: 'Respuesta vacía de OpenAI' }, { status: 500 });
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("❌ Error al contactar con OpenAI:", error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
