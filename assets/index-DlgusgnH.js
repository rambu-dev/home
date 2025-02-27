import{r as f,j as a,e as v,f as D}from"./index-DdOUYEQQ.js";import{B as w}from"./Box-D22iGtDX.js";import{A as N}from"./AppWithSidebar-BhK-CTpq.js";import{F as C}from"./Field-BIuFB-Cj.js";import"./App-BdrsDSLw.js";import"./Text-xYY1pVUF.js";const y=l=>{const{name:u,id:s,className:o,checked:t,defaultCheck:c=!1,onCheck:d}=l,[e,x]=f.useState(t!==void 0?t:c),p=f.useRef(null),m=()=>{let h=!e;typeof d=="function"&&d(h),t===void 0&&(x(h),p.current&&(p.current.checked=h))};return f.useEffect(()=>{t!==void 0&&t!==e&&(x(t),p.current&&(p.current.checked=t))},[t,e]),a.jsxs(a.Fragment,{children:[a.jsx("input",{ref:p,type:"hidden",name:u,id:s,value:"true"}),a.jsx("span",{onClick:m,className:`cursor-pointer mx-auto aspect-square rounded-xs w-4 border ${e?"border-accent":"border-box-medium"} flex items-center justify-center ${o}`,children:e?a.jsx(v,{className:"text-xs text-accent"}):""})]})},$=l=>{const{totalPosts:u=1,current:s=1,posts_per_page:o=20,setPage:t}=l,c=Math.ceil(u/o),d=e=>{const x=parseInt(e);typeof t=="function"&&t(1,x)};return a.jsx(a.Fragment,{children:a.jsxs("div",{className:"pagination flex flex-row w-full justify-end text-xs font-light text-primary-light",children:[a.jsxs("select",{value:o,onChange:e=>{d(e.target.value)},className:"cusor-pointer rounded-xs text-center appearance-none outline-hidden border-b-1 border-box-medium border leading-[1.618em] px-2 self-center",style:{textAlignLast:"center"},children:[a.jsx("option",{value:"5",children:"5 posts per page"}),a.jsx("option",{value:"10",children:"10 posts per page"}),a.jsx("option",{value:"20",children:"20 posts per page"}),a.jsx("option",{value:"50",children:"50 posts per page"}),a.jsx("option",{value:"100",children:"100 posts per page"}),a.jsx("option",{value:"200",children:"200 posts per page"})]}),c>1&&a.jsxs(a.Fragment,{children:[a.jsxs("span",{className:"hidden md:flex items-center p-2",children:[a.jsxs("b",{children:[(s-1)*o+1,"-",s>1?s*o:o]})," of ",u||""]}),s>1&&a.jsxs(a.Fragment,{children:[a.jsx("span",{onClick:()=>typeof t=="function"&&t(1),className:"number flex justify-center items-center border-zinc-300 cursor-pointer aspect-square self-center p-2",children:"<<"}),a.jsx("span",{onClick:()=>typeof t=="function"&&t(s-1),className:"number flex justify-center items-center border-zinc-300 cursor-pointer aspect-square self-center p-2",children:"<"})]}),a.jsx("span",{className:"hidden md:flex flex-row items-center",children:[...Array(c).keys()].map(e=>c>5?e===0||e===c-1||e>=s-2&&e<=s?a.jsx("span",{onClick:()=>typeof t=="function"&&t(e+1),className:`number flex justify-center items-center border-zinc-300 cursor-pointer aspect-square self-center p-2 ${e===s-1?"underline text-accent":""}`,children:e+1},`post-listing-page-${e}`):e===s-3||e===s+1?a.jsx("span",{className:"number flex justify-center items-center border-zinc-300 aspect-square self-center p-2",children:"..."},`post-listing-page-${e}`):null:a.jsx("span",{onClick:()=>typeof t=="function"&&t(e+1),className:`number flex justify-center items-center border-zinc-300 cursor-pointer aspect-square self-center p-2 ${e===s-1?"underline text-accent":""}`,children:e+1},`post-listing-page-${e}`))}),s<c&&a.jsxs(a.Fragment,{children:[a.jsx("span",{onClick:()=>typeof t=="function"&&t(s+1),className:"number flex justify-center items-center border-zinc-300 cursor-pointer aspect-square self-center p-2",children:">"}),a.jsx("span",{onClick:()=>typeof t=="function"&&t(c),className:"number flex justify-center items-center border-zinc-300 cursor-pointer aspect-square self-center p-2",children:">>"})]})]})]})})},_=l=>{const{headers:u,data:s=[],className:o="",spacing:t="p-2",onSelect:c}=l,[d,e]=f.useState([]),x=r=>{let n=[...d];n.indexOf(r)>=0&&h(n.filter(i=>r!=i))},p=r=>{const n=[...d];n.indexOf(r)<0&&n.push(r),h(n)},m=r=>{const n=[];if(r)for(let i=0;i<s.length;i++)n.push(i);h(n)},h=r=>{e(r),typeof c=="function"&&(r.length>0?c(s.filter((n,i)=>r.indexOf(i)>=0),r):c([]))};return f.useEffect(()=>{e([])},[s]),a.jsx("div",{className:"table-wrapper relative max-h-full overflow-y-auto py-0",children:a.jsxs("table",{className:`table break-all table-auto w-full rounded-sm bg-box-base ${o}`,children:[a.jsx("thead",{className:"sticky top-0 bg-box-base border-b border-box-medium",children:a.jsxs("tr",{children:[a.jsx("th",{className:"align-middle w-6 px-2",children:a.jsx(y,{onCheck:r=>m(r),checked:d.length===s.length})}),u.map((r,n)=>a.jsx("th",{className:`table--heading ${t} text-left text-sm font-medium border-b border-box-medium ${r.className||""}`,children:r.label},`table--head-${r.key}-${n}`))]})}),a.jsx("tbody",{className:"table--row text-sm",children:s.map((r,n)=>a.jsxs("tr",{children:[a.jsx("td",{children:a.jsx(y,{onCheck:i=>{i?p(n):x(n)},checked:d.indexOf(n)>=0})}),u.map((i,k)=>{var j;const g=(j=r.filter(b=>b.key===i.key))==null?void 0:j[0];return a.jsx("td",{className:`${t}`,children:g?g.value:""},`col-data-${n}-${i.key}-${k}`)})]},`row-data-${n}`))})]})})},E=()=>{const[l,u]=f.useState({current:1,posts_per_page:5}),s=[{label:"Heading 1",key:"h1",className:"w-1/2"},{label:"Heading 2",key:"h2"}],o=[[{value:"1 Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}],[{value:"Data row string aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",key:"h1"},{value:a.jsx("span",{children:"Data react node "}),key:"h2"}]];return a.jsx(N,{title:"Table",children:a.jsxs(w,{className:"h-full flex flex-col",children:[a.jsx("div",{className:"data-filter rounded-xs w-full bg-box-base flex justify-end p-2 mb-2",children:a.jsx(C,{short:!0,name:"search",after:a.jsx(D,{})})}),a.jsx(_,{headers:s,data:o.slice((l.current-1)*l.posts_per_page,l.current*l.posts_per_page),spacing:"p-4",className:"grow",onSelect:(t,c)=>{console.log(t,c)}}),a.jsx($,{current:l.current,totalPosts:o.length,posts_per_page:l.posts_per_page,setPage:(t,c)=>{u(d=>{let e={...d};return e.current=t,c&&(e.posts_per_page=c),e})}})]})})};export{E as default};
