import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import proyectoPanaderia from "@/assets/proyecto-panaderia.jpg";
import proyectoFloristeria from "@/assets/proyecto-floristeria.jpg";
import proyectoGimnasio from "@/assets/proyecto-gimnasio.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marketly | Diseño y desarrollo web" },
      { name: "description", content: "Creación, rediseño y mantenimiento de páginas web para pequeños negocios, autónomos y comercios locales." },
      { property: "og:title", content: "Marketly | Diseño y desarrollo web" },
      { property: "og:description", content: "Webs claras, cuidadas y fáciles de mantener para pequeños negocios." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  { number: "01", name: "Creación de webs", description: "Diseñamos páginas web desde cero adaptadas a tu negocio." },
  { number: "02", name: "Rediseño web", description: "Modernizamos páginas antiguas para mejorar su imagen y experiencia." },
  { number: "03", name: "Mantenimiento", description: "Actualizamos contenido, imágenes, información y realizamos mejoras cuando las necesites." },
];

const projects = [
  { name: "Panadería La Espiga", category: "Web + encargos", description: "Una web cálida y sencilla para presentar el obrador y recibir encargos.", image: proyectoPanaderia },
  { name: "Floristería Clavel", category: "Catálogo online", description: "Un catálogo visual pensado para convertir visitas en pedidos directos.", image: proyectoFloristeria },
  { name: "Estudio Norte", category: "Web corporativa", description: "Una presencia digital clara para captar nuevos clientes del barrio.", image: proyectoGimnasio },
];

const steps = ["Nos cuentas tu idea.", "Diseñamos tu web.", "Revisamos los detalles contigo.", "Publicamos tu web."];

function sendByEmail(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const fields = Object.fromEntries(form.entries());
  const body = [
    `Nombre: ${fields["nombre"] ?? ""}`,
    `Negocio: ${fields["negocio"] ?? ""}`,
    `Email: ${fields["email"] ?? ""}`,
    `Teléfono: ${fields["telefono"] ?? ""}`,
    `Servicio: ${fields["servicio"] ?? ""}`,
    "",
    `${fields["mensaje"] ?? ""}`,
  ].join("\n");
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent("marketly.oficial@gmail.com")}&su=${encodeURIComponent("Nueva solicitud para Marketly")}&body=${encodeURIComponent(body)}`, "_blank", "noopener");
}

function RequestForm({ compact = false, initialService = "Creación de webs" }: { compact?: boolean; initialService?: string }) {
  const inputClass = "mt-2 w-full border-b border-ink/20 bg-transparent px-0 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-ink";
  return (
    <form onSubmit={sendByEmail} className={compact ? "space-y-4" : "space-y-5"}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-xs font-semibold uppercase text-ink/55">Nombre
          <input className={inputClass} name="nombre" placeholder="Tu nombre" required maxLength={100} autoComplete="name" />
        </label>
        <label className="text-xs font-semibold uppercase text-ink/55">Nombre del negocio
          <input className={inputClass} name="negocio" placeholder="Tu negocio" required maxLength={120} autoComplete="organization" />
        </label>
        <label className="text-xs font-semibold uppercase text-ink/55">Email
          <input className={inputClass} type="email" name="email" placeholder="tu@email.com" required maxLength={255} autoComplete="email" />
        </label>
        <label className="text-xs font-semibold uppercase text-ink/55">Teléfono
          <input className={inputClass} type="tel" name="telefono" placeholder="Opcional" maxLength={30} autoComplete="tel" />
        </label>
      </div>
      <label className="block text-xs font-semibold uppercase text-ink/55">Servicio que necesitas
        <select className={inputClass} name="servicio" defaultValue={initialService}>
          {services.map((service) => <option key={service.name}>{service.name}</option>)}
          <option>Aún no lo tengo claro</option>
        </select>
      </label>
      <label className="block text-xs font-semibold uppercase text-ink/55">Mensaje
        <textarea className={`${inputClass} resize-none`} name="mensaje" rows={compact ? 3 : 5} placeholder="Cuéntanos brevemente qué necesitas" required maxLength={1500} />
      </label>
      <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-7 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-80">
        Enviar solicitud
      </button>
    </form>
  );
}

function Index() {
  const [modalService, setModalService] = useState<string | null>(null);

  return (
    <main className="min-h-screen overflow-hidden bg-paper text-ink">
      <header className="mx-auto grid max-w-[1360px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 pt-6 sm:flex sm:justify-between md:px-10 md:pt-7">
        <a href="#inicio" className="flex min-w-0 items-center gap-2.5" aria-label="Marketly, inicio">
          <span className="h-3 w-3 shrink-0 rounded-full bg-ink" />
          <span className="font-display text-lg font-bold">Marketly</span>
          <span className="hidden text-[11px] uppercase text-ink/40 sm:inline">agencia web</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex" aria-label="Navegación principal">
          <a href="#inicio" className="transition-colors hover:text-ink">Inicio</a>
          <a href="#servicios" className="transition-colors hover:text-ink">Servicios</a>
          <a href="#proyectos" className="transition-colors hover:text-ink">Proyectos</a>
          <a href="#contacto" className="transition-colors hover:text-ink">Contacto</a>
        </nav>
        <button onClick={() => setModalService("Creación de webs")} className="shrink-0 rounded-full border border-ink/25 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-paper sm:px-5">
          Solicitar Web
        </button>
      </header>

      <section id="inicio" className="reveal mx-auto max-w-[1360px] px-5 pt-16 md:px-10 md:pt-24">
        <p className="mb-6 text-xs font-semibold uppercase text-ink/55">Diseño + desarrollo web · España</p>
        <h1 className="font-display text-[clamp(3.2rem,10vw,9.5rem)] leading-[0.88]">
          Tu negocio merece<br />
          <span className="font-light italic">una buena web.</span>
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">Creación, rediseño y mantenimiento de páginas web para negocios que quieren tener presencia online.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#servicios" className="rounded-full bg-ink px-7 py-4 font-semibold text-paper transition-opacity hover:opacity-80">Ver servicios</a>
            <button onClick={() => setModalService("Creación de webs")} className="font-semibold underline decoration-2 underline-offset-4 transition-opacity hover:opacity-60">Solicitar presupuesto</button>
          </div>
        </div>
      </section>

      <section id="servicios" className="mx-auto mt-20 max-w-[1360px] scroll-mt-8 px-5 md:mt-28 md:px-10">
        <div className="flex items-end justify-between border-b border-ink/10 pb-5">
          <h2 className="font-display text-3xl font-bold">Lo que hacemos</h2>
          <span className="text-xs uppercase text-ink/40">01 — 03</span>
        </div>
        <div className="mt-2 grid gap-px bg-ink/10 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.name} className="flex min-h-64 flex-col bg-paper p-7 transition-colors hover:bg-sand/60 md:p-9">
              <span className="text-sm font-semibold">{service.number}</span>
              <h3 className="mt-3 font-display text-2xl font-bold">{service.name}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-ink/60">{service.description}</p>
              <button onClick={() => setModalService(service.name)} className="mt-auto self-start pt-6 text-sm font-semibold underline decoration-2 underline-offset-4 transition-opacity hover:opacity-60">Solicitar</button>
            </article>
          ))}
        </div>
      </section>

      <section id="proyectos" className="mx-auto mt-20 max-w-[1360px] scroll-mt-8 px-5 md:mt-28 md:px-10">
        <div className="flex items-end justify-between border-b border-ink/10 pb-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase text-ink/45">Ejemplos editables</p>
            <h2 className="font-display text-3xl font-bold">Proyectos recientes</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-6">
          {projects.map((project) => (
            <article key={project.name} className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-sand">
                <img src={project.image} alt={`Proyecto web de ejemplo para ${project.name}`} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold">{project.name}</h3>
                  <p className="mt-1 text-sm font-medium text-ink/45">{project.category}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{project.description}</p>
                </div>
                <a href="#contacto" aria-label={`Ver proyecto ${project.name}`} className="shrink-0 text-xl transition-transform group-hover:translate-x-1">→</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[1360px] px-5 md:mt-28 md:px-10">
        <div className="rounded-2xl bg-ink px-7 py-12 text-paper md:px-14 md:py-16">
          <div className="grid items-end gap-10 md:grid-cols-2">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase text-paper/55">Cómo trabajamos</p>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">Un proceso claro, sin complicaciones.</h2>
            </div>
            <p className="max-w-md leading-relaxed text-paper/65 md:justify-self-end">Te acompañamos desde la primera idea hasta que tu web está publicada y lista para recibir clientes.</p>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-lg bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step} className="min-h-40 bg-ink p-6">
                <span className="text-sm text-paper/45">0{index + 1}</span>
                <p className="mt-8 font-display text-xl font-semibold">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contacto" className="mx-auto mt-20 grid max-w-[1360px] scroll-mt-8 gap-12 px-5 md:mt-28 md:grid-cols-[0.75fr_1.25fr] md:px-10">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase text-ink/45">Contacto</p>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">Cuéntanos qué necesita tu negocio.</h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink/60">Te responderemos personalmente para entender tu idea y preparar una propuesta clara.</p>
          <div className="mt-10 border-t border-ink/10 pt-6">
            <p className="text-xs font-semibold uppercase text-ink/40">Email</p>
            <a href="mailto:marketly.oficial@gmail.com" className="mt-2 inline-block font-semibold underline underline-offset-4">marketly.oficial@gmail.com</a>
            <p className="mt-6 text-sm text-ink/50">Teléfono y WhatsApp disponibles próximamente.</p>
          </div>
        </div>
        <div className="border-t border-ink/15 pt-7 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <RequestForm />
        </div>
      </section>

      <footer className="mx-auto mt-20 max-w-[1360px] border-t border-ink/10 px-5 py-10 md:mt-24 md:px-10">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <div className="flex items-center gap-2.5"><span className="h-2.5 w-2.5 rounded-full bg-ink" /><span className="font-display font-bold">Marketly</span></div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink/60">
            <a href="#servicios">Servicios</a><a href="#proyectos">Proyectos</a><a href="#contacto">Contacto</a>
          </nav>
          <a href="mailto:marketly.oficial@gmail.com" className="text-sm text-ink/60">marketly.oficial@gmail.com</a>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-ink/10 pt-6 text-xs text-ink/45 sm:flex-row sm:justify-between">
          <p>© 2026 Marketly. Todos los derechos reservados.</p>
          <div className="flex gap-5"><a href="#">Política de privacidad</a><a href="#">Aviso legal</a></div>
        </div>
      </footer>

      {modalService && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-ink/70 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalService(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="request-title" className="relative my-6 w-full max-w-2xl rounded-xl bg-paper p-6 shadow-2xl sm:p-9">
            <button onClick={() => setModalService(null)} aria-label="Cerrar formulario" className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-xl transition-colors hover:bg-ink hover:text-paper">×</button>
            <p className="text-xs font-semibold uppercase text-ink/45">Nueva solicitud</p>
            <h2 id="request-title" className="mt-2 pr-12 font-display text-3xl font-bold">Cuéntanos tu proyecto</h2>
            <p className="mb-7 mt-3 text-sm text-ink/60">Completa los datos y se abrirá Gmail con la solicitud preparada.</p>
            <RequestForm compact initialService={modalService} />
          </section>
        </div>
      )}
    </main>
  );
}