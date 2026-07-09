import Link from "next/link";
import { brand, navItems } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-serif text-2xl">{brand.name}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
            Psicoterapia online para adultos, familias, crianza, talleres y procesos grupales.
          </p>
          <p className="mt-5 max-w-xl text-xs leading-5 text-white/65">
            Este sitio no reemplaza atencion de emergencia. Si existe riesgo inminente o una crisis, busca ayuda inmediata a traves de ECU 911 o la linea 171 del MSP.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Explorar</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li><Link href="/privacidad" className="hover:text-white">Privacidad</Link></li>
            <li><Link href="/terminos" className="hover:text-white">Terminos</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
