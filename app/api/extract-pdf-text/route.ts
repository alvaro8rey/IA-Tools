import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
const pdfParse = require('pdf-parse');

export const config = {
  api: {
    bodyParser: false, // Desactivar el bodyParser para usar formidable
  },
};

export async function POST(request: Request) {
  // Usar formidable para parsear los datos del formulario
  const form = formidable({ multiples: false });

  return new Promise((resolve, reject) => {
    form.parse(request as any, async (err, fields, files) => { // Hacemos un "cast" a `any` para evitar el error
      if (err || !files.file) {
        console.error("❌ Error al parsear archivo", err);
        return resolve(NextResponse.json({ error: 'No se pudo leer el archivo' }, { status: 400 }));
      }

      try {
        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        const buffer = fs.readFileSync(file.filepath);
        const data = await pdfParse(buffer);
        return resolve(NextResponse.json({ text: data.text }));
      } catch (error) {
        console.error('❌ Error al procesar PDF:', error);
        return resolve(NextResponse.json({ error: 'Error interno' }, { status: 500 }));
      }
    });
  });
}
