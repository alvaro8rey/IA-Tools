import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { category, description } = await request.json();

  if (!category || !description) {
    return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
  }

  const prompt = `Estoy creando un generador de ideas. Por favor, dame 10 ideas creativas y originales para la categoría "${category}", teniendo en cuenta esta descripción o contexto: "${description}". 
Devuelve solo las ideas, una por línea, sin numeración.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const rawIdeas = completion.choices[0].message.content || '';
    const ideas = rawIdeas
      .split('\n')
      .map(i => i.replace(/^\d+\.\s*/, '').trim())
      .filter(i => i.length > 0);

    return NextResponse.json({ ideas });
  } catch (error) {
    console.error('❌ Error al generar ideas:', error);
    return NextResponse.json({ error: 'Error interno al generar ideas' }, { status: 500 });
  }
}
