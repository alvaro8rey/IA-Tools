import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function splitTextIntoChunks(text: string, maxLength: number): string[] {
  const paragraphs = text.split('\n\n');
  const chunks: string[] = [];
  let current = '';

  for (const p of paragraphs) {
    if ((current + p).length > maxLength) {
      chunks.push(current);
      current = p + '\n\n';
    } else {
      current += p + '\n\n';
    }
  }

  if (current.trim()) chunks.push(current);
  return chunks;
}

export async function POST(request: Request) {
  const { mode, text, complexity } = await request.json();

  if (!text || !mode) {
    return NextResponse.json({ error: 'Faltan datos.' }, { status: 400 });
  }

  const isTooLong = text.length > 12000; // ≈ unos 10-12K tokens
  const chunks = isTooLong ? splitTextIntoChunks(text, 6000) : [text];
  let wasTruncated = false;
  const limitedChunks = chunks.slice(0, 2); // usar solo los 2 primeros si hay muchos

  const promptBase =
    mode === 'to-schema'
      ? `A partir del siguiente texto largo, genera un esquema estructurado con títulos, subtítulos y viñetas. Sé claro y organizado.`
      : `Desarrolla los siguientes puntos como apuntes con un nivel de profundidad "${complexity}". Escribe de forma clara y educativa.`;

  try {
    const results: string[] = [];

    for (const chunk of limitedChunks) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `${promptBase}\n\n${chunk}` }],
      });

      results.push(completion.choices[0]?.message?.content || '');
    }

    if (chunks.length > 2) wasTruncated = true;

    return NextResponse.json({
      result: results.join('\n\n'),
      wasTruncated,
    });
  } catch (error) {
    console.error('❌ Error IA:', error);
    return NextResponse.json({ error: 'Error al generar contenido con IA.' }, { status: 500 });
  }
}
