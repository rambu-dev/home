import{r as t,j as e,P as x,B as h,T as f,y as p}from"./index-Dj_nvbqK.js";const w=a=>{const{title:r,className:c="",children:d,show:i=!1,onClose:n}=a,l=t.useRef(null),o=t.useCallback(()=>{typeof n=="function"&&n()},[n]),m=s=>{l.current&&!l.current.contains(s.target)&&o()};return t.useEffect(()=>{const s=u=>{u.key==="Escape"&&o()};return window.document.addEventListener("keydown",s),()=>{window.document.removeEventListener("keydown",s)}},[o]),i?e.jsx(x,{children:e.jsx("div",{onClick:m,className:"modal z-[calc(var(--elevation-overlay)+1)] fixed left-0 top-0 w-screen h-screen backdrop-filter-[brightness(0.3)] p-2 flex items-center",children:e.jsxs(h,{ref:l,className:`group/modal-content relative rounded-xs w-full h-full max-w-[600px] mx-auto md:max-h-[70vh] ${c}`,children:[e.jsxs("header",{className:"relative modal-header w-full",children:[!!r&&e.jsx(f,{level:"h5",children:r}),e.jsx("span",{className:"group-hover/modal-content:block hidden absolute roundex-sm hover:bg-box-light text-xs right-0 top-0  p-2 cursor-pointer",children:e.jsx(p,{onClick:o})})]}),d]})})}):null};export{w as M};
