'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar2 = dynamic(() => import('../components/Navbar2'), {ssr: false, })



export default function ChiSono() {
    useEffect(() => {
      AOS.init({
        duration: 800,
        once: true,
      });
    }, []);
  return (
    <main className="bg-gray-200 text-gray-700">
      <Navbar2 />
      {/* Sezione 1 - Presentazione */}
      <section className="relative z-10 mx-10 2xl:mx-18 mt-48  flex flex-col xl:flex-row items-center ">
        <div className="xl:w-1/2 flex justify-center items-center">
                  <Image
                    src="/img/foto3.png"
                    alt="Avvocato Giuseppe Auletta"
                    width={600}
                    height={500}
                    className=""
                  />
                </div>
          <div className="hidden xl:w-1/2 lg:max-w-5xl  bg-white bg-opacity-80 px-6 py-8 md:px-10 md:py-12 rounded-sm shadow-lg xl:block" data-aos="fade-right" data-aos-delay="300" data-aos-easing="ease-in" data-aos-duration="500">
            <h1 className="text-4xl sm:text-5xl text-center lg:text-left font-semibold text-blue-900 mb-6 font-titolo tracking-wide ">
              Sono Giuseppe Auletta 
            </h1>
            <h1 className="text-2xl sm:text-3xl text-center lg:text-left font-medium text-blue-900 mb-6 font-titolo tracking-wide ">
              Avvocato Civilista a <b>Catania ed Enna</b>, esperto in <b>Diritto del Lavoro, Condominiale e Immobiliare</b>.
            </h1>
            <p className="text-md leading-relaxed mt-4">
              Dal 2011 mi occupo di aiutare persone e famiglie a risolvere problemi concreti che riguardano la casa, il lavoro e la convivenza condominiale. Lo faccio attraverso un approccio chiaro, fondato su trasparenza, metodo e rispetto.
            </p>
            <p className="text-md leading-relaxed mt-4">
              Conosco bene il peso che possono avere certe situazioni: <u>una busta paga mai saldata</u>, <u>un’infiltrazione ignorata da mesi</u>, <u>un licenziamento illegittimo</u>. Sono casi che non si risolvono con le promesse, ma con l’esperienza, la competenza e la capacità di guidare l’assistito nelle scelte più efficaci.
            </p>
            <p className="text-md leading-relaxed mt-4">
              Non tutti i casi vanno portati in Tribunale. Il mio lavoro è anche capire quando conviene agire, e quando invece è preferibile trovare un’alternativa ragionevole, capace di tutelare diritti, equilibri e relazioni.
            </p>
            <p className="text-md leading-relaxed mt-4">
              Il mio approccio parte da un principio semplice: <b>se una causa non ha basi solide, è mio dovere dirlo con chiarezza</b>, anche quando sarebbe più comodo fare il contrario. La fiducia si costruisce evitando false illusioni e offrendo soluzioni sensate, in linea con gli obiettivi dell’assistito.
            </p>
            <p className="text-md leading-relaxed mt-4">
              <b>Credo che il compito di un avvocato non sia alimentare i conflitti, ma risolverli nel modo più efficace e sostenibile per chi si affida a lui</b>. Questo significa ascoltare, valutare, spiegare con onestà, scegliere la strada giusta e percorrerla con determinazione.
            </p>
        </div>

        <div className=" xl:w-1/2 lg:max-w-5xl  bg-white bg-opacity-80 px-6 py-8 md:px-10 md:py-12 rounded-sm shadow-lg xl:hidden" data-aos="fade-up" data-aos-delay="300" data-aos-easing="ease-in" data-aos-duration="500">
            <h1 className="text-4xl sm:text-5xl text-center lg:text-left font-semibold text-blue-900 mb-6 font-titolo tracking-wide ">
              Sono Giuseppe Auletta
            </h1>
            <h1 className="text-2xl sm:text-3xl text-center lg:text-left font-medium text-blue-900 mb-6 font-titolo tracking-wide ">
              Avvocato Civilista a <b>Catania ed Enna</b>, esperto in <b>Diritto del Lavoro, Condominiale e Immobiliare</b>.
            </h1>
            <p className="text-md leading-relaxed mt-4">
              Dal 2011 mi occupo di aiutare persone e famiglie a risolvere problemi concreti che riguardano la casa, il lavoro e la convivenza condominiale. Lo faccio attraverso un approccio chiaro, fondato su trasparenza, metodo e rispetto.
            </p>
            <p className="text-md leading-relaxed mt-4">
              Conosco bene il peso che possono avere certe situazioni: <u>una busta paga mai saldata</u>, <u>un’infiltrazione ignorata da mesi</u>, <u>un licenziamento illegittimo</u>. Sono casi che non si risolvono con le promesse, ma con l’esperienza, la competenza e la capacità di guidare l’assistito nelle scelte più efficaci.
            </p>
            <p className="text-md leading-relaxed mt-4">
              Non tutti i casi vanno portati in Tribunale. Il mio lavoro è anche capire quando conviene agire, e quando invece è preferibile trovare un’alternativa ragionevole, capace di tutelare diritti, equilibri e relazioni.
            </p>
            <p className="text-md leading-relaxed mt-4">
              Il mio approccio parte da un principio semplice: <b>se una causa non ha basi solide, è mio dovere dirlo con chiarezza</b>, anche quando sarebbe più comodo fare il contrario. La fiducia si costruisce evitando false illusioni e offrendo soluzioni sensate, in linea con gli obiettivi dell’assistito.
            </p>
            <p className="text-md leading-relaxed mt-4">
              <b>Credo che il compito di un avvocato non sia alimentare i conflitti, ma risolverli nel modo più efficace e sostenibile per chi si affida a lui</b>. Questo significa ascoltare, valutare, spiegare con onestà, scegliere la strada giusta e percorrerla con determinazione.
            </p>
            
        </div>
      </section>

      {/* Sezione 2 - Background e valori familiari */}
      <section className="relative z-10  mx-10 2xl:mx-18 my-16  flex flex-col-reverse xl:flex-row items-center " >
      <div className="hidden xl:w-1/2 lg:max-w-5xl  bg-white bg-opacity-80 px-6 py-8 md:px-10 md:py-12 rounded-sm shadow-lg xl:block" data-aos="fade-left" data-aos-delay="300" data-aos-easing="ease-in" data-aos-duration="500">
        <h1 className="text-2xl sm:text-3xl text-center lg:text-left font-semibold text-blue-900 mb-6 font-titolo tracking-wide">La mia passione per il diritto nasce da lontano. Non solo per vocazione personale, ma anche per le radici familiari che mi hanno trasmesso questo impegno.</h1>
<p className="text-md leading-relaxed">
          Mio nonno, Giuseppe Giacomo Auletta, è stato uno dei maggiori studiosi di Diritto Commerciale in Italia. Docente universitario, preside di Facoltà, Accademico dei Lincei, è l’autore del manuale “Diritto Commerciale” di Auletta e Saraniti, ancora oggi adottato in molte università italiane.
          </p>
        <p className="text-md leading-relaxed mt-4">
          Mio padre, Tommaso Auletta, è stato professore di Diritto Privato e Diritto di Famiglia all’Università di Catania, autore del manuale di “Diritto di Famiglia” tuttora aggiornato e utilizzato in molti dipartimenti.
        </p>
        <p className="text-md leading-relaxed mt-4">
          Crescendo in questo ambiente, ho imparato che <b>il diritto è prima di tutto una forma di responsabilità</b>: verso le persone, verso le istituzioni e verso sé stessi.
        </p>
        <p className="text-md leading-relaxed mt-4">
          Sono laureato in Giurisprudenza con 110 e lode. Dopo aver superato l’esame di abilitazione alla professione di avvocato, ho conseguito il Dottorato di Ricerca e, nel 2022, l’abilitazione alle difese in Cassazione.
        </p>
        <p className="text-md leading-relaxed mt-4">
          Per diversi anni sono stato cultore di Filosofia del Diritto presso l’Università di Messina e autore di articoli su riviste giuridiche specializzate. Ancora oggi, considero lo studio uno strumento fondamentale per offrire un’assistenza precisa e aggiornata.
        </p>
        <p className="text-md leading-relaxed mt-4">
          In ogni incarico porto con me alcuni principii che considero irrinunciabili:
        </p>
        <p className="text-md leading-relaxed mt-4">
          - <b>Rispetto per le regole</b>, legali, deontologiche e fiscali;
        </p>
        <p className="text-md leading-relaxed mt-4">
          - <b>hiarezza nelle valutazioni</b>, senza tecnicismi inutili;
        </p>
        <p className="text-md leading-relaxed mt-4">
          - <b>Serietà e costanza</b>, perché ogni dettaglio può fare la differenza.
        </p>
        <p className="text-md leading-relaxed mt-4">
          Oggi assisto lavoratori, inquilini, proprietari di immobili e amministratori condominiali che hanno bisogno di risposte chiare e tutela concreta. A loro offro competenza, trasparenza e massima riservatezza, <b>rimanendo al loro fianco in ogni fase della vicenda</b>.
        </p>
        </div>

        <div className="xl:w-1/2 lg:max-w-5xl  bg-white bg-opacity-80 px-6 py-8 md:px-10 md:py-12 rounded-sm shadow-lg xl:hidden" data-aos="fade-up" data-aos-delay="300" data-aos-easing="ease-in" data-aos-duration="500">
        <h1 className="text-2xl sm:text-3xl text-center lg:text-left font-bold text-blue-900 mb-6 font-titolo tracking-wide">La mia passione per il diritto nasce da lontano. Non solo per vocazione personale, ma anche per le radici familiari che mi hanno trasmesso questo impegno.</h1>
        <p className="text-md leading-relaxed">
          Mio nonno, Giuseppe Giacomo Auletta, è stato uno dei maggiori studiosi di Diritto Commerciale in Italia. Docente universitario, preside di Facoltà, Accademico dei Lincei, è l’autore del manuale “Diritto Commerciale” di Auletta e Saraniti, ancora oggi adottato in molte università italiane.
          </p>
        <p className="text-md leading-relaxed mt-4">
          Mio padre, Tommaso Auletta, è stato professore di Diritto Privato e Diritto di Famiglia all’Università di Catania, autore del manuale di “Diritto di Famiglia” tuttora aggiornato e utilizzato in molti dipartimenti.
        </p>
        <p className="text-md leading-relaxed mt-4">
          Crescendo in questo ambiente, ho imparato che <b>il diritto è prima di tutto una forma di responsabilità</b>: verso le persone, verso le istituzioni e verso sé stessi.
        </p>
        <p className="text-md leading-relaxed mt-4">
          Sono laureato in Giurisprudenza con 110 e lode. Dopo aver superato l’esame di abilitazione alla professione di avvocato, ho conseguito il Dottorato di Ricerca e, nel 2022, l’abilitazione alle difese in Cassazione.
        </p>
        <p className="text-md leading-relaxed mt-4">
          Per diversi anni sono stato cultore di Filosofia del Diritto presso l’Università di Messina e autore di articoli su riviste giuridiche specializzate. Ancora oggi, considero lo studio uno strumento fondamentale per offrire un’assistenza precisa e aggiornata.
        </p>
        <p className="text-md leading-relaxed mt-4">
          In ogni incarico porto con me alcuni principii che considero irrinunciabili:
        </p>
        <p className="text-md leading-relaxed mt-4">
          - <b>Rispetto per le regole</b>, legali, deontologiche e fiscali;
        </p>
        <p className="text-md leading-relaxed mt-4">
          - <b>hiarezza nelle valutazioni</b>, senza tecnicismi inutili;
        </p>
        <p className="text-md leading-relaxed mt-4">
          - <b>Serietà e costanza</b>, perché ogni dettaglio può fare la differenza.
        </p>
        <p className="text-md leading-relaxed mt-4">
          Oggi assisto lavoratori, inquilini, proprietari di immobili e amministratori condominiali che hanno bisogno di risposte chiare e tutela concreta. A loro offro competenza, trasparenza e massima riservatezza, <b>rimanendo al loro fianco in ogni fase della vicenda</b>.
        </p>
        </div>
        <div className="xl:w-1/2 flex justify-center items-center">
                  <Image
                    src="/img/foto22.png"
                    alt="Avvocato Giuseppe Auletta"
                    width={600}
                    height={500}
                    className=""
                  />
                </div>
                
      </section>
      <div className="text-center mb-24">
        <h3 className="text-2xl sm:text-3xl font-medium  font-titolo text-blue-950 mx-4 sm:mx-8 my-8">Hai bisogno di un consulto per una tua causa?</h3>
        <button onClick={() => {     
          const phoneNumber = "393283744899";        
          const message = encodeURIComponent("Buongiorno, vorrei contattarla per un mio caso, potrei avere maggiori informazioni?");
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
          window.open(whatsappUrl, "_blank");
        }}className='px-2 lg:px-4 mb-4 py-4 w-fit bg-white rounded-sm shadow border-2 border-blue-900 hover:border-white hover:bg-blue-950 hover:text-white text-blue-900 hover:scale-105 transition ease-in-out duration-400 cursor-pointer'>
            Clicca qui per avere un primo confronto 
        </button>        
      </div>
    </main>
  )
}
