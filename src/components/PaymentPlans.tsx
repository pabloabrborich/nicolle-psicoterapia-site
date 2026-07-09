"use client";

import { paymentUrl, whatsappUrl } from "@/lib/env";
import { trackSafeEvent } from "@/lib/analytics";
import { ButtonLink } from "./ButtonLink";

const plans = [
  { name: "Sesion individual", price: "USD 40", text: "Primera sesion o seguimiento online.", popular: false },
  { name: "Pack mensual 4 sesiones", price: "Consultar", text: "Ideal para sostener continuidad semanal.", popular: true },
  { name: "Taller o grupo", price: "Segun convocatoria", text: "Inscripcion o lista de espera para procesos grupales.", popular: false }
];

export function PaymentPlans() {
  const payUrl = paymentUrl();
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {plans.map((plan) => (
        <article key={plan.name} className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
          {plan.popular ? <span className="rounded-full bg-coral px-3 py-1 text-xs font-semibold text-ink">Mas elegido</span> : null}
          <h3 className="mt-4 text-xl font-semibold text-ink">{plan.name}</h3>
          <p className="mt-2 font-serif text-3xl text-pine">{plan.price}</p>
          <p className="mt-3 text-sm leading-6 text-graphite">{plan.text}</p>
          <div className="mt-5 grid gap-2">
            {payUrl ? (
              <ButtonLink href={payUrl} onClick={() => trackSafeEvent("booking_click", { provider: "payment" })}>Pagar externo</ButtonLink>
            ) : (
              <ButtonLink href={whatsappUrl("Hola Psic. Nicolle, quisiera consultar por opciones de pago y agenda.")} onClick={() => trackSafeEvent("cta_click_whatsapp", { placement: "payment_fallback" })}>
                Consultar por WhatsApp
              </ButtonLink>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
