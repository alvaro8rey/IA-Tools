'use client';

export default function TechTemplate({ data }: { data: any }) {
  return (
    <div className="bg-gray-900 text-white p-8 max-w-4xl mx-auto border rounded-lg shadow-xl">
      <div className="flex justify-between mb-6">
        {/* Foto de Perfil */}
        {data.profilePhoto && (
          <img
            src={data.profilePhoto}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400"
          />
        )}

        {/* Información de contacto */}
        <div className="text-sm text-gray-400">
          <h1 className="text-3xl font-bold">{data.personalInfo.name}</h1>
          <p>{data.personalInfo.location}</p>
          <p>{data.personalInfo.email}</p>
          <p>{data.personalInfo.phone}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-yellow-400">Resumen Profesional</h2>
        <p>{data.personalInfo.summary}</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-yellow-400">Habilidades Técnicas</h2>
          <ul className="list-disc pl-6">
            {data.skills.map((skill: string, i: number) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-yellow-400">Idiomas</h2>
          <ul className="list-disc pl-6">
            {data.languages.map((lang: string, i: number) => (
              <li key={i}>{lang}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-yellow-400">Educación</h2>
          {data.education.map((edu: any, i: number) => (
            <div key={i}>
              <p className="font-semibold">{edu.title} - {edu.institution}</p>
              <p>{edu.year}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-yellow-400">Experiencia</h2>
          {data.experience.map((exp: any, i: number) => (
            <div key={i}>
              <p className="font-semibold">{exp.job} - {exp.company}</p>
              <p>{exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
