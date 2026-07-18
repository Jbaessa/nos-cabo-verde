"use client";

import { Mail, MapPin } from "lucide-react";

const SvgInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const SvgYoutube = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20.06 12 20.06 12 20.06s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
  </svg>
);
const SvgFacebook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const SvgX = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const footerLinks = {
  descobrir: {
    title: "Descobrir",
    links: [
      { label: "As Dez Ilhas", href: "#ilhas" },
      { label: "Cultura", href: "#cultura" },
      { label: "Gastronomia", href: "#sabores" },
      { label: "Música", href: "#musica" },
      { label: "Agenda", href: "#agenda" },
    ],
  },
  experiencias: {
    title: "Experiências",
    links: [
      { label: "Natureza", href: "#" },
      { label: "Mergulho", href: "#" },
      { label: "Kitesurf", href: "#" },
      { label: "Trekking", href: "#" },
      { label: "Gastronomia Local", href: "#" },
    ],
  },
  plataforma: {
    title: "Plataforma",
    links: [
      { label: "Sobre Nós", href: "#" },
      { label: "Parceiros", href: "#" },
      { label: "Tornar-se Parceiro", href: "#" },
      { label: "Imprensa", href: "#" },
      { label: "Investidores", href: "#" },
    ],
  },
  suporte: {
    title: "Suporte",
    links: [
      { label: "Planear Viagem", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Contacto", href: "#" },
      { label: "Termos de Uso", href: "#" },
      { label: "Privacidade", href: "#" },
    ],
  },
};

const socials = [
  { icon: SvgInstagram, label: "Instagram", href: "#" },
  { icon: SvgYoutube, label: "YouTube", href: "#" },
  { icon: SvgFacebook, label: "Facebook", href: "#" },
  { icon: SvgX, label: "X/Twitter", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-ncv-night text-white">
      {/* Newsletter bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div>
            <h3 className="font-serif text-2xl text-white mb-1">Fica ligado a Cabo Verde</h3>
            <p className="text-white/50 text-sm font-sans">
              Histórias, eventos, receitas e muito mais. Directamente no teu email.
            </p>
          </div>
          <form
            className="flex items-center gap-1.5 w-full md:w-auto bg-white/5 border border-white/10 rounded-full p-1.5 focus-within:border-ncv-gold/50 transition-colors"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="O teu email"
              className="flex-1 bg-transparent text-white placeholder-white/30 px-4 py-2 text-sm font-sans focus:outline-none min-w-0"
            />
            <button
              type="submit"
              className="btn btn-gold px-6 py-2.5 text-xs font-bold tracking-widest uppercase shrink-0"
            >
              Subscrever
            </button>
          </form>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="15" stroke="#C9A05E" strokeWidth="1.5" />
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                    const angle = (i * 36 - 90) * (Math.PI / 180);
                    const r = 11;
                    const x = 16 + r * Math.cos(angle);
                    const y = 16 + r * Math.sin(angle);
                    return <circle key={i} cx={x} cy={y} r="1.2" fill="#C9A05E" />;
                  })}
                </svg>
              </div>
              <span className="font-serif text-xl text-white">Nós Cabo Verde</span>
            </div>
            <p className="text-white/50 text-sm font-sans leading-relaxed mb-6 max-w-xs">
              Dez ilhas. Um povo. Uma alma. O portal digital da cultura, identidade e beleza
              cabo-verdiana.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:border-ncv-gold/50 hover:text-ncv-gold transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-8 space-y-2">
              <a
                href="mailto:geral@noscaboverde.cv"
                className="flex items-center gap-2 text-white/40 hover:text-ncv-gold text-xs font-sans transition-colors"
              >
                <Mail size={13} />
                geral@noscaboverde.cv
              </a>
              <div className="flex items-center gap-2 text-white/40 text-xs font-sans">
                <MapPin size={13} />
                Praia, Santiago, Cabo Verde
              </div>
            </div>
          </div>

          {/* Links columns */}
          {Object.values(footerLinks).map((col) => (
            <div key={col.title}>
              <h4 className="text-ncv-gold text-xs font-sans font-bold tracking-widest uppercase mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/40 hover:text-white text-sm font-sans transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs font-sans">
            © 2025 Nós Cabo Verde · Todos os direitos reservados
          </p>
          <p className="text-ncv-gold/40 text-xs font-sans italic">
            Não mostramos apenas Cabo Verde. Fazemos o mundo senti-lo.
          </p>
          <div className="flex gap-4 text-white/25 text-xs font-sans">
            <a href="#" className="hover:text-white/60 transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
