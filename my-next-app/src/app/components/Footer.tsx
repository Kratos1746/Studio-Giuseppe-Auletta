'use client'

import { useState, useEffect } from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

export default function Footer() {
  const [showInformativaModal, setShowInformativaModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  const toggleInformativaModal = () => setShowInformativaModal(!showInformativaModal);
  const togglePrivacyModal = () => setShowPrivacyModal(!showPrivacyModal);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setShowCookieBanner(false);
  };

  const resetCookieConsent = () => {
    localStorage.removeItem('cookiesAccepted');
    setShowCookieBanner(true);
  };

  useEffect(() => {
    const consent = localStorage.getItem('cookiesAccepted');
    if (consent === null) {
      setShowCookieBanner(true);
    }
  }, []);

  return (
    <>
      <footer className="bg-neutral-900 text-gray-300 py-8 relative">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-start">
            {/* Colonna Contatti */}
            <div className="md:text-center">
              <h3 className="text-lg font-semibold mb-4">Contatti</h3>
              <p className="mb-2">
                <span className="font-semibold">Email:</span> <a href="mailto:avv.giuseppeauletta@gmail.com" className="hover:text-blue-900">avv.giuseppeauletta@gmail.com</a>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Telefono:</span> <a href="tel:+393283744899" className="hover:text-blue-900">3283744899</a>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Studio Catania:</span>
                <a href="https://maps.app.goo.gl/Mt3WzonRRDDQUdNQ8" target="_blank" className="hover:text-blue-900"> Via Vito Marino 5</a>.
              </p>
              <p className="mb-2">
                <span className="font-semibold">Studio Enna:</span>
                <a href="https://maps.app.goo.gl/fzh2ZCgVfyfN7GpAA" target="_blank" className="hover:text-blue-900"> Viale Armando Diaz 10/b</a>.
              </p>
            </div>

            {/* Colonna Social Media */}
            <div className="md:text-center">
              <h3 className="text-lg font-semibold mb-4">Seguimi</h3>
              <ul className="space-y-2">
                <li className="flex justify-start md:justify-center items-center">
                  <FaFacebookF className="text-gray-300 mr-2 hover:text-blue-900" />
                  <a href="https://www.facebook.com/profile.php?id=100073113690317" target="_blank" className="text-gray-300 hover:text-blue-900">Facebook</a>
                </li>
                <li className="flex justify-start md:justify-center items-center">
                  <FaLinkedinIn className="text-gray-300 mr-2 hover:text-blue-900" />
                  <a href="https://www.linkedin.com/in/giuseppe-auletta-972556343/" target="_blank" className="text-gray-300 hover:text-blue-900">LinkedIn</a>
                </li>
                <li className="flex justify-start md:justify-center items-center">
                  <FaInstagram className="text-gray-300 mr-2 hover:text-blue-900" />
                  <a href="https://www.instagram.com/avv.giuseppeauletta/" target="_blank" className="text-gray-300 hover:text-blue-900">Instagram</a>
                </li>
              </ul>
            </div>

            {/* Colonna Privacy */}
            <div className="md:text-center">
              <h3 className="text-lg font-semibold mb-4">Privacy</h3>
              <p className="mb-2">
                <button onClick={togglePrivacyModal} className="hover:text-blue-900">Privacy Policy</button>
              </p>
              <p className="mb-2">
                <button onClick={toggleInformativaModal} className="hover:text-blue-900">Informativa</button>
              </p>
              <p className="mt-2">
                <button onClick={resetCookieConsent} className=" hover:text-blue-900">
                  Cookie Policy
                </button>
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8">
            <h3 className="text-sm font-semibold mb-2">Copyright</h3>
            <p className="text-xs">&copy; 2018 Avv. Giuseppe Auletta. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>

      {/* Modale Informativa */}
      <AnimatePresence>
        {showInformativaModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white text-gray-800 p-6 mx-2 rounded-sm max-w-lg w-full relative shadow-lg"
            >
              <button onClick={toggleInformativaModal} className="absolute top-3 right-3 text-gray-500 hover:text-black">
                <FaTimes size={20} />
              </button>
              <h2 className="text-xl font-bold mb-4 text-center">INFORMATIVA</h2>
              <div className="text-sm space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <p>
                  Ai sensi dell’art. 35 del Codice deontologico forense, lo Studio informa tutti gli utenti del sito del fatto che l’avvocato svolge un’attività intellettuale di elevata complessità, la cui prestazione implica, nella generalità dei casi, l’adozione di scelte caratterizzate da ampia discrezionalità tecnica, da assumersi sempre avendo di mira l’interesse della parte assistita, il quale va perseguito nei limiti stabiliti dalle norme vigenti e dalla deontologia forense.
                </p>
                <p>
                  Da ciò deriva che, in generale, l’avvocato adempie alle obbligazioni assunte verso il cliente ogni qual volta esegua gli incarichi affidatigli con la diligenza del buon professionista (art. 1176 co. 2 codice civile), non potendosi attribuire alla responsabilità dell’avvocato diligente l’eventuale mancato raggiungimento dei risultati vantaggiosi avuti di mira dal cliente, che pure il nostro Studio si impegna sempre al massimo per conseguire, nei limiti della normativa vigente, della deontologia e dell’Etica. Infatti, va ricordato che, in linea di principio, il conseguimento di questi risultati dipende anche da una serie di fattori che sfuggono al controllo del professionista forense.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modale Privacy */}
      <AnimatePresence>
        {showPrivacyModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white text-gray-800 p-6 mx-2 rounded-sm max-w-lg w-full relative shadow-lg"
            >
              <button onClick={togglePrivacyModal} className="absolute top-3 right-3 text-gray-500 hover:text-black">
                <FaTimes size={20} />
              </button>
              <h2 className="text-xl font-bold mb-4 text-center">Privacy Policy</h2>
              <div className="text-sm space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <p>
                  La presente Privacy Policy descrive come raccogliamo e utilizziamo i dati personali in conformità al GDPR e alla normativa italiana vigente.
                </p>
                <p>
                  I dati sono trattati per erogare servizi, adempiere a obblighi legali e inviare comunicazioni informative. I dati non vengono ceduti a terzi senza consenso.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Banner Cookie */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-4 left-4 right-4 bg-neutral-800 text-gray-100 p-6 rounded-xl shadow-lg z-50 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <p className="text-center text-sm">
              Questo sito utilizza cookie tecnici e, previo consenso, cookie di profilazione. Accettando consenti l'uso di tutti i cookie.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={acceptCookies}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs transition"
              >
                Accetta
              </button>
              <button
                onClick={rejectCookies}
                className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-full text-xs transition"
              >
                Rifiuta
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
