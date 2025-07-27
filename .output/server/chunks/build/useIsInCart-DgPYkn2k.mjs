import{u as r}from"./useCartStore-iBuykjA7.mjs";import{v as t}from"./server.mjs";const useIsInCart=()=>{const s=r(),e=t.computed((()=>new Set(s.items.map((r=>r.product.id)))));return{isInCart:r=>e.value.has(r)}};export{useIsInCart as u};
//# sourceMappingURL=useIsInCart-DgPYkn2k.mjs.map
