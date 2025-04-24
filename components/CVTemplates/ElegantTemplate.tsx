'use client';

export default function ElegantTemplate({ data }: { data: any }) {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow mt-12 text-sm">
      <div className="bg-gray-800 text-white p-6 flex items-center gap-6 rounded-t-md">
        {data.profilePhoto && (
          <img
            src={data.profilePhoto}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full object-cover border-2 border-white"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{data.personalInfo.name}</h1>
          <p>{data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}</p>
          {data.personalInfo.linkedin && <p>LinkedIn: {data.personalInfo.linkedin}</p>}
          {data.personalInfo.github && <p>GitHub: {data.personalInfo.github}</p>}
        </div>
      </div>

      <div className="p-6">
        {data.personalInfo.summary && (
          <>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Perfil</h2>
            <p className="mb-4">{data.personalInfo.summary}</p>
          </>
        )}

        <h2 className="text-lg font-semibold text-gray-700 mb-1">Educación</h2>
        {data.education.map((edu: any, i: number) => (
          <div key={i} className="mb-2">
            <p className="font-semibold">{edu.title} - {edu.institution}</p>
            <p className="text-gray-500">{edu.year}</p>
          </div>
        ))}

        <h2 className="text-lg font-semibold text-gray-700 mt-4 mb-1">Experiencia</h2>
        {data.experience.map((exp: any, i: number) => (
          <div key={i} className="mb-2">
            <p className="font-semibold">{exp.job} - {exp.company}</p>
            <p className="text-gray-500">{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}

        <h2 className="text-lg font-semibold text-gray-700 mt-4 mb-1">Idiomas</h2>
        <ul className="list-disc list-inside mb-2">
          {data.languages.map((lang: string, i: number) => <li key={i}>{lang}</li>)}
        </ul>

        <h2 className="text-lg font-semibold text-gray-700 mt-4 mb-1">Habilidades</h2>
        <ul className="list-disc list-inside">
          {data.skills.map((skill: string, i: number) => <li key={i}>{skill}</li>)}
        </ul>
      </div>
    </div>
  );
}
