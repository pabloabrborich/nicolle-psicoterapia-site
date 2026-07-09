# Psic. Nicolle De la Torre, Mgs. - Therapy Conversion Asset

Sitio moderno en Next.js 15, TypeScript, Tailwind CSS y App Router para psicoterapia online en Ecuador. Esta pensado como un asset de conversion: agenda, WhatsApp, router de leads, talleres, recursos, privacidad y placeholders de integraciones.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Variables de entorno

Copia `.env.example` a `.env.local` y configura los proveedores reales:

```bash
NEXT_PUBLIC_SITE_URL=https://tudominio.com
NEXT_PUBLIC_WHATSAPP_NUMBER=593992717772
NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE=Hola Psic. Nicolle, quisiera conocer si este espacio puede ser un buen fit para mi.
NEXT_PUBLIC_BOOKING_PROVIDER=acuity
NEXT_PUBLIC_ACUITY_EMBED_URL=
NEXT_PUBLIC_CALENDLY_URL=
NEXT_PUBLIC_HUBSPOT_MEETINGS_URL=
NEXT_PUBLIC_EXTERNAL_BOOKING_URL=
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=
NEXT_PUBLIC_HUBSPOT_FORM_ID=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_ENABLE_CONSENT_MODE=true
NEXT_PUBLIC_PAYMENTS_PROVIDER=payphone
NEXT_PUBLIC_PAYPHONE_LINK=
NEXT_PUBLIC_KUSHKI_LINK=
NEXT_PUBLIC_DATAFAST_LINK=
NEXT_PUBLIC_BLOG_ENABLED=true
BOOKING_ADMIN_TOKEN=cambiar-esta-clave
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_BOOKINGS_TABLE=therapy_bookings
```

La pagina `/agenda` usa el calendario propio del website. Las variables `NEXT_PUBLIC_BOOKING_PROVIDER` quedan disponibles como fallback futuro si se decide volver a un proveedor externo.

`NEXT_PUBLIC_PAYMENTS_PROVIDER` acepta `payphone`, `kushki`, `datafast` o `external`. Si no hay enlace de pago, las cards muestran consulta por WhatsApp.

## Formularios y CRM

El mini router usa una server action (`src/lib/actions.ts`). Para enviar leads a un webhook privado agrega:

```bash
LEAD_WEBHOOK_URL=https://tu-webhook-seguro.com/leads
```

El formulario no solicita diagnosticos, sintomas detallados ni texto libre sensible. Solo envia datos de contacto y preferencias generales.

## Agenda propia

Rutas incluidas:

- `/agenda`: calendario publico para solicitar reservas.
- `/admin/agenda`: panel privado para que Nicolle vea reservas y cambie estados.
- `/admin/disponibilidad`: placeholder del futuro editor de horarios.

En desarrollo, si no configuras Supabase, las reservas se guardan en memoria del servidor local. Esto sirve para probar el flujo, pero se pierde al reiniciar el servidor y no es suficiente para produccion.

Para produccion free/funcional, crea un proyecto Supabase y una tabla `therapy_bookings`. SQL sugerido:

```sql
create table therapy_bookings (
  id text primary key,
  service text not null,
  "startsAt" timestamptz not null,
  "endsAt" timestamptz not null,
  name text not null,
  email text not null,
  whatsapp text not null,
  "consultationReason" text not null default '',
  status text not null default 'pending',
  "createdAt" timestamptz not null
);

create unique index if not exists unique_active_booking_slot
on therapy_bookings ("startsAt")
where status in ('pending', 'confirmed');
```

Si ya habias creado la tabla con `"startsAt" timestamptz not null unique`, ejecuta esta migracion una sola vez:

```sql
alter table therapy_bookings
drop constraint if exists "therapy_bookings_startsAt_key";

create unique index if not exists unique_active_booking_slot
on therapy_bookings ("startsAt")
where status in ('pending', 'confirmed');
```

Configura `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` y una clave fuerte en `BOOKING_ADMIN_TOKEN` dentro de Vercel. No expongas la service role key como variable `NEXT_PUBLIC`.

## Analitica y privacidad

Los eventos permitidos estan centralizados en `src/lib/analytics.ts`:

- `cta_click_agenda`
- `cta_click_whatsapp`
- `router_started`
- `router_completed`
- `booking_view`
- `booking_click`
- `workshop_interest_submit`
- `blog_cta_click`

No se deben enviar nombres, diagnosticos, mensajes libres ni informacion sensible como parametros de analitica.

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. Importa el proyecto en Vercel.
3. Configura las variables de entorno.
4. Ejecuta el build con `npm run build`.

El sitio incluye metadata por pagina, Open Graph, `sitemap.xml`, `robots.txt` y schema JSON-LD basico.
