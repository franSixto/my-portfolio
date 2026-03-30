import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Países hispanohablantes (códigos ISO 3166-1 alpha-2)
const SPANISH_COUNTRIES = new Set([
  'ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU',
  'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR', 'GQ',
]);

export async function GET() {
  const headersList = await headers();

  // 1. Vercel / Cloudflare inyectan el país desde la IP automáticamente
  const country =
    headersList.get('x-vercel-ip-country') ??
    headersList.get('cf-ipcountry') ??
    '';

  if (country && SPANISH_COUNTRIES.has(country.toUpperCase())) {
    return NextResponse.json({ locale: 'es' });
  }

  if (country) {
    // País conocido pero no hispanohablante → inglés
    return NextResponse.json({ locale: 'en' });
  }

  // 2. Fallback: Accept-Language del navegador
  const acceptLang = headersList.get('accept-language') ?? '';
  const prefersSpanish = acceptLang
    .split(',')
    .some((part) => part.trim().toLowerCase().startsWith('es'));

  return NextResponse.json({ locale: prefersSpanish ? 'es' : 'en' });
}
