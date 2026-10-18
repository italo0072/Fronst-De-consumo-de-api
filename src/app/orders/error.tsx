"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <div className="card"><h2>Algo salió mal</h2><p className="err">{error.message}</p><button onClick={reset}>Reintentar</button></div>;
}
