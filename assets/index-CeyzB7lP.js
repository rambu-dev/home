import{j as a,r as x,m as j,B as y,T as r}from"./index-Dj_nvbqK.js";import{B as p}from"./Button-BeBRuYEf.js";import{F as n}from"./Field-B-ep8aYk.js";import{M as w}from"./Modal-0C9a3ASH.js";const g=e=>{const{submitButtonLable:o="Submit",cancelButtonLable:m="Cancel",onSubmit:c,onCancel:i}=e,t=()=>{typeof c=="function"&&c()},d=()=>{typeof i=="function"&&i(),typeof e.onClose=="function"&&e.onClose()};return a.jsxs(w,{...e,className:"flex flex-col !h-[max-content]",children:[e.children,a.jsxs("div",{className:"mt-auto flex w-full pt-4",children:[a.jsx(p,{onClick:d,className:"grow mr-1",type:"default",children:m}),a.jsx(p,{onClick:t,className:"grow ml-2",type:"primary",children:o})]})]})},v="_rb_dropdown_14rsc_1",N={rb_dropdown:v},C=e=>{const{placeholder:o="Dropdown menu",name:m,label:c,id:i,options:t,className:d="",onSuccess:u}=e,[,f]=x.useState([]),h=l=>{const s=typeof l=="string"?[l]:l;typeof u=="function"&&u(s),f(s)},b=(l,s)=>{s&&t[s]&&typeof t[s].clickHandle=="function"&&t[s].clickHandle(l)};return a.jsx("div",{className:`${N.rb_dropdown} ${d}`,children:a.jsx(n,{placeholder:a.jsx("span",{className:"py-2",children:o}),allowFiler:!0,type:"select",id:i,name:m,label:c,multiple:!0,options:t.map(l=>({value:l.value,label:l.label})),onSuccess:h,showDefaultSelectLabel:!1,onSelect:b,autoComplete:"off"})})},M=()=>{const[e,o]=x.useState(!1);return a.jsxs(j,{title:"User",beforeTitle:a.jsx(r,{level:"h6",children:"Dashboard / User"}),children:[a.jsx(y,{children:a.jsxs("div",{className:"max-w-[600px] grid gap-2",children:[a.jsx(r,{level:"h3",children:"Informations"}),a.jsx(r,{children:"Lorem ipsum dolar sit amet"}),a.jsxs("div",{className:"text-sm grid gap-2",children:[a.jsx(n,{name:"user-name",label:"Name"}),a.jsx(n,{type:"email",name:"user-emal",label:"Email",placeholder:"mail@example.com"}),a.jsx(n,{type:"select",name:"user-gender",label:"Gender",placeholder:a.jsx(r,{level:"span",className:"text-primary-light",children:"-- select --"}),options:[{label:"Male",value:"male"},{label:"Female",value:"female"}]})]}),a.jsxs("div",{className:"flex text-sm",children:[a.jsx("label",{className:"min-w-[10ch] mr-2",children:"Company"}),a.jsx(C,{className:"grow",placeholder:"",name:"company-size",options:[{label:"Only me",value:"1"},{label:"1-5 peoples aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",value:"small"},{label:"1-50 peoples",value:"medium"},{label:">50 peoples",value:"large"}]})]}),a.jsx(r,{level:"h3",children:"Credentials"}),a.jsxs("div",{className:"text-sm grid gap-2",children:[a.jsx(n,{disabled:!0,name:"user-login",label:"Username"}),a.jsx(n,{type:"password",name:"user-password",label:"Password"})]}),a.jsx(p,{onClick:()=>o(!0),type:"primary",children:"Save"})]})}),a.jsx(g,{title:"Confirmation modal",show:e,onClose:()=>o(!1),onSubmit:()=>{console.log("Do something here")}})]})};export{M as default};
