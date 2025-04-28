'use client'

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";




const BlogCarousel = dynamic(() => import('./components/BlogCarousel'), { ssr: true })
const GoogleReviewsCarousel = dynamic(() => import('./components/GoogleReviews'), { ssr: false })
const Navbar = dynamic(() => import('./components/Navbar'), { ssr: false })

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  return (
    <main className="bg-gray-200 scroll-smooth overflow-x-hidden">
      <Navbar />
        <section className="relative bg-black flex flex-col items-center justify-center gap-10 min-h-screen py-20 overflow-hidden ">
          <div
            className="absolute inset-0 bg-center bg-cover lg:bg-fixed brightness-60 "
            style={{ backgroundImage: "url('/img/sfondo-homeb.jpg')" }}
          ></div>

          <div className="relative z-10 p-6 rounded-r-xl mt-20 ">
            <h1 className="font-titolo3 font-medium text-4xl md:text-5xl xl:text-6xl  text-white pl-2 lg:pl-6 uppercase text-center text-shadow-lg/100 text-shadow-black ">
              Studio Legale Auletta Giuseppe
            </h1>
          </div>

          <div className="relative  z-10 p-5 rounded-r-xl max-w-4xl">
            <p className="font-titolo3 text-3xl md:text-4xl xl:text-5xl  pl-2 lg:pl-6 mb-6 text-white text-center text-shadow-lg/100 text-shadow-black">
              Avvocato Civile specializzato in Diritto del Lavoro, Immobili e Condomini a Catania ed Enna
            </p>
          </div>
          <a href="#focus-section" className="z-10 mt-12 lg:mt-24 motion-preset-oscillate motion-duration-1500 scroll-smooth">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 md:w-16 md:h-16 text-white opacity-80 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>

        </section>

        

        <section id="focus-section" className='flex flex-col justify-center items-center gap-8 my-10   px-7 lg:px-32  '>
        <div className='py-8 '>
          <h1 className="font-titolo3 text-3xl md:text-4xl xl:text-5xl font-medium text-blue-900 text-center ">
          Non ho mai creduto nei tuttologi: credo, piuttosto, nell’efficacia di un lavoro focalizzato, studiato, costruito su basi solide. Solo così si può davvero fare la differenza.
          </h1>
        </div>
          <span className='absolute p-22 border-1 translate-y-[140%] -left-15 sm:-translate-y-[20%] sm:-left-15 lg:-translate-y-[35%] lg:-left-15 border-neutral-300 rounded-sm inset-shadow-sm inset-shadow-gray-600  z-0'></span>
          <span className='absolute p-32 border-1 translate-y-[90%] -left-10 sm:translate-y-[35%] sm:-left-10 lg:translate-y-[20%] lg:-left-10 border-neutral-400 rounded-sm z-0'></span>
          <span className='absolute p-23 border-1 translate-y-[120%] left-2 sm:translate-y-[10%] sm:left-2 lg:-translate-y-[20%] lg:left-20 border-neutral-500 rounded-sm inset-shadow-sm inset-shadow-gray-400 z-0'></span>
          <span className='absolute p-22 border-1 -translate-y-[30%] -right-0 sm:-translate-y-[15%] sm:-right-0 lg:-translate-y-[35%] lg:-right-0 border-neutral-300 rounded-sm inset-shadow-sm inset-shadow-gray-400  z-0'></span>
          <span className='absolute p-32 border-1 translate-y-[5%] right-2 sm:translate-y-[20%] sm:right-2 lg:translate-y-[20%] lg:right-10 border-neutral-400 rounded-sm z-0'></span>
          <span className='absolute p-23 border-1 translate-y-[40%] right-4 sm:translate-y-[30%] sm:right-4 lg:-translate-y-[10%] lg:right-20 border-neutral-500 rounded-sm v z-0'></span>
          <p className="text-base xl:text-lg mt-4 text-gray-700 z-20  border-2 border-neutral-600  p-10 bg-gray-200 inset-shadow-sm inset-shadow-gray-400 rounded-sm" >
            Ecco perché decido di specializzarmi nel <b>Diritto del Lavoro</b> e <b>Diritto Immobiliare e Condominiale.</b> <br />
            La mia passione per il <b>Diritto del Lavoro</b> nasce dal desiderio di proteggere chi si sente <b>indifeso ed offeso</b> di fronte ad un datore di lavoro che <u>non ascolta le esigenze dei suoi dipendenti</u> o a situazioni ingiuste. Ogni lavoratore merita di far valere i propri diritti, e per questo mi impegno con uno studio rigoroso e una profonda attenzione alle esigenze concrete di chi cerca una difesa solida e personalizzata. <br /><br />Mi sono dedicato anche al <b>Diritto Immobiliare</b>, con un’attenzione particolare al <b>Condominio</b>, perché credo che la casa e gli spazi comuni siano un cardine della serenità quotidiana. Quando <u>insorgono infiltrazioni, liti tra vicini o incomprensioni sulle spese,</u> il <b>rischio di tensioni gravi è alto.</b> Per questo, mi impegno a prevenire e risolvere queste situazioni in modo mirato, restituendo serenità e certezze a chi vive o investe in un immobile.
          </p>
          <h3 className="text-3xl text-center font-medium font-titolo text-blue-950 my-8">Hai bisogno di un consulto per una tua pratica?</h3>
          <button onClick={() => {     
          const phoneNumber = "393283744899";        
          const message = encodeURIComponent("Ciao, vorrei richiedere una consulenza. Potrei avere maggiori informazioni?");
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
          window.open(whatsappUrl, "_blank");
        }} className='px-2 lg:px-4 py-4 w-fit bg-white rounded-sm shadow border-2 border-blue-900 hover:border-white hover:bg-blue-950 hover:text-white text-blue-900 hover:scale-105 transition ease-in-out duration-400 cursor-pointer'>
            Scrivimi su WhatsApp per un primo confronto
          </button>
        </section>


      

      {/* Chi Sono Preview */}
      <section className="my-12 py-16 px-6 xl:max-w-screen-2xl mx-auto flex flex-col lg:flex-row lg:items-stretch justify-center items-center    " >

        <div className="lg:w-1/2 h-full  flex justify-center items-center">
          <Image
            src="/img/foto3.png"
            alt="Avvocato Giuseppe Auletta"
            width={600}
            height={100}
            className=" object-cover h-full w-auto"

          />
        </div>
        <div className="hidden lg:w-1/2 text-left bg-white p-8 rounded-sm shadow-md lg:flex flex-col justify-between " data-aos="fade-right" data-aos-delay="300" data-aos-easing="ease-in" data-aos-duration="500" >
          <h2 className="font-titolo2 text-center lg:text-left text-3xl lg:text-4xl font-semibold text-blue-900 my-4">Io sono Giuseppe Auletta</h2>
          <p className="text-gray-700 mb-6 ">
            Avvocato civile specializzato in <b>Diritto del Lavoro, Immobili e Condomini a Catania ed Enna.</b> <br /><br />
            Dal 2011, all’età di 28 anni, ho intrapreso ufficialmente la mia carriera da Avvocato Civilista. Nel 2022 ho conseguito anche l’abilitazione alle difese in Cassazione. <br /><br />
            La mia passione per il diritto è nata al liceo: da rappresentante d’istituto, capii che conoscere le regole significava poterle usare per risolvere problemi reali e migliorare la vita degli altri. <br /><br />Oggi rappresento <b>lavoratori, inquilini e affittuari</b> per assicurare il rispetto dei loro diritti, offrendo un supporto mirato e trasparente che tuteli la loro stabilità e serenità quotidiana. <br /><br />Per me, la trasparenza avvocato-assistito non è uno slogan: se una causa non ha basi solide, lo dico subito. Anche se significa mettere da parte il mio interesse personale. Preferisco trovare alternative efficienti, e non offrire false speranze. <br /><br />La mia formazione è il frutto di passione e rigore, che mi hanno portato a laurearmi con 110 e lode. Con quello stesso spirito affronto ogni incarico, <b>per aiutare le persone a risolvere problemi reali e a riprendersi ciò che è giusto.</b><br /><br />Dopo l’abilitazione professionale… 
          </p>
          <div className='flex flex-row justify-between '>
          <Link href="/chi-sono" className="text-blue-900 font-medium hover:underline text-xs md:text-sm">Scopri chi sono →</Link>
          <button onClick={() => {     
          const phoneNumber = "393283744899";        
          const message = encodeURIComponent("Ciao, vorrei richiedere una consulenza. Potrei avere maggiori informazioni?");
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
          window.open(whatsappUrl, "_blank");
        }} className='px-2 py-2 lg:px-4 lg:py-4 w-fit bg-white rounded-sm shadow border-2 border-blue-900 hover:border-white hover:bg-blue-950 hover:text-white text-blue-900 hover:scale-105 transition ease-in-out duration-400 cursor-pointer '>Richiedi consulenza</button>
          </div>
        </div>

        <div className=" lg:w-1/2 text-left bg-white p-8 rounded-sm shadow-md flex flex-col justify-between lg:hidden " data-aos="fade-up" data-aos-delay="300" data-aos-easing="ease-in" data-aos-duration="500" >
          <h2 className="font-titolo2 text-center lg:text-left text-3xl lg:text-4xl font-semibold text-blue-900 my-4">Io sono Giuseppe Auletta</h2>
          <p className="text-gray-700 mb-6 ">
            Avvocato civile specializzato in <b>Diritto del Lavoro, Immobili e Condomini a Catania ed Enna.</b> <br /><br />
            Dal 2011, all’età di 28 anni, ho intrapreso ufficialmente la mia carriera da Avvocato Civilista. Nel 2022 ho conseguito anche l’abilitazione alle difese in Cassazione. <br /><br />
            La mia passione per il diritto è nata al liceo: da rappresentante d’istituto, capii che conoscere le regole significava poterle usare per risolvere problemi reali e migliorare la vita degli altri. <br /><br />Oggi rappresento <b>lavoratori, inquilini e affittuari</b> per assicurare il rispetto dei loro diritti, offrendo un supporto mirato e trasparente che tuteli la loro stabilità e serenità quotidiana. <br /><br />Per me, la trasparenza avvocato-assistito non è uno slogan: se una causa non ha basi solide, lo dico subito. Anche se significa mettere da parte il mio interesse personale. Preferisco trovare alternative efficienti, e non offrire false speranze. <br /><br />La mia formazione è il frutto di passione e rigore, che mi hanno portato a laurearmi con 110 e lode. Con quello stesso spirito affronto ogni incarico, <b>per aiutare le persone a risolvere problemi reali e a riprendersi ciò che è giusto.</b><br /><br />Dopo l’abilitazione professionale… 
          </p>
          <div className='flex flex-row justify-between '>
          <Link href="/chi-sono" className="text-blue-900 font-medium hover:underline text-xs md:text-sm">Scopri chi sono →</Link>
          <button onClick={() => {     
          const phoneNumber = "393283744899";        
          const message = encodeURIComponent("Ciao, vorrei richiedere una consulenza. Potrei avere maggiori informazioni?");
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
          window.open(whatsappUrl, "_blank");
        }} className='px-2 py-2 lg:px-4 lg:py-4 w-fit bg-white rounded-sm shadow border-2 border-blue-900 hover:border-white hover:bg-blue-950 hover:text-white text-blue-900 hover:scale-105 transition ease-in-out duration-400 cursor-pointer '>Richiedi consulenza</button>
          </div>
        </div>
      </section>


            <section>
              <GoogleReviewsCarousel
              placeId="ChIJbZmQQMr9ExMRQoKwqfklKGg"
              apiKey="AIzaSyCh2ZxYFQxijQjvctYWcAr3Kk10kxhDOns"
              /> 
            </section>
      
      

      {/* Servizi Preview */}
      <section className="py-16 px-6 max-w-screen-2xl mx-auto my-12">
        <h2 className="font-titolo2 text-4xl font-semibold text-blue-900 mb-14 text-center">I miei servizi</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="bg-white p-8 rounded-sm shadow-md text-center" data-aos="fade-right" data-aos-delay="600" data-aos-easing="ease-in" data-aos-duration="500" >
            <h3 className="font-titolo2 text-3xl font-semibold text-blue-950 mb-8" >Immobiliare e Condominiale</h3>
            <p className="text-gray-700 text-md">Può capitare di affrontare tensioni nel condominio: <b>infiltrazioni, divisioni delle spese, vicini rumorosi o inadempienti.</b> <br /><br /> Spesso, questi problemi si trascinano a lungo, generando <u>stress e incertezza</u> sia per i proprietari di immobili sia per gli amministratori condominiali, che devono gestire situazioni complesse, e per gli inquilini, che subiscono disagi. <br /><br />L’obiettivo comune è vivere in un ambiente sereno, dove regole chiare e rispetto reciproco <b>trasformano la casa in un autentico luogo di tranquillità.</b></p>
          </div>
          <div className="bg-white p-8 rounded-sm shadow-md text-center" data-aos="fade-up" data-aos-delay="600" data-aos-easing="ease-in" data-aos-duration="500">
            <h3 className="font-titolo2 text-3xl font-semibold text-blue-950 mb-8">Lavoro</h3>
            <p className="text-gray-700 text-md">Un <b>licenziamento inaspettato, un provvedimento disciplinare infondato o retribuzioni mancanti</b> possono mettere in crisi la tua stabilità e creare forti tensioni con il datore di lavoro. <br /><br />La priorità è <u>difendere i tuoi diritti e riprendere il controllo della situazione.</u> <br /> <br />In questi frangenti, ciò che desideri davvero è un ambiente di lavoro stabile e il riconoscimento dei tuoi diritti senza più compromessi o tensioni. Con il giusto supporto legale puoi tornare a concentrarti sul tuo futuro professionale, intraprendendo le azioni necessarie per <b>proteggere ciò che ti spetta e lasciandoti alle spalle l’incertezza.</b></p>
          </div>
          <div className="bg-white p-8 rounded-sm shadow-md text-center" data-aos="fade-left" data-aos-delay="600" data-aos-easing="ease-in" data-aos-duration="500">
            <h3 className="font-titolo2 text-3xl font-semibold text-blue-950 mb-8">Contratti</h3>
            <p className="text-gray-700 text-md">Stipulare un contratto poco chiaro o con <b>clausole sfavorevoli può esporre a rischi di contenzioso, penali inattese o perdite economiche significative.</b> <br /><br />Troppi, purtroppo, se ne accorgono solo quando è ormai troppo tardi, rimanendo <u>imbrigliati in impegni dannosi.</u> <br /><br />Il traguardo ideale è un accordo solido, dove ogni diritto e dovere sia definito con trasparenza e tuteli le parti da future controversie. Il mio compito è guidarti nella redazione, revisione o negoziazione di contratti che proteggano pienamente i tuoi interessi, evitando spiacevoli sorprese e <b>salvaguardando il tuo investimento di tempo e risorse.</b></p>
          </div>
        </div>
        <div className="text-center mt-16">
        <h3 className="text-3xl font-medium font-titolo text-blue-950 my-8">Hai bisogno di un consulto per una tua causa?</h3>
        <button onClick={() => {     
          const phoneNumber = "393283744899";        
          const message = encodeURIComponent("Ciao, vorrei richiedere una consulenza. Potrei avere maggiori informazioni?");
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
          window.open(whatsappUrl, "_blank");
        }} className='px-2 lg:px-4 py-4 w-fit bg-white rounded-sm shadow border-2 border-blue-900 hover:border-white hover:bg-blue-950 hover:text-white text-blue-900 hover:scale-105 transition ease-in-out duration-400 cursor-pointer'>Scrivimi su WhatsApp per un primo confronto</button>
        </div>
      </section>

      {/* Blog Carousel Preview */}
      <section>
        <BlogCarousel />
      </section>

      <section className="py-16 px-6 bg-gray-200">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-screen-xl mx-auto">
    {/* Sede Catania */}
    <div className="w-full">
      <h2 className="font-titolo2 text-4xl font-semibold text-blue-900 mb-6 text-center">Sede Catania</h2>
      <div className="w-full h-[400px] shadow-lg rounded-sn overflow-hidden border-2 border-blue-950 hover:border-blue-700 hover:scale-105 transition ease-in-out duration-300 cursor-pointer">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2066.76035589713!2d15.0500534!3d37.5067681!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1313fdca4090996d%3A0x682825f9a9b08242!2sAvv.%20Giuseppe%20Auletta%20-%20Studio%20Legale!5e1!3m2!1sit!2sit!4v1744749043207!5m2!1sit!2sit"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>

    {/* Sede Enna */}
    <div className="w-full">
      <h2 className="font-titolo2 text-4xl font-semibold text-blue-900 mb-6 text-center">Sede Enna</h2>
      <div className="w-full h-[400px] shadow-lg rounded-sm overflow-hidden border-2 border-blue-950  hover:border-blue-700 hover:scale-105 transition ease-in-out duration-300 cursor-pointer">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d730.1503686521025!2d14.271258881986089!3d37.56391764081368!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1310d88ebbfd2bc9%3A0x1fbf4f3460e73481!2sViale%20Armando%20Diaz%2C%2010%2C%2094100%20Enna%20EN!5e1!3m2!1sit!2sit!4v1744749355840!5m2!1sit!2sit"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
</section>



    </main>
  )
}
