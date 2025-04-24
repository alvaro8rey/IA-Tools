export default function CookiesPage() {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">🍪 Política de cookies</h1>
        <p className="mb-4">
          Este sitio utiliza cookies para asegurar una mejor experiencia al usuario:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Cookies esenciales: necesarias para el funcionamiento básico del sitio.</li>
          <li>Cookies de rendimiento: nos ayudan a entender cómo se usa el sitio.</li>
          <li>No se utilizan cookies de terceros con fines publicitarios.</li>
        </ul>
      </div>
    );
  }