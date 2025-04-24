export default function PrivacyPage() {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">🔒 Política de privacidad</h1>
        <p className="mb-4">
          Nos tomamos tu privacidad en serio. Esta política explica cómo recopilamos, usamos y protegemos tus datos.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Recopilamos tu email, nombre y avatar para personalizar tu experiencia.</li>
          <li>No compartimos tu información con terceros.</li>
          <li>Usamos cookies para mejorar la navegación.</li>
          <li>Puedes eliminar tu cuenta en cualquier momento desde tu perfil.</li>
        </ul>
      </div>
    );
  }