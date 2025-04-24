import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { type, description } = await request.json();

  if (!type || typeof type !== 'string') {
    return NextResponse.json({ error: 'Falta el tipo de nombre' }, { status: 400 });
  }

  const prompt = `Genera una lista de 10 nombres creativos y únicos para un ${type}` +
    (description ? `, relacionados con: ${description}` : '') +
    `. Devuelve solo la lista sin numeración, uno por línea.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: prompt },
      ],
    });

    const responseText = completion.choices[0].message.content || '';
    const names = responseText
      .split('\n')
      .map(n => n.replace(/^\d+\.\s*/, '').trim())
      .filter(n => n.length > 0);

    return NextResponse.json({ names });
  } catch (error) {
    console.error('❌ Error con OpenAI:', error);
    return NextResponse.json({ error: 'Error al generar nombres' }, { status: 500 });
  }
}
