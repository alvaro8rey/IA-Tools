export default function TermsPage() {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">📜 Términos y condiciones</h1>
        <p className="mb-4">Bienvenido a nuestra plataforma. Al usar nuestros servicios, aceptas los siguientes términos:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Solo puedes usar la plataforma para fines legales.</li>
          <li>No está permitido distribuir contenido ilegal o con derechos de autor sin permiso.</li>
          <li>Nos reservamos el derecho a suspender cuentas por usos indebidos.</li>
          <li>Los servicios ofrecidos pueden cambiar en cualquier momento sin previo aviso.</li>
        </ul>
      </div>
    );
  }