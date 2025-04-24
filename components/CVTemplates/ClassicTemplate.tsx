'use client';

export default function ClassicTemplate({ data }: { data: any }) {
  return (
    <div className="bg-white border p-6 shadow-md mt-12 text-sm leading-relaxed max-w-3xl mx-auto">
      {data.profilePhoto && (
        <img
          src={data.profilePhoto}
          alt="Foto de perfil"
          className="w-28 h-28 rounded-full object-cover mb-4 border"
        />
      )}
      <h1 className="text-2xl font-bold mb-1">{data.personalInfo.name}</h1>
      <p className="text-gray-600">{data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}</p>
      {data.personalInfo.linkedin && <p className="text-gray-600">LinkedIn: {data.personalInfo.linkedin}</p>}
      {data.personalInfo.github && <p className="text-gray-600">GitHub: {data.personalInfo.github}</p>}

      <hr className="my-4" />

      {data.personalInfo.summary && (
        <>
          <h2 className="font-semibold text-lg">Perfil profesional</h2>
          <p className="mb-4">{data.personalInfo.summary}</p>
        </>
      )}

      <h2 className="font-semibold text-lg mt-4">Educación</h2>
      {data.education.map((edu: any, i: number) => (
        <div key={i} className="mb-2">
          <p className="font-semibold">{edu.title} - {edu.institution}</p>
          <p className="text-gray-600">{edu.year}</p>
        </div>
      ))}

      <h2 className="font-semibold text-lg mt-4">Experiencia</h2>
      {data.experience.map((exp: any, i: number) => (
        <div key={i} className="mb-2">
          <p className="font-semibold">{exp.job} - {exp.company}</p>
          <p className="text-gray-600">{exp.duration}</p>
          <p>{exp.description}</p>
        </div>
      ))}

      <h2 className="font-semibold text-lg mt-4">Idiomas</h2>
      <ul className="list-disc list-inside mb-2">
        {data.languages.map((lang: string, i: number) => (
          <li key={i}>{lang}</li>
        ))}
      </ul>

      <h2 className="font-semibold text-lg mt-4">Habilidades</h2>
      <ul className="list-disc list-inside">
        {data.skills.map((skill: string, i: number) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
