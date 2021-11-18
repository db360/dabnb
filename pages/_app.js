import Router from 'next/router';

import 'tailwindcss/tailwind.css'
import '../styles/global.css'

//Loading progress bar
import ProgressBar from "@badrap/bar-of-progress";

//iniciamos la constante de la progress bar con las opciones
const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100,
});

//Evento cuando se hace push al router, el progressbar starts
Router.events.on('routeChangeStart', progress.start);
//Evento que para la progressBar cuando se termina la ruta
Router.events.on('routeChangeComplete', progress.finish);
//Si hay un error se para la progressBAR
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
