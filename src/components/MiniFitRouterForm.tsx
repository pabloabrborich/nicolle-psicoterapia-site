"use client";

import { FormEvent, useMemo, useState } from "react";
import { submitLead } from "@/lib/actions";
import { trackSafeEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/env";

const audiences = ["Para mi", "Para mi hijo/hija", "Para mi familia", "Para un taller o grupo"];
const preferences = ["Agendar una cita", "Resolver dudas por WhatsApp", "Recibir informacion"];
const areas = ["Regulacion emocional", "Crianza", "Relacion familiar", "Estres / ansiedad", "Taller / grupo", "Otro"];

type FormState = {
  audience: string;
  preference: string;
  name: string;
  whatsapp: string;
  email: string;
  area: string;
  consent: boolean;
};

const initialState: FormState = {
  audience: "",
  preference: "",
  name: "",
  whatsapp: "",
  email: "",
  area: "",
  consent: false
};

export function MiniFitRouterForm() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState(initialState);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const progress = useMemo(() => `${(step / 5) * 100}%`, [step]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    if (step === 1) trackSafeEvent("router_started", { step });
    setState((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function canContinue() {
    if (step === 1) return Boolean(state.audience);
    if (step === 2) return Boolean(state.preference);
    if (step === 3) return state.name.trim().length > 1 && state.whatsapp.trim().length > 6 && /.+@.+\..+/.test(state.email);
    if (step === 4) return Boolean(state.area);
    return state.consent;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canContinue()) {
      setError("Completa este paso para continuar.");
      return;
    }

    if (step < 5) {
      setStep((current) => current + 1);
      return;
    }

    await submitLead(state);
    trackSafeEvent("router_completed", { destination: state.preference });

    if (state.audience === "Para un taller o grupo" || state.area === "Taller / grupo") {
      window.location.href = "/talleres-y-grupos";
      return;
    }

    if (state.preference === "Agendar una cita") {
      window.location.href = "/agenda";
      return;
    }

    if (state.preference === "Resolver dudas por WhatsApp") {
      window.location.href = whatsappUrl("Hola Psic. Nicolle, complete el formulario del sitio y quisiera resolver una duda breve por WhatsApp.");
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-lg border border-ink/10 bg-white p-8 shadow-soft">
        <h3 className="font-serif text-3xl font-semibold text-ink">Gracias. Recibimos tu interes.</h3>
        <p className="mt-3 text-sm leading-6 text-graphite">
          El siguiente paso es revisar la informacion y responder con una ruta clara, sin pedirte detalles sensibles por este canal.
        </p>
      </div>
    );
  }

  return (
    <form id="router" onSubmit={onSubmit} className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft md:p-8">
      <div className="h-2 rounded-full bg-sage" aria-hidden="true">
        <div className="h-2 rounded-full bg-pine transition-all" style={{ width: progress }} />
      </div>
      <p className="mt-4 text-sm font-semibold text-pine">Paso {step} de 5</p>

      {step === 1 ? <Choice title="Para quien buscas acompanamiento?" options={audiences} value={state.audience} onPick={(value) => setField("audience", value)} /> : null}
      {step === 2 ? <Choice title="Que prefieres hacer ahora?" options={preferences} value={state.preference} onPick={(value) => setField("preference", value)} /> : null}
      {step === 3 ? (
        <div className="mt-6 grid gap-4">
          <Input label="Nombre" value={state.name} onChange={(value) => setField("name", value)} />
          <Input label="WhatsApp" value={state.whatsapp} onChange={(value) => setField("whatsapp", value)} inputMode="tel" />
          <Input label="Email" value={state.email} onChange={(value) => setField("email", value)} type="email" />
        </div>
      ) : null}
      {step === 4 ? <Choice title="Area principal de interes" options={areas} value={state.area} onPick={(value) => setField("area", value)} /> : null}
      {step === 5 ? (
        <label className="mt-6 flex gap-3 rounded-lg bg-mint p-4 text-sm leading-6 text-graphite">
          <input type="checkbox" checked={state.consent} onChange={(event) => setField("consent", event.target.checked)} className="mt-1 h-4 w-4" />
          Acepto que mis datos de contacto se usen para responder esta solicitud. No compartire informacion clinica sensible en este formulario.
        </label>
      ) : null}

      {error ? <p className="mt-4 text-sm font-semibold text-clay">{error}</p> : null}
      <div className="mt-6 flex items-center gap-3">
        {step > 1 ? (
          <button type="button" className="rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-ink" onClick={() => setStep((current) => current - 1)}>
            Volver
          </button>
        ) : null}
        <button type="submit" className="rounded-full bg-pine px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink">
          {step === 5 ? "Enviar" : "Continuar"}
        </button>
      </div>
    </form>
  );
}

function Choice({ title, options, value, onPick }: { title: string; options: string[]; value: string; onPick: (value: string) => void }) {
  return (
    <fieldset className="mt-6">
      <legend className="font-serif text-3xl font-semibold text-ink">{title}</legend>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => onPick(option)}
            className={`rounded-lg border px-4 py-4 text-left text-sm font-semibold transition ${value === option ? "border-pine bg-mint text-ink" : "border-ink/10 bg-white text-graphite hover:border-pine/50"}`}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Input({ label, value, onChange, type = "text", inputMode }: { label: string; value: string; onChange: (value: string) => void; type?: string; inputMode?: "tel" }) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <label htmlFor={id} className="grid gap-2 text-sm font-semibold text-ink">
      {label}
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded-lg border border-ink/15 bg-white px-4 text-base text-ink"
      />
    </label>
  );
}
