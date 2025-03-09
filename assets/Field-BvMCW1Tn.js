import{r as a,j as t,t as J,o as K}from"./index-D8V0tws4.js";const P=F=>{var O;const{className:E="",disabled:L=!1,defaultValue:j="",value:r,name:$,id:R,placeholder:p="",label:m,type:x="text",description:v,tooltip:T,onSuccess:y,validate:N,options:h=[],multiple:o=!1,allowFiler:H=!1,autoComplete:V,showDefaultSelectLabel:D=!0,onSelect:C,after:k,short:q=!1}=F,i=a.useRef(null),c=a.useRef(null),[b,_]=a.useState(""),[S,z]=a.useState(q),[l,f]=a.useState(!o&&j?j:[]),[g,d]=a.useState(!1),A=e=>{const s=e.target.value;typeof N=="function"&&!N(s)||(typeof y=="function"&&y(s),r===void 0&&f(s))},B=e=>{c.current&&clearTimeout(c.current),c.current=setTimeout(()=>{c.current=null,_(e.target.value.trim().toLowerCase())},300)},G=(e,s)=>{typeof C=="function"&&C(e,s),r===void 0&&f(u=>{let n;return o?(n=[],u&&(typeof u=="string"?n.push(u):n=[...u]),n.indexOf(e)>=0?n=n.filter(I=>I!=e):n.push(e)):n=e,n}),o||d(!1)};a.useEffect(()=>{r!==void 0&&r!==l&&f(r)},[r,l]),a.useEffect(()=>{const e=s=>{!o||!i.current||s.target!==i.current&&!i.current.contains(s.target)&&d(!1)};return window.document.addEventListener("click",e),()=>{window.document.removeEventListener("click",e)}},[o]);const w=x==="select"?"hidden":x;return t.jsxs("div",{ref:i,className:`form-field flex flex-wrap items-start mb-2 ${E}`,children:[!!m&&t.jsx("label",{className:"min-w-[10ch] font-light mr-2 py-[4px]",children:m}),t.jsxs("div",{className:"form-field-input relative flex flex-col grow",children:[t.jsxs("span",{className:`${w==="hidden"?"":"border border-base-line rounded-sm flex justify-end"}`,children:[t.jsx("input",{autoComplete:V,id:R,value:l,placeholder:p||m,disabled:L,onChange:A,className:`grow outline-none py-[4px] placeholder:italic leading-[1.618em] transition-[width] px-2 ${S?"w-0 !px-0":"w-1/2"}`,type:w,name:$,title:T}),!!k&&w!=="hidden"&&t.jsx("span",{onClick:()=>z(!S),className:"text-xs self-stretch aspect-square flex items-center justify-center px-[1em] cursor-pointer",children:k})]}),x==="select"&&t.jsxs(t.Fragment,{children:[t.jsxs("span",{onClick:()=>d(!g),className:"form-field--options-label cursor-pointer w-full break-all overflow-hidden text-ellipsis py-1 px-2 text-center border border-base-line hover:bg-box-medium rounded-sm flex items-center leading-[1.618em]",children:[t.jsx("span",{className:"inline-block min-h-[1.618em]",children:l?typeof l=="string"?(O=h.filter(e=>e.value===l))==null?void 0:O[0].label:h.filter(e=>l.indexOf(e.value)>=0).map(e=>e.label).join(", "):p}),t.jsx(J,{className:`ml-auto text-[0.618em] ${g?"scale-[-1]":""} transition-[scale]`})]}),g&&t.jsxs("span",{className:"form-field--options elevation-raised absolute w-full left-0 top-full border border-base-line bg-box-base rounded-sm",children:[D&&t.jsx("span",{onClick:()=>{!o&&f(""),d(!1)},className:"cursor-pointer text-center hover:bg-box-medium px-2 flex items-center",children:p}),H&&t.jsx("span",{className:"flex items-center px-2 py-1",children:t.jsx("input",{placeholder:"...filter",type:"text",className:"px-2 py-1 outline-none border border-base-line rounded-sm grow leading-[1.618em]",onChange:B})}),h.filter(e=>!b||e.label.toLowerCase().indexOf(b)>=0||e.value.toLowerCase().indexOf(b)>=0).map((e,s)=>t.jsxs("span",{onClick:()=>G(e.value,s),className:`cursor-pointer w-full break-all text-center  hover:bg-box-medium ${!!l&&(l.indexOf(e.value)>=0||l===e.value)&&"bg-box-medium"} py-2 px-2 text-start flex items-center justify-start text-ellipsis`,children:[e.label,!!l&&(l.indexOf(e.value)>=0||l===e.value)&&t.jsx(K,{className:"text-[0.618em] ml-auto"})]},`option-select-${s}`))]})]}),!!v&&t.jsx("p",{className:"my-2 w-full text-[1em/1.618] text-primary-light font-light",children:v})]})]})};export{P as F};
