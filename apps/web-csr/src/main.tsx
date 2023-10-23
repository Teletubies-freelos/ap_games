/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-var */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { isMSWOn } from './config/worker.ts'

if(import.meta.env.DEV && isMSWOn){
  const { worker } = await import('../../mockers/src/browser.ts')

  await worker.start({
    waitUntilReady: true
  });
}

if(!import.meta.env.DEV){      
  //@ts-ignore
  !(function () {
    var t,
      o,
      c,
      e = window,
      n = document,
      r = arguments,
      a = "script",
      i = [
        "call",
        "cancelAction",
        "config",
        "identify",
        "push",
        "track",
        "trackClick",
        "trackForm",
        "update",
        "visit",
      ],
      s = function () {
        var t,
          //@ts-ignore
          o = this,
          //@ts-ignore
          c = function (t) {
            o[t] = function () {
              return (
                o._e.push(
                  [t].concat(Array.prototype.slice.call(arguments, 0))
                ),
                o
              );
            };
          };
        for (o._e = [], t = 0; t < i.length; t++) c(i[t]);
      };
    //@ts-ignore
    for (e.__woo = e.__woo || {}, t = 0; t < r.length; t++)
      //@ts-ignore
      e.__woo[r[t]] = e[r[t]] = e[r[t]] || new s();
    //@ts-ignore
    ((o = n.createElement(a)).async = 1),
      //@ts-ignore
      (o.src = "https://static.woopra.com/js/w.js"),
       //@ts-ignore
      (c = n.getElementsByTagName(a)[0]).parentNode.insertBefore(o, c);
   //@ts-ignore
  })("woopra");

  //@ts-ignore
  woopra.config({
    domain: import.meta.env.VITE_WOOPRA_DOMAIN,
    outgoing_tracking: true,
    download_tracking: true,
    click_tracking: true,
  });

  //@ts-ignore
  woopra.track();

}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
