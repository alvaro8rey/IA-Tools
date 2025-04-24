import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length < 20) {
      return NextResponse.json({ feedback: 'Por favor, proporciona un CV válido.' }, { status: 400 });
    }

    const prompt = `
Actúa como un experto en recursos humanos. Analiza el siguiente currículum vitae y proporciona:
1. Una puntuación general del 1 al 10 sobre su calidad profesional.
2. Un resumen de lo que transmite el CV en una o dos frases.
3. Recomendaciones detalladas para mejorarlo, incluyendo redacción, estructura, impacto y palabras clave.

Responde en formato JSON con esta estructura:
{
  "score": número,
  "summary": "resumen del CV",
  "feedback": "texto con recomendaciones"
}

Currículum:
${text}
`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;

    const result = JSON.parse(content || '{}');

    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ Error en cv-review:', error);
    return NextResponse.json({ feedback: 'Error al generar la revisión.' }, { status: 500 });
  }
}
