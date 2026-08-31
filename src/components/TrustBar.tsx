const items = [
  "Atención personalizada",
  "Tratamientos estéticos",
  "Turnos programados",
  "Lanús Oeste",
];

export function TrustBar() {
  return (
    <section className="border-y border-ink/8 bg-paper">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item}
            className={`flex items-center justify-center px-4 py-7 text-center md:py-8 ${
              i !== items.length - 1 ? "md:border-r md:border-ink/8" : ""
            }`}
          >
            <p className="text-[11px] tracking-[0.22em] uppercase text-taupe">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
