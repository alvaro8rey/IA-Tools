'use client';

export default function ModernTemplate({ data }: { data: any }) {
  return (
    <div className="bg-gray-50 mt-12 text-sm leading-relaxed max-w-4xl mx-auto border shadow-md">
      <div className="grid grid-cols-3 gap-6 p-6">
        {/* Columna izquierda */}
        <div className="col-span-1 bg-blue-100 p-4 rounded text-blue-900">
        {data.profilePhoto && (
          <img
            src={data.profilePhoto}
            alt="Foto de perfil"
            className="w-28 h-28 rounded-full object-cover mb-4 border"
          />
        )}

          <h1 className="text-xl font-bold mb-2">{data.personalInfo.name}</h1>
          <p className="text-sm">{data.personalInfo.location}</p>
          <p className="text-sm">{data.personalInfo.email}</p>
          <p className="text-sm">{data.personalInfo.phone}</p>
          {data.personalInfo.linkedin && <p className="text-sm">LinkedIn: {data.personalInfo.linkedin}</p>}
          {data.personalInfo.github && <p className="text-sm">GitHub: {data.personalInfo.github}</p>}

          <div className="mt-4">
            <h2 className="font-semibold text-md mb-1">Idiomas</h2>
            <ul className="list-disc list-inside text-sm">
              {data.languages.map((lang: string, i: number) => (
                <li key={i}>{lang}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h2 className="font-semibold text-md mb-1">Habilidades</h2>
            <ul className="list-disc list-inside text-sm">
              {data.skills.map((skill: string, i: number) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="col-span-2 p-4">
          {data.personalInfo.summary && (
            <>
              <h2 className="text-lg font-semibold">Perfil</h2>
              <p className="mb-4">{data.personalInfo.summary}</p>
            </>
          )}

          <h2 className="text-lg font-semibold">Educación</h2>
          {data.education.map((edu: any, i: number) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">{edu.title} - {edu.institution}</p>
              <p className="text-gray-600">{edu.year}</p>
            </div>
          ))}

          <h2 className="text-lg font-semibold mt-4">Experiencia</h2>
          {data.experience.map((exp: any, i: number) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">{exp.job} - {exp.company}</p>
              <p className="text-gray-600">{exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
