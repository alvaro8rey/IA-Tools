import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const { text } = await request.json();

  if (!text) return NextResponse.json({ error: 'Falta el texto' }, { status: 400 });

  const prompt = `Analiza el siguiente texto, detecta todas las preguntas (tipo test o abiertas) y resuélvelas.

- Si son tipo test:
  - Muestra la pregunta y las opciones (A, B, C, D)
  - Muestra las 4 respuestas en una linea cada una
  - Marca la respuesta correcta envolviéndola con <strong> ... </strong>
  - Añade una explicación clara y breve del por qué es la opción correcta

- Si son preguntas abiertas:
  - Proporciona una respuesta razonada

Formato limpio y claro para mostrar en una web. No incluyas texto decorativo.

Texto:
${text}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = completion.choices[0].message.content || '';
    return NextResponse.json({ result: content });
  } catch (error) {
    console.error('❌ Error al resolver preguntas:', error);
    return NextResponse.json({ error: 'Error al procesar el texto.' }, { status: 500 });
  }
}
