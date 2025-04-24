import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t text-gray-700 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 sm:grid-cols-2 gap-8 text-sm">
        {/* Marca */}
        <div>
          <h3 className="text-lg font-bold text-blue-600 mb-2">IATools</h3>
          <p className="text-gray-600">
            Herramientas con inteligencia artificial para mejorar tu productividad, creatividad y aprendizaje.
          </p>
        </div>

        {/* Enlaces útiles */}
        <div>
          <h4 className="font-semibold mb-2">Enlaces útiles</h4>
          <ul className="space-y-1">
            <li><Link href="/" className="hover:underline">Inicio</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-1">
            <li><Link href="/terms" className="hover:underline">Términos y condiciones</Link></li>
            <li><Link href="/privacy" className="hover:underline">Política de privacidad</Link></li>
            <li><Link href="/cookies" className="hover:underline">Cookies</Link></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="font-semibold mb-2">Contacto</h4>
          <ul className="space-y-1">
            <li><a href="mailto:soporte@iatools.com" className="hover:underline">soporte@iatools.com</a></li>
            <li><a href="/contact" className="hover:underline">Formulario de contacto</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} IATools. Todos los derechos reservados.
      </div>
    </footer>
  );
}
