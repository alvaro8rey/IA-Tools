'use client';

import { useState, useRef } from 'react';
import BackHome from '@/components/CVTemplates/BackHome';
import CVPreview from '@/components/CVTemplates/CVPreview';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function CvGeneratorPage() {
  const [template, setTemplate] = useState('classic');

  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    linkedin: '',
    github: '',
  });

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [education, setEducation] = useState([{ title: '', institution: '', year: '' }]);
  const [experience, setExperience] = useState([{ job: '', company: '', duration: '', description: '' }]);
  const [skills, setSkills] = useState(['']);
  const [languages, setLanguages] = useState(['']);
  const cvRef = useRef<HTMLDivElement>(null);

  const exportToPDF = async () => {
    if (!cvRef.current) return;
    const canvas = await html2canvas(cvRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('mi_cv.pdf');
  };

  const handleChange = (field: string, value: string) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handleAddEntry = (stateSetter: any, template: any) => {
    stateSetter((prev: any[]) => [...prev, { ...template }]);
  };

  const handleRemoveEntry = (index: number, stateSetter: any) => {
    stateSetter((prev: any[]) => prev.filter((_, i) => i !== index));
  };

  const handleDynamicChange = (index: number, field: string, value: string, stateSetter: any) => {
    stateSetter((prev: any[]) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleListChange = (index: number, value: string, setter: any) => {
    setter((prev: string[]) => prev.map((item, i) => (i === index ? value : item)));
  };

  const handleAddToList = (setter: any) => {
    setter((prev: string[]) => [...prev, '']);
  };

  const handleRemoveFromList = (index: number, setter: any) => {
    setter((prev: string[]) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <div className="w-full md:w-1/2 overflow-y-auto p-6 border-r">
        <BackHome />
        <h1 className="text-3xl font-bold mb-4 text-center">🧾 Generador de CV</h1>
        <p className="text-center text-gray-600 mb-6">
        Crea tu currículum de forma visual, rápida y totalmente personalizable. Elige entre varias plantillas, añade tus datos, sube tu foto de perfil y genera una vista previa en tiempo real. Exporta tu CV en PDF con diseño aplicado, listo para enviar.
        </p>

        <div className="mb-6">
          <label className="font-semibold block mb-1">Plantilla</label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="classic">Clásico</option>
            <option value="modern">Moderno</option>
            <option value="elegant">Elegante</option>
            <option value="sidebar">Con barra lateral</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="font-semibold block mb-1">Foto de perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onloadend = () => {
                setProfilePhoto(reader.result as string);
              };
              reader.readAsDataURL(file);
            }}
            className="w-full"
          />
        </div>

        <h2 className="text-xl font-semibold mb-2">Información personal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[
            ['Nombre completo', 'name'],
            ['Correo electrónico', 'email'],
            ['Teléfono', 'phone'],
            ['Ubicación', 'location'],
            ['LinkedIn', 'linkedin'],
            ['GitHub (opcional)', 'github'],
          ].map(([labelText, field]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{labelText}</label>
              <input
                className="border p-2 rounded w-full"
                value={personalInfo[field as keyof typeof personalInfo]}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Resumen / perfil profesional</label>
          <textarea
            className="border p-2 rounded w-full"
            value={personalInfo.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
          />
        </div>

        {/* Educación */}
        <h2 className="text-xl font-semibold mt-8 mb-2">Educación</h2>
        {education.map((item, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm">Título</label>
              <input className="border p-2 rounded w-full" value={item.title} onChange={(e) => handleDynamicChange(i, 'title', e.target.value, setEducation)} />
            </div>
            <div>
              <label className="text-sm">Institución</label>
              <input className="border p-2 rounded w-full" value={item.institution} onChange={(e) => handleDynamicChange(i, 'institution', e.target.value, setEducation)} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm">Año</label>
              <input className="border p-2 rounded w-full" value={item.year} onChange={(e) => handleDynamicChange(i, 'year', e.target.value, setEducation)} />
            </div>
            {education.length > 1 && (
              <button onClick={() => handleRemoveEntry(i, setEducation)} className="text-red-600 text-sm mt-1">Eliminar</button>
            )}
          </div>
        ))}
        <button
          onClick={() => handleAddEntry(setEducation, { title: '', institution: '', year: '' })}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!Object.values(education[education.length - 1]).some(v => v.trim())}
        >
          + Añadir formación
        </button>

        {/* Experiencia */}
        <h2 className="text-xl font-semibold mt-8 mb-2">Experiencia</h2>
        {experience.map((item, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm">Puesto</label>
              <input className="border p-2 rounded w-full" value={item.job} onChange={(e) => handleDynamicChange(i, 'job', e.target.value, setExperience)} />
            </div>
            <div>
              <label className="text-sm">Empresa</label>
              <input className="border p-2 rounded w-full" value={item.company} onChange={(e) => handleDynamicChange(i, 'company', e.target.value, setExperience)} />
            </div>
            <div>
              <label className="text-sm">Duración</label>
              <input className="border p-2 rounded w-full" value={item.duration} onChange={(e) => handleDynamicChange(i, 'duration', e.target.value, setExperience)} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm">Descripción</label>
              <textarea className="border p-2 rounded w-full" value={item.description} onChange={(e) => handleDynamicChange(i, 'description', e.target.value, setExperience)} />
            </div>
            {experience.length > 1 && (
              <button onClick={() => handleRemoveEntry(i, setExperience)} className="text-red-600 text-sm mt-1">Eliminar</button>
            )}
          </div>
        ))}
        <button
          onClick={() => handleAddEntry(setExperience, { job: '', company: '', duration: '', description: '' })}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!Object.values(experience[experience.length - 1]).some(v => v.trim())}
        >
          + Añadir experiencia
        </button>

        {/* Idiomas */}
        <h2 className="text-xl font-semibold mt-8 mb-2">Idiomas</h2>
        {languages.map((lang, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input className="border p-2 rounded flex-1" placeholder="Idioma y nivel" value={lang} onChange={(e) => handleListChange(i, e.target.value, setLanguages)} />
            {languages.length > 1 && <button onClick={() => handleRemoveFromList(i, setLanguages)} className="text-red-600">✕</button>}
          </div>
        ))}
        <button
          onClick={() => handleAddToList(setLanguages)}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!languages[languages.length - 1].trim()}
        >
          + Añadir idioma
        </button>

        {/* Habilidades */}
        <h2 className="text-xl font-semibold mt-8 mb-2">Habilidades</h2>
        {skills.map((skill, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input className="border p-2 rounded flex-1" placeholder="Habilidad" value={skill} onChange={(e) => handleListChange(i, e.target.value, setSkills)} />
            {skills.length > 1 && <button onClick={() => handleRemoveFromList(i, setSkills)} className="text-red-600">✕</button>}
          </div>
        ))}
        <button
          onClick={() => handleAddToList(setSkills)}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!skills[skills.length - 1].trim()}
        >
          + Añadir habilidad
        </button>
      </div>

      <div className="w-full md:w-1/2 relative bg-gray-50">
        <div className="overflow-y-auto p-4 pb-24 h-full" ref={cvRef}>
          <CVPreview
            template={template}
            data={{
              personalInfo,
              education,
              experience,
              skills,
              languages,
              profilePhoto,
            }}
          />
        </div>

        {/* Botón fijo al fondo */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t">
          <button
            onClick={exportToPDF}
            className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
          >
            Exportar a PDF
          </button>
        </div>
      </div>
    </div>
  );
}
