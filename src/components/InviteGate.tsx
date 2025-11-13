import { Component, createSignal, onMount } from "solid-js";
import logoUrl from "../assets/Ahead 512.png";
import { isInviteCode } from "../inviteCodes";

/**
 * Schermata di ingresso con codice d'invito (default: 1111)
 */
const InviteGate: Component<{ onSuccess: () => void; expectedCode?: string }> = (props) => {
	//const expected = props.expectedCode ?? "1111";
	const [code, setCode] = createSignal("");
	const [error, setError] = createSignal<string | null>(null);
	const [show, setShow] = createSignal(false);
	const [loading, setLoading] = createSignal(false);

	onMount(() => {
		// Sblocco via URL param ?code=XXXXXX (utile per QR)
		const p = new URLSearchParams(window.location.search);
		const urlCode = p.get("code");
		if (urlCode && isInviteCode(urlCode)) {
			localStorage.setItem("bw_invited", "true");
			localStorage.setItem("bw_invited_code", urlCode.toUpperCase());
			props.onSuccess();
			return;
		}
	});

	const submit = (e: Event) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		// normalizza: tiene solo lettere/numeri e converte in maiuscolo
		const normalized = code().replace(/[^a-zA-Z0-9]/g, "");

		if (isInviteCode(normalized)) {
			console.log("Codice corretto:", normalized);
			localStorage.setItem("bw_invited", "true");
			localStorage.setItem("bw_invited_code", normalized);
			setLoading(false);
			props.onSuccess();
			return;
		}

		setError("Codice non valido. Riprova.");
		setLoading(false);
	};

	return (
		<div class="min-h-dvh bg-black text-white overflow-hidden relative">
			{/* sfondo con glow verde */}
			<div aria-hidden class="pointer-events-none absolute inset-0">
				<div class="absolute left-1/2 top-[-15%] h-[55vh] w-[55vh] -translate-x-1/2 rounded-full bg-[#66cc8a]/25 blur-[110px]" />
				<div class="absolute right-[-10%] bottom-[-10%] h-[35vh] w-[35vh] rounded-full bg-[#66cc8a]/10 blur-[110px]" />
			</div>

			<div class="relative mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6">
				<div class="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-sm">

					<div class="w-full flex flex-col items-center justify-center pb-8">
						<div class="w-16 h-16 bg-white rounded-full flex items-center justify-center">
							<img
								src={logoUrl}
								alt="Ahead logo"
								class="h-12 w-12 rounded-full"
							/>
						</div>
						<span class="text-lg font-semibold tracking-wide pt-2">
							<span class="text-[#66cc8a]">Bar</span>Wise
						</span>
					</div>

					<div class="mb-6 text-center">
						<p class="inline-block rounded-full border border-[#66cc8a]/30 bg-[#66cc8a]/10 px-3 py-1 text-xs font-semibold tracking-wide text-[#66cc8a]">
							Accesso riservato
						</p>
						<h1 class="my-10 text-3xl font-extrabold md:text-4xl">
							Entra con il tuo <span class="text-[#66cc8a]">codice di invito</span>
						</h1>
					</div>

					<form onSubmit={submit} class="grid gap-4">
						<label class="text-sm opacity-80" for="invite">Codice di invito</label>
						<div class="flex items-stretch overflow-hidden rounded-xl border border-white/10 bg-black focus-within:ring-2 focus-within:ring-[#66cc8a]">
							<input
								id="invite"
								inputMode="text"
								autocomplete="off"
								class="w-full bg-transparent px-4 py-3 outline-none placeholder:opacity-50"
								placeholder="Es. Cu9Tpe"
								type={show() ? "text" : "password"}
								value={code()}
								onInput={(e) => setCode(e.currentTarget.value)}   // <-- niente toUpperCase()
								aria-invalid={!!error()}
								aria-describedby={error() ? "invite-error" : undefined}
							/>
							<button
								type="button"
								class="px-3 text-sm opacity-80 hover:opacity-100"
								onClick={() => setShow(!show())}
								aria-label={show() ? "Nascondi codice" : "Mostra codice"}
							>
								{show() ? "Nascondi" : "Mostra"}
							</button>
						</div>

						{error() && (
							<div id="invite-error" class="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
								{error()}
							</div>
						)}

						<button
							type="submit"
							disabled={loading()}
							class="mt-2 rounded-xl bg-[#66cc8a] px-5 py-3 font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
						>
							{loading() ? "Verifico..." : "Accedi"}
						</button>

						{/* <p class="mt-2 text-center text-xs opacity-60">
							Niente account: solo invito. Per assistenza contatta chi ti ha fornito il biglietto.
						</p> */}
					</form>
				</div>

				{/* Micro-claim sotto */}
				<div class="mt-6 text-center text-sm opacity-70">
					Più tempo per i clienti, meno per la cassa. <span class="text-[#66cc8a]">Ci pensa BarWise.</span>
				</div>
			</div>
		</div>
	);
};

export default InviteGate;
