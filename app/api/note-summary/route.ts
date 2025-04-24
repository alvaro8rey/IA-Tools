import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { text } = await request.json();

  if (!text || typeof text !== 'string') {
    return NextResponse.json({ error: 'Falta el texto a resumir' }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Eres un asistente que resume textos de apuntes de forma clara y estructurada.',
        },
        {
          role: 'user',
          content: `Resume el siguiente texto:\n\n${text.slice(0, 3000)}`,
        },
      ],
    });

    const summary = completion.choices[0].message.content;
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('❌ Error al contactar con OpenAI:', error);
    return NextResponse.json({ error: 'Error al contactar con el servidor' }, { status: 500 });
  }
}
