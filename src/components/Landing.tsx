import { Component, createSignal, onMount, onCleanup } from "solid-js"
import logoUrl from "../assets/Ahead 512.png"

// Auto-importa tutti gli screenshot
const files = import.meta.glob("../assets/screens/*.{png,jpg,jpeg,webp,bmp,avif}", {
	eager: true,
	as: "url",
})

// Ordina per nome file (es. screen1, screen2...)
const slides = Object.keys(files)
	.sort()
	.map((k) => (files as Record<string, string>)[k])

const [slide, setSlide] = createSignal(0)

/**
 * Landing page "one-page" per AHEAD
 * - Palette: blu profondo (blue-700/800), grigi neutri e accenti bianchi
 * - Stile solido, minimal e tech
 * - Copy basato su pianificazione finanziaria, multi-account e previsioni
 */
const Landing: Component = () => {
	const [menuOpen, setMenuOpen] = createSignal(false)

	const smoothScroll = (e: Event) => {
		const target = e.currentTarget as HTMLAnchorElement
		const href = target.getAttribute("href")
		if (!href || !href.startsWith("#")) return
		e.preventDefault()
		const el = document.querySelector(href)
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
		setMenuOpen(false)
	}

	onMount(() => {
		const header = document.getElementById("ahead-header")
		const onScroll = () => {
			if (header) header.classList.toggle("shadow-lg", window.scrollY > 10)
		}
		window.addEventListener("scroll", onScroll)
		onScroll()

		// 🔹 cambio automatico slide
		const id = setInterval(() => {
			setSlide((s) => (s + 1) % slides.length)
		}, 6000)

		onCleanup(() => clearInterval(id))
	})

	const logout = () => {
		localStorage.removeItem("ahead_invited")
		window.location.reload()
	}

	return (
		<div class="bg-[#0f172a] text-white selection:bg-blue-700 selection:text-white">
			{/* Header */}
			<header
				id="ahead-header"
				class="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-md transition-shadow"
			>
				<div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
					<a href="#top" onClick={smoothScroll} class="flex items-center gap-3">
						<div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
							<img src={logoUrl} alt="Ahead logo" class="h-6 w-6 rounded-full" />
						</div>
						<span class="text-lg font-semibold tracking-wide">
							<span class="text-blue-500">AHEAD</span>
						</span>
					</a>

					<nav class="hidden gap-6 md:flex">
						{[
							["Home", "#hero"],
							["Funzioni", "#features"],
							["Come funziona", "#how"],
							["FAQ", "#faq"],
						].map(([label, href]) => (
							<a
								href={href}
								onClick={smoothScroll}
								class="text-sm opacity-80 hover:opacity-100"
							>
								{label}
							</a>
						))}
					</nav>

					<div class="flex items-center gap-3">
						<a
							href="#cta"
							onClick={smoothScroll}
							class="hidden rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 md:inline-block"
						>
							Contattaci
						</a>
						<button
							type="button"
							onClick={logout}
							class="hidden rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/5 md:inline-block"
						>
							Esci
						</button>
						<button
							class="md:hidden"
							aria-label="Apri menu"
							onClick={() => setMenuOpen(!menuOpen())}
						>
							<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none">
								<path
									d="M4 6h16M4 12h16M4 18h16"
									stroke="white"
									stroke-width="2"
									stroke-linecap="round"
								/>
							</svg>
						</button>
					</div>
				</div>

				<div
					class={`md:hidden ${menuOpen() ? "block" : "hidden"} border-t border-white/10 bg-[#0f172a]`}
				>
					<nav class="mx-auto flex max-w-7xl flex-col px-5 py-3">
						{[
							["Home", "#hero"],
							["Funzioni", "#features"],
							["Come funziona", "#how"],
							["FAQ", "#faq"],
						].map(([label, href]) => (
							<a
								href={href}
								onClick={smoothScroll}
								class="rounded-lg px-3 py-2 text-sm opacity-80 hover:bg-white/5 hover:opacity-100"
							>
								{label}
							</a>
						))}
						<a
							href="#cta"
							onClick={smoothScroll}
							class="mt-2 rounded-xl bg-blue-700 px-4 py-2 text-center text-sm font-semibold text-white"
						>
							Contattaci
						</a>
					</nav>
				</div>
			</header>

			{/* Hero */}
			<section id="hero" class="relative isolate overflow-hidden">
				<div aria-hidden class="pointer-events-none absolute inset-0 -z-10">
					<div class="absolute left-1/2 top-[-15%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-blue-700/20 blur-[120px]" />
					<div class="absolute right-[-10%] bottom-[-10%] h-[40vh] w-[40vh] rounded-full bg-blue-800/10 blur-[120px]" />
				</div>

				<div class="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-20 pt-16 md:grid-cols-2 md:pb-28 md:pt-24">
					<div class="space-y-6">
						<p class="inline-block rounded-full border border-blue-700/30 bg-blue-700/10 px-3 py-1 text-xs font-semibold tracking-wide text-blue-400">
							Il tuo futuro finanziario, chiaro e sotto controllo
						</p>
						<h1 class="text-4xl font-extrabold leading-tight md:text-6xl">
							Pianifica. Prevedi. Cresci.
							<div class="text-blue-600 mt-4">Con AHEAD.</div>
						</h1>
						<p class="max-w-prose text-lg opacity-80">
							AHEAD è il gestionale previsionale per monitorare, pianificare e
							simulare l’evoluzione dei tuoi conti nel tempo — in tutte le valute,
							con inflazione, rendimenti e trasferimenti automatici. Guarda il tuo
							futuro finanziario con chiarezza.
						</p>
						<div class="flex flex-col gap-3 sm:flex-row">
							<a
								href="#cta"
								onClick={smoothScroll}
								class="rounded-xl bg-blue-700 px-6 py-3 text-center font-semibold text-white transition hover:brightness-110"
							>
								Provalo ora
							</a>
							<a
								href="#features"
								onClick={smoothScroll}
								class="rounded-xl border border-white/15 px-6 py-3 text-center font-semibold hover:bg-white/5"
							>
								Scopri di più
							</a>
						</div>
						<div class="flex flex-wrap items-center gap-4 pt-2 text-sm opacity-70">
							<span>Multi-account</span>
							<span class="h-1 w-1 rounded-full bg-white/40" />
							<span>Multi-valuta</span>
							<span class="h-1 w-1 rounded-full bg-white/40" />
							<span>Inflazione e rendimenti</span>
						</div>
					</div>

					<div class="relative">
						<div class="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-4 shadow-2xl">
							<div class="relative overflow-hidden rounded-2xl bg-black ring-1 ring-white/10">
								<div class="h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] w-full relative">
									{slides.map((src, i) => (
										<div
											class={`absolute inset-0 transition-opacity duration-700 ${slide() === i ? "opacity-100 running" : "opacity-0 paused"
												}`}
											aria-hidden={slide() !== i}
										>
											<img
												src={src}
												alt={`Schermata Ahead ${i + 1}`}
												class="h-full w-full object-cover pointer-events-none select-none"
												draggable={false}
												loading="eager"
											/>
										</div>
									))}
								</div>

								{/* Dots indicatori */}
								<div class="pointer-events-auto absolute bottom-3 left-0 right-0 flex justify-center gap-2">
									{slides.map((_, i) => (
										<button
											class={`h-1.5 w-6 rounded-full transition ${slide() === i ? "bg-blue-600" : "bg-white/30 hover:bg-white/50"
												}`}
											onClick={() => setSlide(i)}
											aria-label={`Vai alla slide ${i + 1}`}
										/>
									))}
								</div>
							</div>
						</div>
					</div>

				</div>

			</section>

			{/* Features */}
			<section id="features" class="mx-auto max-w-7xl px-5 py-16 md:py-24">
				<h2 class="mb-10 text-3xl font-extrabold md:text-4xl">
					Un solo sguardo. <span class="text-blue-500">Tutto il tuo patrimonio.</span>
				</h2>

				<div class="grid gap-6 md:grid-cols-3">
					{[
						{
							title: "Multi-account e multi-valuta",
							desc:
								"Collega tutti i tuoi conti — bancari, investimenti, crypto, asset fisici — anche in valute diverse.",
						},
						{
							title: "Ricorrenze intelligenti",
							desc:
								"Pianifica entrate e uscite periodiche con date, valute, durata e indicizzazione all’inflazione.",
						},
						{
							title: "Trasferimenti automatici",
							desc:
								"Imposta soglie e regole per spostare fondi tra conti in base alle tue strategie di equilibrio.",
						},
						{
							title: "Rendimenti dinamici",
							desc:
								"Assegna tassi di rendimento ai tuoi account per stimare la crescita di investimenti o riserve.",
						},
						{
							title: "Simulazioni decennali",
							desc:
								"Genera evoluzioni realistiche dei saldi per decine d’anni, con l’impatto di inflazione e performance.",
						},
						{
							title: "Delta automatico vs previsione",
							desc:
								"Vedi in tempo reale se stai andando meglio o peggio del previsto, se hai surplus spendibili o gap da colmare.",
						},
						{
							title: "Grafici e viste personalizzate",
							desc:
								"Crea viste aggregate, scegli valuta e orizzonte temporale. Visualizza ciò che conta davvero.",
						},
						{
							title: "Cambio valute aggiornato",
							desc:
								"Ahead integra tassi di cambio aggiornati per convertire e confrontare facilmente i tuoi conti internazionali.",
						},
						{
							title: "Sicurezza di livello enterprise",
							desc:
								"I tuoi dati sono protetti con cifratura AES-256, autenticazione sicura (JWT) e politiche di Row-Level Security. Solo tu puoi accedere alle tue informazioni.",
						},
						{
							title: "Sincronizzazione in tempo reale",
							desc:
								"Ogni modifica che fai viene salvata e aggiornata all’istante su tutti i tuoi dispositivi: desktop, tablet e smartphone.",
						},
						{
							title: "Multipiattaforma & PWA",
							desc:
								"Ahead funziona su Windows, macOS e smartphone. Puoi anche installarlo come app PWA per un’esperienza nativa, senza download.",
						},
						{
							title: "Interfaccia chiara e intuitiva",
							desc:
								"Tutta la complessità di un previsionale semplificata in un design pulito e minimal, per concentrarti solo sui tuoi obiettivi.",
						},
					].map((f) => (
						<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
							<div class="flex gap-3">
								<div class="mb-3 h-8 w-8 rounded-lg bg-blue-700/70 text-blue-600 font-bold flex items-center justify-center">A</div>
								<h3 class="mb-1 text-lg font-semibold">{f.title}</h3>
							</div>
							<p class="text-sm opacity-80">{f.desc}</p>
						</div>
					))}
				</div>
			</section>

			{/* Come funziona */}
			<section id="how" class="mx-auto max-w-7xl px-5 py-16 md:py-24">
				<h2 class="mb-8 text-3xl font-extrabold md:text-4xl">
					Come funziona <span class="text-blue-600">AHEAD</span>
				</h2>

				<ol class="grid gap-6 md:grid-cols-3">
					{[
						{
							step: "1",
							title: "Configura i tuoi account",
							desc:
								"Aggiungi conti correnti, investimenti o asset. Imposta valute e rendimenti attesi.",
						},
						{
							step: "2",
							title: "Aggiungi ricorrenze e trasferimenti",
							desc:
								"Registra entrate e uscite periodiche, definisci regole di spostamento automatico.",
						},
						{
							step: "3",
							title: "Analizza le proiezioni ed il trend",
							desc:
								"Consulta grafici e tabelle per scoprire il tuo andamento rispetto alle previsioni e come evolveranno i tuoi saldi nei prossimi anni.",
						},
					].map((s) => (
						<li class="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
							<div class="mb-2 text-2xl font-extrabold text-blue-500">{s.step}</div>
							<h3 class="mb-1 text-lg font-semibold">{s.title}</h3>
							<p class="text-sm opacity-80">{s.desc}</p>
						</li>
					))}
				</ol>
			</section>

			{/* FAQ */}
			<section id="faq" class="mx-auto max-w-7xl px-5 py-16 md:py-24">
				<h2 class="mb-8 text-3xl font-extrabold md:text-4xl">FAQ</h2>
				<div class="grid gap-4 md:grid-cols-2">
					{[
						[
							"È un'app online?",
							"Ahead funziona nel browser e può essere installata come app PWA. I dati vengono salvati in modo sicuro con sincronizzazione cloud opzionale.",
						],
						[
							"Posso gestire più valute?",
							"Sì. Tutti i conti, ricorrenze e trasferimenti possono essere in valute diverse, con tassi di cambio aggiornabili in tempo reale.",
						],
						[
							"Posso simulare l'inflazione?",
							"Puoi collegare ogni ricorrenza all’inflazione o impostare un tasso personalizzato per una previsione più precisa.",
						],
						[
							"Posso analizzare rendimenti e investimenti?",
							"Certo. Ogni account può avere un tasso di rendimento: Ahead calcola automaticamente la crescita e il delta rispetto alle previsioni.",
						],
						[
							"Posso usarlo su più dispositivi?",
							"Sì. Ahead sincronizza automaticamente le modifiche tra tutti i tuoi device — desktop, laptop e smartphone — in tempo reale.",
						],
						[
							"È gratuito?",
							"La versione base è gratuita. Ahead è in sviluppo attivo e introdurrà piani premium solo per funzioni avanzate.",
						],
					].map(([q, a]) => (
						<div class="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
							<h3 class="mb-2 text-base font-semibold">{q}</h3>
							<p class="text-sm opacity-80">{a}</p>
						</div>
					))}
				</div>
			</section>


			{/* CTA finale */}
			<section id="cta" class="bg-blue-700 text-white">
				<div class="mx-auto max-w-7xl px-5 py-16 md:py-24">
					<div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
						<div>
							<h2 class="text-3xl font-extrabold md:text-4xl">
								Porta avanti le tue finanze. Con AHEAD.
							</h2>
							<p class="mt-2 max-w-prose opacity-80 whitespace-nowrap">
								Registrati, imposta i tuoi conti e scopri subito la chiarezza del
								tuo futuro finanziario.
							</p>
						</div>
						<div class="flex gap-3">
							<a
								href="https://wa.me/393476609338?text=Ciao%20!%20Vorrei%20saperne%20di%20pi%C3%B9%20su%20Ahead"
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-800 hover:opacity-90"
							>
								Contattaci
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer class="border-t border-white/10">
				<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm opacity-70 md:flex-row">
					<div class="flex items-center gap-3">
						<div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
							<img src={logoUrl} alt="Ahead logo" class="h-6 w-6 rounded-full" />
						</div>
						<span>{new Date().getFullYear()} AHEAD</span>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default Landing
