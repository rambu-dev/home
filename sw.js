if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const u=s=>i(s,r),o={module:{uri:r},exports:t,require:u};e[r]=Promise.all(n.map((s=>o[s]||u(s)))).then((s=>(l(...s),t)))}}define(["./workbox-5ffe50d4"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"app-icon.png",revision:"3d9c9394f7ef1b964c100bc7939e7def"},{url:"assets/App-DoK6gtp6.js",revision:null},{url:"assets/AppWithSidebar-D062Gtyp.css",revision:null},{url:"assets/AppWithSidebar-DYh1X1uv.js",revision:null},{url:"assets/Box-FW5voN0J.js",revision:null},{url:"assets/Button-D6O9f_dT.js",revision:null},{url:"assets/Field-BkTXdWtx.js",revision:null},{url:"assets/index-2EIWBTcX.css",revision:null},{url:"assets/index-BUU1KeWt.css",revision:null},{url:"assets/index-BwhXyXXq.js",revision:null},{url:"assets/index-BwmY8f1S.css",revision:null},{url:"assets/index-BZ0JxhlG.js",revision:null},{url:"assets/index-CRT43MiD.js",revision:null},{url:"assets/index-DNixIoc9.js",revision:null},{url:"assets/index-DoK-WUYp.js",revision:null},{url:"assets/index-Dvt6pn0z.js",revision:null},{url:"assets/index-DXVbenEG.js",revision:null},{url:"assets/Text-CBLuXI6c.js",revision:null},{url:"assets/Typography-BAL_QkKO.js",revision:null},{url:"assets/Typography-DLA2bgAV.css",revision:null},{url:"index.html",revision:"1b6ed68b24a446918f1e4526615398d0"},{url:"manifest.webmanifest",revision:"6301ed7cdd4cb7506022156ac13f9812"},{url:"rb.png",revision:"df07eefa8f7d69ff5eec94a36a69bbbc"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"app-icon.png",revision:"3d9c9394f7ef1b964c100bc7939e7def"},{url:"manifest.webmanifest",revision:"6301ed7cdd4cb7506022156ac13f9812"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
