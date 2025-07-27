import{h as r,u as o}from"./server.mjs";const useGoToForwardOrBack=()=>{const s=r(),{currentLocale:a}=o();return{goBack:()=>{(void 0).history.length>1?s.back():s.push(`/${a}`)},goForward:()=>{s.forward()}}};export{useGoToForwardOrBack as u};
//# sourceMappingURL=useGoToForwardOrBack-ClO4dsvn.mjs.map
