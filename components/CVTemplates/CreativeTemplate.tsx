'use client';

export default function CreativeTemplate({ data }: { data: any }) {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto border rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div className="flex flex-col items-center">
          {data.profilePhoto && (
            <img
              src={data.profilePhoto}
              alt="Foto de perfil"
              className="w-36 h-36 rounded-full object-cover mb-4"
            />
          )}
          <h1 className="text-3xl font-semibold">{data.personalInfo.name}</h1>
          <p className="text-sm text-gray-600">{data.personalInfo.location}</p>
          <p className="text-sm text-gray-600">{data.personalInfo.email}</p>
        </div>
        <div className="flex flex-col items-start">
          {data.personalInfo.linkedin && <p className="text-sm text-blue-600">LinkedIn: {data.personalInfo.linkedin}</p>}
          {data.personalInfo.github && <p className="text-sm text-gray-600">GitHub: {data.personalInfo.github}</p>}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Perfil</h2>
        <p className="text-sm">{data.personalInfo.summary}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Educación</h2>
        {data.education.map((edu: any, i: number) => (
          <div key={i} className="mb-3">
            <p className="font-semibold">{edu.title} - {edu.institution}</p>
            <p className="text-sm text-gray-600">{edu.year}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Experiencia</h2>
        {data.experience.map((exp: any, i: number) => (
          <div key={i} className="mb-3">
            <p className="font-semibold">{exp.job} - {exp.company}</p>
            <p className="text-sm text-gray-600">{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Habilidades</h2>
        <ul className="list-disc pl-6 text-sm">
          {data.skills.map((skill: string, i: number) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Idiomas</h2>
        <ul className="list-disc pl-6 text-sm">
          {data.languages.map((lang: string, i: number) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
