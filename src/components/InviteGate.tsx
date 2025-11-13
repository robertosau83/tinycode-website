import { Component, createSignal, onMount } from "solid-js"
import logoUrl from "../assets/Ahead 512.png"
import { isInviteCode } from "../inviteCodes"

/**
 * Schermata di ingresso con codice d'invito (default: 1111)
 * Versione Ahead — palette grigio chiaro (slate-400)
 */
const InviteGate: Component<{ onSuccess: () => void; expectedCode?: string }> = (props) => {
	const [code, setCode] = createSignal("")
	const [error, setError] = createSignal<string | null>(null)
	const [show, setShow] = createSignal(false)
	const [loading, setLoading] = createSignal(false)

	onMount(() => {
		// Sblocco via URL param ?code=XXXXXX (utile per QR)
		const p = new URLSearchParams(window.location.search)
		const urlCode = p.get("code")
		if (urlCode && isInviteCode(urlCode)) {
			localStorage.setItem("ahead_invited", "true")
			localStorage.setItem("ahead_invited_code", urlCode.toUpperCase())
			props.onSuccess()
			return
		}
	})

	const submit = (e: Event) => {
		e.preventDefault()
		setError(null)
		setLoading(true)

		const normalized = code().replace(/[^a-zA-Z0-9]/g, "")

		if (isInviteCode(normalized)) {
			console.log("Codice corretto:", normalized)
			localStorage.setItem("ahead_invited", "true")
			localStorage.setItem("ahead_invited_code", normalized)
			setLoading(false)
			props.onSuccess()
			return
		}

		setError("Codice non valido. Riprova.")
		setLoading(false)
	}

	return (
		<div class="min-h-dvh bg-[#0f172a] text-slate-100 overflow-hidden relative">
			{/* sfondo con glow grigio */}
			<div aria-hidden class="pointer-events-none absolute inset-0">
				<div class="absolute left-1/2 top-[-15%] h-[55vh] w-[55vh] -translate-x-1/2 rounded-full bg-slate-400/20 blur-[110px]" />
				<div class="absolute right-[-10%] bottom-[-10%] h-[35vh] w-[35vh] rounded-full bg-slate-400/10 blur-[110px]" />
			</div>

			<div class="relative mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6">
				<div class="w-full rounded-3xl border border-[#334155] bg-[#1e293b]/60 p-8 shadow-2xl backdrop-blur-md">
					
					{/* Logo + titolo */}
					<div class="w-full flex flex-col items-center justify-center pb-8">
						<div class="bg-[#0f172a] flex items-center justify-center shadow-lg shadow-slate-400/10">
							<img
								src={logoUrl}
								alt="Ahead logo"
								class="h-14 w-14 rounded-lg"
							/>
						</div>
						<span class="text-xl font-bold pt-2 text-slate-200">
							<span class="text-slate-100 tracking-wide">AHEAD</span>
						</span>
					</div>

					{/* Testo introduttivo */}
					<div class="mb-6 text-center">
						<p class="inline-block rounded-full border border-slate-300 bg-slate-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-slate-300">
							Accesso riservato
						</p>
						<h1 class="my-10 text-3xl font-extrabold md:text-4xl text-slate-400">
							Entra con il tuo{" "}
							<span class="text-slate-100">codice di invito</span>
						</h1>
					</div>

					{/* Form di accesso */}
					<form onSubmit={submit} class="grid gap-4">
						<label class="text-sm text-slate-100" for="invite">Codice di invito</label>
						<div class="flex items-stretch overflow-hidden rounded-xl border border-slate-700 bg-[#0f172a] focus-within:ring-2 focus-within:ring-slate-400">
							<input
								id="invite"
								inputMode="text"
								autocomplete="off"
								class="w-full bg-transparent px-4 py-3 outline-none placeholder:opacity-50"
								placeholder="Es. AHD2025"
								type={show() ? "text" : "password"}
								value={code()}
								onInput={(e) => setCode(e.currentTarget.value)}
								aria-invalid={!!error()}
								aria-describedby={error() ? "invite-error" : undefined}
							/>
							<button
								type="button"
								class="px-3 text-sm text-slate-400 hover:text-slate-300 transition"
								onClick={() => setShow(!show())}
								aria-label={show() ? "Nascondi codice" : "Mostra codice"}
							>
								{show() ? "Nascondi" : "Mostra"}
							</button>
						</div>

						{/* Errore */}
						{error() && (
							<div id="invite-error" class="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
								{error()}
							</div>
						)}

						{/* Pulsante */}
						<button
							type="submit"
							disabled={loading()}
							class="mt-2 rounded-xl bg-slate-300 px-5 py-3 font-semibold text-slate-900 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
						>
							{loading() ? "Verifico..." : "Accedi"}
						</button>
					</form>
				</div>

				{/* Claim finale */}
				{/* <div class="mt-6 text-center text-sm text-slate-400">
					Controllo, chiarezza, consapevolezza. ✦{" "}
					<span class="text-slate-400">Ahead.</span>
				</div> */}
			</div>
		</div>
	)
}

export default InviteGate
