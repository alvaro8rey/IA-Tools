import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const { text, mode, tone, language, purpose, correct, explain, alternatives } = await request.json();

  const instructions = [
    `Reescribe el texto de forma ${mode}`,
    `Usa un tono ${tone}`,
    `En idioma ${language}`,
    purpose !== 'general' ? `Adaptado para: ${purpose}` : '',
    correct ? 'Corrige errores gramaticales antes de reescribir.' : '',
    explain ? 'Explica brevemente qué cambios hiciste después de reescribir.' : '',
  ]
    .filter(Boolean)
    .join(', ');

  const basePrompt = `${instructions}\n\nTexto:\n"""${text}"""`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: basePrompt }],
    });

    const baseResult = completion.choices[0].message.content || '';

    if (!alternatives) {
      const result = explain ? baseResult.split('Explicación:')[0].trim() : baseResult;
      const explanation = explain ? baseResult.split('Explicación:')[1]?.trim() : null;
      return NextResponse.json({ result, explanation });
    }

    const altPrompt = `${instructions}\n\nTexto:\n"""${text}"""\n\nDame tres versiones distintas. Devuelve cada una separada por ###.`;

    const altCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: altPrompt }],
    });

    const alternativesRaw = altCompletion.choices[0].message.content || '';
    const versions = alternativesRaw.split('###').map(v => v.trim()).filter(Boolean);
    return NextResponse.json({ result: versions[0], alternatives: versions });
  } catch (error) {
    console.error('❌ Error al reescribir texto:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
