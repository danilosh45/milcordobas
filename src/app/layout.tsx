import { Providers } from '@/components/providers';

export const metadata = {
  title: 'Mil Córdobas | Buenas Practicas',
  description: 'Banda de rock directo y sin filtros',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
