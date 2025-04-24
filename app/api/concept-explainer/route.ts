import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const { input, level } = await request.json();

  if (!input || !level) return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });

  const prompt = `Explica el siguiente concepto de forma que lo entienda un ${level}:\n\n"${input}"`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const explanation = completion.choices[0].message.content || '';
    return NextResponse.json({ explanation });
  } catch (error) {
    console.error('❌ Error al explicar concepto:', error);
    return NextResponse.json({ error: 'Error al generar explicación' }, { status: 500 });
  }
}
