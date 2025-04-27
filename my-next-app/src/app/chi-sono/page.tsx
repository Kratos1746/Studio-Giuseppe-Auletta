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
        <div className="lg:w-1/2 flex justify-center items-center">
                  <Image
                    src="/img/foto3.png"
                    alt="Avvocato Giuseppe Auletta"
                    width={600}
                    height={500}
                    className=""
                  />
                </div>
          <div className="xl:w-1/2 lg:max-w-5xl  bg-white bg-opacity-80 p-6 md:p-10 rounded-sm shadow-lg" data-aos="fade-right" data-aos-delay="300" data-aos-easing="ease-in" data-aos-duration="500">
            <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-6 font-titolo tracking-wide ">
              Sono Giuseppe Auletta
            </h1>
            <p className="text-md leading-relaxed">
              Avvocato civile specializzato in <b>Diritto del Lavoro, Immobili e Condomini a Catania ed Enna.</b>
            </p>
            <p className="text-md leading-relaxed mt-4">
              Dal 2011, all’età di 28 anni, ho intrapreso ufficialmente la mia carriera da Avvocato Civilista. Nel 2022 ho conseguito anche l’abilitazione alle difese in Cassazione.
            </p>
            <p className="text-md leading-relaxed mt-4">
              Fin dall’adolescenza ho dedicato la mia vita allo studio dei diritti e delle regole, scoprendo come il diritto possa produrre risultati sorprendenti: l’ho provato in prima persona quando, da rappresentante d’istituto al liceo, riuscivo ad ottenere soluzioni vantaggiose per il bene degli studenti.
            </p>
            <p className="text-md leading-relaxed mt-4">
              Oggi rappresento <b>lavoratori, inquilini e affittuari</b> per assicurare il rispetto dei loro diritti, offrendo un supporto mirato e trasparente che tuteli la loro stabilità e serenità quotidiana.
            </p>
            <p className="text-md leading-relaxed mt-4">
              Ritengo che la trasparenza e la fiducia reciproca avvocato-assistito siano il binomio ideale per affrontare una causa con efficacia. Mi prendo sempre cura degli interessi di chi si affida al mio studio; per questo, se ritengo che le probabilità di successo siano basse, preferisco sconsigliare l’azione legale e trovare un’alternativa, anche se ciò significa rinunciare all’incarico (ed andare contro i miei stessi interessi).
            </p>
            <p className="text-md leading-relaxed mt-4">
              Credo nel duro lavoro e nell’etica, valori che mi hanno permesso di laurearmi con il massimo dei voti (100/100 e lode). Con la stessa dedizione, rappresento i miei assistiti, aiutandoli a ottenere il massimo dalla loro causa e a far prevalere i propri diritti, ritrovando la serenità e la giustizia che stanno cercando.
            </p>
            <p className="text-md leading-relaxed mt-4">
              Dopo l’abilitazione professionale, a 30 anni ho conseguito il Dottorato di Ricerca. Per alcuni anni ho ricoperto il ruolo di cultore di Filosofia del Diritto all’Università di Messina e pubblicato diversi contributi su riviste scientifiche di settore.
            </p>
        </div>
      </section>

      {/* Sezione 2 - Background e valori familiari */}
      <section className="relative z-10  mx-10 2xl:mx-18 my-16  flex flex-col-reverse xl:flex-row items-center " >
      <div className="xl:w-1/2 lg:max-w-5xl  bg-white bg-opacity-80 p-6 md:p-10 rounded-sm shadow-lg" data-aos="fade-left" data-aos-delay="300" data-aos-easing="ease-in" data-aos-duration="500">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6 font-titolo tracking-wide">Una famiglia a servizio dei Diritti e della Giustizia</h1>
        <p className="text-md leading-relaxed">
          Mio nonno, Giuseppe Giacomo Auletta, è stato uno studioso di Diritto Commerciale di fama mondiale, docente e Preside della Facoltà di Giurisprudenza di Catania, Accademico dei Lincei, Commendatore, oggi dedicatario di una via a Catania proprio nella zona del Dipartimento di Giurisprudenza e reso famoso tra gli studenti di Giurisprudenza anche dal <b>Manuale di Diritto Commerciale Auletta – Salanitro, tuttora in uso in molti Dipartimenti di Giurisprudenza ed Economia in tutta Italia.</b>
        </p>
        <p className="text-md leading-relaxed mt-4">
          Mio padre, Tommaso Auletta, è un noto studioso di diritto di famiglia, già docente di Diritto Privato e Diritto di Famiglia nel Dipartimento di Giurisprudenza di Catania e noto anche perché <b>autore di un Manuale di Diritto di Famiglia tuttora aggiornato e in uso.</b>
        </p>
        <p className="text-md leading-relaxed mt-4">
          La mia passione per il diritto risale ai tempi del Liceo. Ho frequentato il Liceo Classico “Cutelli” e lì, fin dai primi anni, ho partecipato attivamente alla vita politica e culturale della scuola come rappresentante d’Istituto. Fin da quegli anni avevo un carattere combattivo e un profondo senso di giustizia, e mi accorsi che, per ottenere risultati con le istituzioni scolastiche (Preside, insegnanti, ecc.), la chiave era conoscere leggi e regolamenti e usarli strategicamente a sostegno dei propri obiettivi. Insomma, capii che con il diritto si potevano fare <i>“miracoli”</i>.
        </p>
        <p className="text-md leading-relaxed mt-4">
          Nella vita, e nella professione, ho sempre coltivato il senso critico, lo studio, l’attenzione ai dettagli, la competenza, la correttezza nei rapporti professionali e, soprattutto, l’indipendenza e l’imparzialità di giudizio, ossia l’attitudine a non far influenzare le mie valutazioni tecnico-giuridiche da parentele, amicizie o appartenenze di qualsiasi natura, <b>rimanendo vicino all’assistito</b>, ma tuttavia oggettivo nelle considerazioni e nei suggerimenti, nonché rispettoso delle regole legali, deontologiche e perfino fiscali.
        </p>
        <p className="text-md leading-relaxed mt-4">
          Credo che le persone, soprattutto i clienti, meritino sempre verità e massima trasparenza. Il rapporto tra avvocato e assistito si fonda sulla fiducia e, tradirla, significa minare il principio cardine della professione e la sua rispettabilità. Sono del parere che i risultati più belli nascano non dalle scorciatoie o dai compromessi disonorevoli, ma da un lavoro quotidiano svolto con <b>serietà, costanza e passione</b>. È così che si accresce e si preserva, innanzitutto, la stima in se stessi, e di conseguenza anche il rispetto degli altri.
        </p>
        <p className="text-md leading-relaxed mt-4">
          Oggi, seguendo questi valori, rappresento <b>lavoratori, inquilini e affittuari</b> per assicurare il rispetto dei loro diritti, offrendo un supporto mirato e trasparente che tuteli la loro stabilità e serenità quotidiana.
        </p>
        </div>
        <div className="lg:w-1/2 flex justify-center items-center">
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
        <h3 className="text-3xl font-medium  font-titolo text-blue-950 my-8">Hai bisogno di un consulto per una tua causa?</h3>
        <button onClick={() => {     
          const phoneNumber = "393283744899";        
          const message = encodeURIComponent("Ciao, vorrei richiedere una consulenza. Potrei avere maggiori informazioni?");
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
          window.open(whatsappUrl, "_blank");
        }}className='px-4 mb-4 py-4 w-fit bg-white rounded-sm shadow border-2 border-blue-900 hover:border-white hover:bg-blue-950 hover:text-white text-blue-900 hover:scale-105 transition ease-in-out duration-400 cursor-pointer'>
            Scrivimi su WhatsApp per un primo confronto
        </button>        
      </div>
    </main>
  )
}
