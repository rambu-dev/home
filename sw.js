if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,r)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let u={};const t=s=>i(s,l),o={module:{uri:l},exports:u,require:t};e[l]=Promise.all(n.map((s=>o[s]||t(s)))).then((s=>(r(...s),u)))}}define(["./workbox-5ffe50d4"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"app-icon.png",revision:"3d9c9394f7ef1b964c100bc7939e7def"},{url:"assets/App-BdrsDSLw.js",revision:null},{url:"assets/AppWithSidebar-BhK-CTpq.js",revision:null},{url:"assets/AppWithSidebar-D062Gtyp.css",revision:null},{url:"assets/Box-D22iGtDX.js",revision:null},{url:"assets/Button-CBUp0unI.js",revision:null},{url:"assets/Field-BIuFB-Cj.js",revision:null},{url:"assets/index-Bc6838lQ.css",revision:null},{url:"assets/index-BDV95ASY.js",revision:null},{url:"assets/index-BUU1KeWt.css",revision:null},{url:"assets/index-BWCETkv6.js",revision:null},{url:"assets/index-BwmY8f1S.css",revision:null},{url:"assets/index-Cf-Lsv-S.js",revision:null},{url:"assets/index-DdOUYEQQ.js",revision:null},{url:"assets/index-DlgusgnH.js",revision:null},{url:"assets/index-DTurbLw8.js",revision:null},{url:"assets/index-DZWE9eGv.js",revision:null},{url:"assets/Text-xYY1pVUF.js",revision:null},{url:"assets/Typography-DEV_7Uay.js",revision:null},{url:"assets/Typography-DLA2bgAV.css",revision:null},{url:"index.html",revision:"12bec398cf29f4613c4780cf651d97a5"},{url:"manifest.webmanifest",revision:"6301ed7cdd4cb7506022156ac13f9812"},{url:"rb.png",revision:"df07eefa8f7d69ff5eec94a36a69bbbc"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"app-icon.png",revision:"3d9c9394f7ef1b964c100bc7939e7def"},{url:"manifest.webmanifest",revision:"6301ed7cdd4cb7506022156ac13f9812"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
