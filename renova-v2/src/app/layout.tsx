import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Renova | Energía Solar para Morelia y Michoacán',
  description: 'Líderes en energía solar en Morelia, Michoacán. Ahorra 90% en tu factura de luz con paneles solares de primera calidad.',
  openGraph: {
    title: 'Renova | Energía Solar',
    description: 'Líderes en energía solar en Morelia y Michoacán. Ahorra 90% en tu factura de luz.',
    url: 'https://renova.mx/',
    siteName: 'Renova Energía Solar',
    type: 'website',
    locale: 'es_MX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Renova | Energía Solar',
    description: 'Líderes en energía solar en Morelia y Michoacán.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Oswald:wght@300;400;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}} />
      </head>
      <body>
        {/* Widget oculto — controlado solo desde el botón EN del Nav */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        {children}
        <script dangerouslySetInnerHTML={{ __html: `
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'es',
              includedLanguages: 'en,es',
              layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            }, 'google_translate_element');
          }
        `}} />
        <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async />
      </body>
    </html>
  );
}