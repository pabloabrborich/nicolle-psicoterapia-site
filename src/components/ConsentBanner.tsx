"use client";

import { useEffect, useState } from "react";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem("analytics-consent") !== "granted");
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-20 z-50 mx-auto max-w-2xl rounded-lg border border-ink/10 bg-white p-4 shadow-soft md:bottom-4">
      <p className="text-sm leading-6 text-graphite">
        Usamos analitica basica y eventos genericos para mejorar el sitio. No enviamos datos sensibles ni textos libres a herramientas de medicion.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          className="rounded-full bg-pine px-4 py-2 text-sm font-semibold text-white"
          onClick={() => {
            localStorage.setItem("analytics-consent", "granted");
            setVisible(false);
          }}
        >
          Aceptar
        </button>
        <button
          className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink"
          onClick={() => {
            localStorage.setItem("analytics-consent", "denied");
            setVisible(false);
          }}
        >
          Mantener minimo
        </button>
      </div>
    </div>
  );
}
