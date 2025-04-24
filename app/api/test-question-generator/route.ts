import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: Request) {
  console.log('🧪 POST /api/test-question-generator');

  const { text, quantity } = await request.json();

  const prompt = `Genera ${quantity} preguntas tipo test (con 4 opciones cada una, mostrando cada opción en una liena, marcando la correcta con **negrita**) sobre este contenido:\n\n${text}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const response = completion.choices[0].message.content;
    const questions = response?.split('\n\n').filter(Boolean) ?? [];

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('❌ Error inesperado al generar preguntas:', error);
    return NextResponse.json({ error: 'Error generando preguntas' }, { status: 500 });
  }
}
