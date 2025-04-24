import { NextResponse } from 'next/server';
import { IncomingForm, Files } from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Función auxiliar para usar formidable con async/await
const parseForm = (request: Request) =>
  new Promise<{ files: Files }>((resolve, reject) => {
    const form = new IncomingForm({ keepExtensions: true });
    form.parse(request as any, (err, fields, files) => { // "cast" a `any` para que funcione con `formidable`
      if (err) reject(err);
      else resolve({ files });
    });
  });

export async function POST(request: Request) {
  try {
    const { files } = await parseForm(request);

    const file = files.file?.[0];
    if (!file || !file.filepath || !file.originalFilename) {
      return NextResponse.json({ error: 'Archivo inválido.' }, { status: 400 });
    }

    const filePath = file.filepath;
    const fileType = file.originalFilename.split('.').pop()?.toLowerCase();

    let text = '';

    if (fileType === 'pdf') {
      const buffer = fs.readFileSync(filePath);
      const data = await pdfParse(buffer);
      text = data.text;
    } else if (fileType === 'docx') {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else if (fileType === 'txt') {
      text = fs.readFileSync(filePath, 'utf8');
    } else {
      return NextResponse.json({ error: 'Formato no soportado. Usa PDF, DOCX o TXT.' }, { status: 400 });
    }

    return NextResponse.json({ text });
  } catch (err) {
    console.error('❌ Error procesando el archivo:', err);
    return NextResponse.json({ error: 'Error al procesar el archivo.' }, { status: 500 });
  }
}
