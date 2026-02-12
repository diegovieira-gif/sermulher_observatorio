export default function Home() {
  const highlights = [
    {
      title: "Rede ativa",
      description:
        "Conecte pessoas, coletivos e profissionais para acolhimento rapido e seguro.",
    },
    {
      title: "Pesquisa viva",
      description:
        "Painel com dados locais, historias e sinais para orientar decisoes.",
    },
    {
      title: "Acoes no territorio",
      description:
        "Calendario de rodas, oficinas e campanhas integradas a sua cidade.",
    },
  ];

  const steps = [
    {
      label: "Escuta",
      detail: "Mapeie dores e prioridades com questionarios humanizados.",
    },
    {
      label: "Conexao",
      detail: "Crie pontes entre servicos, coletivos e iniciativas locais.",
    },
    {
      label: "Transformacao",
      detail: "Acompanhe impacto com indicadores simples e claros.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-fuchsia-400/30 blur-[120px]" />
        <div className="absolute left-0 top-32 h-80 w-80 rounded-full bg-emerald-300/20 blur-[140px]" />
        <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-amber-300/20 blur-[120px]" />

        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-400 via-rose-400 to-amber-300 text-slate-950">
              SM
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Ser Mulher
              </p>
              <p className="font-display text-lg">Observatorio</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-100 transition hover:border-white/50">
              Entrar
            </button>
            <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
              Agendar demo
            </button>
          </div>
        </header>

        <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-12 md:pt-20">
          <section className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col gap-6">
              <p className="w-fit rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200">
                Plataforma de cuidado coletivo
              </p>
              <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                Dados vivos, redes fortes, impacto real no territorio.
              </h1>
              <p className="max-w-xl text-lg text-slate-200">
                Um painel moderno para conectar pessoas, mapear necessidades e
                ativar iniciativas locais com foco em acolhimento e autonomia.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="rounded-full bg-gradient-to-r from-fuchsia-300 via-rose-300 to-amber-200 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-fuchsia-400/20 transition hover:translate-y-[-2px]">
                  Quero conhecer
                </button>
                <button className="rounded-full border border-white/20 px-6 py-3 text-sm text-slate-100 transition hover:border-white/50">
                  Ver demonstracao
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 text-center sm:text-left">
                <div>
                  <p className="text-2xl font-semibold text-white">+42%</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Engajamento
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white">3.8k</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Mapeamentos
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white">120</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Territorios
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-6 h-24 w-24 rounded-3xl border border-white/20 bg-white/5" />
              <div className="absolute -right-6 bottom-6 h-16 w-16 rounded-2xl border border-white/20 bg-white/10" />
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
                    Radar de cuidado
                  </p>
                  <span className="rounded-full bg-emerald-300/20 px-3 py-1 text-xs text-emerald-100">
                    Ativo
                  </span>
                </div>
                <div className="mt-6 grid gap-4">
                  {highlights.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                    >
                      <p className="font-display text-lg text-white">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm text-slate-300">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900/60 to-slate-800/30 p-4">
                  <div>
                    <p className="text-sm text-slate-300">
                      Indice de acolhimento
                    </p>
                    <p className="text-2xl font-semibold text-white">82/100</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Ultimos 30 dias
                    </p>
                    <p className="text-sm text-emerald-200">+12 pontos</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-8 md:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={`${item.title}-card`}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                  {item.title}
                </p>
                <p className="mt-4 text-base text-slate-200">
                  {item.description}
                </p>
                <div className="mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-fuchsia-300 to-amber-200" />
              </div>
            ))}
          </section>

          <section className="rounded-[40px] border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-950/80 to-slate-900/40 p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                  Metodo em 3 etapas
                </p>
                <h2 className="mt-4 font-display text-3xl text-white">
                  Um ciclo de cuidado que gera confianca e transforma dados em
                  acao.
                </h2>
                <p className="mt-4 text-base text-slate-300">
                  Combine escuta ativa, inteligencia comunitaria e analises
                  simples para ativar politicas e projetos com rapidez.
                </p>
              </div>
              <div className="grid gap-4">
                {steps.map((step, index) => (
                  <div
                    key={step.label}
                    className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-900">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-display text-lg text-white">
                        {step.label}
                      </p>
                      <p className="mt-1 text-sm text-slate-300">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="flex flex-col items-center gap-6 rounded-[32px] border border-white/10 bg-white/5 px-6 py-12 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
              Pronta para comecar
            </p>
            <h2 className="font-display text-3xl text-white">
              Demos voz, dados e direcao para quem cuida.
            </h2>
            <p className="max-w-2xl text-base text-slate-300">
              Crie um observatorio responsivo, acompanhe indicadores e fortalece
              iniciativas que ja existem no territorio.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                Agendar conversa
              </button>
              <button className="rounded-full border border-white/20 px-6 py-3 text-sm text-slate-100 transition hover:border-white/50">
                Baixar materiais
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
