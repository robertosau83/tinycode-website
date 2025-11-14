import { Component } from "solid-js"
import aheadLogo from "../assets/Ahead 512.png"
import barwiseLogo from "../assets/Barwise 512.png"
import wiseflowLogo from "../assets/wiseflow 512.png"

const Landing: Component = () => {
  return (
    <div class="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center">
      {/* Header */}
      <header class="w-full py-10 text-center">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">
          tiny<span class="text-blue-600">code</span>
        </h1>
        <p class="mt-2 text-gray-500">Piccole app, grandi idee.</p>
      </header>

      {/* App list */}
      <main class="flex flex-col items-center w-full max-w-3xl px-6">
        {/* AHEAD */}
        <section class="w-full bg-white shadow-md rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-6 transition hover:shadow-lg">
          <img
            src={aheadLogo}
            alt="AHead logo"
            class="w-24 h-24 rounded-xl object-contain border shadow-lg"
          />
          <div class="flex-1 text-center sm:text-left">
            <h2 class="text-2xl font-semibold text-gray-900">AHEAD</h2>
            <p class="mt-2 text-gray-600 leading-relaxed">
              AHEAD è il tuo laboratorio finanziario personale: collega conti,
              pianifica ricorrenze e trasferimenti automatici, stima rendimenti
              futuri e confronta in tempo reale le tue previsioni con la realtà.
              Un motore di simulazione multi-valuta per capire dove stai andando
              — e decidere dove vuoi arrivare.
            </p>

            <p class="mt-4 text-gray-500 italic">
              Accesso riservato agli utenti invitati.
            </p>

            <div class="mt-4">
              <p class="text-gray-700 font-medium mb-2">
                Hai un codice di invito?
              </p>
              <a
                href="https://ahead-xp-website.vercel.app"
                target="_blank"
                class="inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Vai al sito
              </a>
            </div>
          </div>
        </section>

        {/* BARWISE */}
        <section class="w-full bg-white shadow-md rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-6 transition hover:shadow-lg">
          <img
            src={barwiseLogo}
            alt="Barwise logo"
            class="w-24 h-24 rounded-xl object-contain border shadow-lg"
          />
          <div class="flex-1 text-center sm:text-left">
            <h2 class="text-2xl font-semibold text-gray-900">Barwise</h2>
            <p class="mt-2 text-gray-600 leading-relaxed">
              Il gestionale per ristoranti e bar pensato da chi lavora per chi
              lavora. Comande veloci, stampe per reparto, scorte automatiche e
              statistiche dettagliate — tutto offline, sicuro e sempre a portata
              di mano. Dalle fasi di preparazione ai pagamenti flessibili,
              Barwise trasforma il caos del servizio in ordine perfetto.
            </p>

				 <p class="mt-4 text-gray-500 italic">
              Accesso riservato agli utenti invitati.
            </p>

            <div class="mt-4">
              <p class="text-gray-700 font-medium mb-2">
                Hai un codice di invito?
              </p>
              <a
                href="https://www.barwise.it"
                target="_blank"
                class="inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Vai al sito
              </a>
            </div>
          </div>
        </section>

		  {/* WISEFLOW */}
<section class="w-full bg-white shadow-md rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-6 transition hover:shadow-lg">
  <img
    src={wiseflowLogo}
    alt="Wiseflow logo"
    class="w-24 h-24 rounded-xl object-contain border shadow-lg"
  />
  <div class="flex-1 text-center sm:text-left">
    <h2 class="text-2xl font-semibold text-gray-900">Wiseflow</h2>
    <p class="mt-2 text-gray-600 leading-relaxed">
      La piattaforma contabile pensata per bar e ristoranti: incassi giornalieri,
      movimenti extra cassa, estratti conto PDF, scadenze, budget e dashboard
      avanzate — tutto in un unico flusso semplice e potente. Monitora cassa,
      conti bancari, margini e storico con una chiarezza mai vista.
    </p>

    <p class="mt-4 text-gray-500 italic">
      Accesso riservato agli utenti invitati.
    </p>

    <div class="mt-4">
      <p class="text-gray-700 font-medium mb-2">
        Hai un codice di invito?
      </p>
      <a
        href="https://wiseflow-xp-site.vercel.app"
        target="_blank"
        class="inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        Vai al sito
      </a>
    </div>
  </div>
</section>

      </main>

      {/* Footer */}
      <footer class="mt-auto py-8 text-gray-400 text-sm">
        © {new Date().getFullYear()} tinycode — Tutti i diritti riservati
      </footer>
    </div>
  )
}

export default Landing
