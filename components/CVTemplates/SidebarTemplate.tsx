'use client';

export default function SidebarTemplate({ data }: { data: any }) {
  return (
    <div className="max-w-5xl mx-auto mt-12 grid grid-cols-3 shadow border bg-white text-sm">
      <div className="bg-blue-100 p-4 col-span-1 flex flex-col items-center">
        {data.profilePhoto && (
          <img
            src={data.profilePhoto}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        )}
        <h1 className="text-xl font-bold text-center mb-2">{data.personalInfo.name}</h1>
        <p className="text-center text-sm">{data.personalInfo.location}</p>
        <p className="text-center text-sm">{data.personalInfo.email}</p>
        <p className="text-center text-sm">{data.personalInfo.phone}</p>
        {data.personalInfo.linkedin && <p className="text-center text-sm">LinkedIn: {data.personalInfo.linkedin}</p>}
        {data.personalInfo.github && <p className="text-center text-sm">GitHub: {data.personalInfo.github}</p>}

        <div className="mt-6 w-full">
          <h2 className="font-semibold text-sm mb-1">Idiomas</h2>
          <ul className="list-disc list-inside text-xs">
            {data.languages.map((lang: string, i: number) => <li key={i}>{lang}</li>)}
          </ul>
        </div>

        <div className="mt-4 w-full">
          <h2 className="font-semibold text-sm mb-1">Habilidades</h2>
          <ul className="list-disc list-inside text-xs">
            {data.skills.map((skill: string, i: number) => <li key={i}>{skill}</li>)}
          </ul>
        </div>
      </div>

      <div className="col-span-2 p-6">
        {data.personalInfo.summary && (
          <>
            <h2 className="text-lg font-semibold mb-1">Perfil</h2>
            <p className="mb-4">{data.personalInfo.summary}</p>
          </>
        )}

        <h2 className="text-lg font-semibold mb-1">Educación</h2>
        {data.education.map((edu: any, i: number) => (
          <div key={i} className="mb-2">
            <p className="font-semibold">{edu.title} - {edu.institution}</p>
            <p className="text-gray-600">{edu.year}</p>
          </div>
        ))}

        <h2 className="text-lg font-semibold mt-4 mb-1">Experiencia</h2>
        {data.experience.map((exp: any, i: number) => (
          <div key={i} className="mb-2">
            <p className="font-semibold">{exp.job} - {exp.company}</p>
            <p className="text-gray-600">{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
