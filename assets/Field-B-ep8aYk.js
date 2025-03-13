import{r as n,j as t,z as J,o as K}from"./index-Dj_nvbqK.js";const P=H=>{var T;const{className:V="",disabled:v=!1,defaultValue:y="",value:r,name:N,id:C,placeholder:c="",label:f,type:o="text",description:k,tooltip:S,onSuccess:O,validate:F,options:h=[],multiple:i=!1,allowFiler:D=!1,autoComplete:$,showDefaultSelectLabel:q=!0,onSelect:E,after:L,short:z=!1}=H,d=n.useRef(null),u=n.useRef(null),[b,_]=n.useState(""),[g,A]=n.useState(z),[l,p]=n.useState(!i&&y?y:[]),[w,x]=n.useState(!1),R=e=>{const s=e.target.value;typeof F=="function"&&!F(s)||(typeof O=="function"&&O(s),r===void 0&&p(s))},B=e=>{u.current&&clearTimeout(u.current),u.current=setTimeout(()=>{u.current=null,_(e.target.value.trim().toLowerCase())},300)},G=(e,s)=>{typeof E=="function"&&E(e,s),r===void 0&&p(m=>{let a;return i?(a=[],m&&(typeof m=="string"?a.push(m):a=[...m]),a.indexOf(e)>=0?a=a.filter(I=>I!=e):a.push(e)):a=e,a}),i||x(!1)};n.useEffect(()=>{r!==void 0&&r!==l&&p(r)},[r,l]),n.useEffect(()=>{const e=s=>{!i||!d.current||s.target!==d.current&&!d.current.contains(s.target)&&x(!1)};return window.document.addEventListener("click",e),()=>{window.document.removeEventListener("click",e)}},[i]);const j=o==="select"?"hidden":o;return t.jsxs("div",{ref:d,className:`form-field flex flex-wrap ${V}`,children:[!!f&&t.jsx("label",{className:"min-w-[10ch] font-light mr-2 py-[4px]",children:f}),t.jsxs("div",{className:"form-field-input relative flex flex-col grow",children:[t.jsxs("span",{className:`${j==="hidden"?"":"border border-base-line rounded-sm flex justify-end"}`,children:[o==="textarea"&&t.jsx("textarea",{autoComplete:$,id:C,value:l,placeholder:c||f,disabled:v,onChange:R,className:`grow outline-none py-[4px] placeholder:italic leading-[1.618em] transition-[width] px-2 ${g?"w-0 !px-0":"w-1/2"}`,name:N,title:S}),o!=="textarea"&&t.jsx("input",{autoComplete:$,id:C,value:l,placeholder:c||f,disabled:v,onChange:R,className:`grow outline-none py-[4px] placeholder:italic leading-[1.618em] transition-[width] px-2 ${g?"w-0 !px-0":"w-1/2"}`,type:j,name:N,title:S}),!!L&&j!=="hidden"&&t.jsx("span",{onClick:()=>A(!g),className:"text-xs self-stretch aspect-square flex items-center justify-center px-[1em] cursor-pointer",children:L})]}),o==="select"&&t.jsxs(t.Fragment,{children:[t.jsxs("span",{onClick:()=>x(!w),className:"form-field--options-label cursor-pointer w-full break-all overflow-hidden text-ellipsis py-1 px-2 text-center border border-base-line hover:bg-box-medium rounded-sm flex items-center leading-[1.618em]",children:[t.jsx("span",{className:"inline-block min-h-[1.618em]",children:l?typeof l=="string"?(T=h.filter(e=>e.value===l))==null?void 0:T[0].label:h.filter(e=>l.indexOf(e.value)>=0).map(e=>e.label).join(", "):c}),t.jsx(J,{className:`ml-auto text-[0.618em] ${w?"scale-[-1]":""} transition-[scale]`})]}),w&&t.jsxs("span",{className:"form-field--options elevation-raised absolute w-full left-0 top-full border border-base-line bg-box-base rounded-sm",children:[q&&t.jsx("span",{onClick:()=>{i||p(""),x(!1)},className:"cursor-pointer text-center hover:bg-box-medium px-2 flex items-center",children:c}),D&&t.jsx("span",{className:"flex items-center px-2 py-1",children:t.jsx("input",{placeholder:"...filter",type:"text",className:"px-2 py-1 outline-none border border-base-line rounded-sm grow leading-[1.618em]",onChange:B})}),h.filter(e=>!b||e.label.toLowerCase().indexOf(b)>=0||e.value.toLowerCase().indexOf(b)>=0).map((e,s)=>t.jsxs("span",{onClick:()=>G(e.value,s),className:`cursor-pointer w-full break-all text-center  hover:bg-box-medium ${!!l&&(l.indexOf(e.value)>=0||l===e.value)&&"bg-box-medium"} py-2 px-2 text-start flex items-center justify-start text-ellipsis`,children:[e.label,!!l&&(l.indexOf(e.value)>=0||l===e.value)&&t.jsx(K,{className:"text-[0.618em] ml-auto"})]},`option-select-${s}`))]})]}),!!k&&t.jsx("p",{className:"my-2 w-full text-[1em/1.618] text-primary-light font-light",children:k})]})]})};export{P as F};
