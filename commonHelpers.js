import{a as E,S,i}from"./assets/vendor-6e0bf343.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();async function h(e,o){const s="https://pixabay.com/api/",t=`?key=43261756-f7e91f342fa994673ba6d269c&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${o}`;try{return(await E.get(`${s}${t}`)).data}catch(r){throw console.error("Error fetching images:",r),r}}const d=document.querySelector(".gallery");function y(e){if(!Array.isArray(e)){console.error("Expected images to be an array");return}return e.map(({webformatURL:s,largeImageURL:a,tags:t,likes:r,views:n,comments:$,downloads:w})=>` 
      <li class="gallery-item">
    <a class="gallery-link" href="${a}">
    <img class="gallery-image" src="${s}" alt="${t}" loading="lazy">
    </a>
    <div class='caption'>
    <p class='caption-item'>
      <b>Likes</b>
      ${r}
    </p>
    <p class='caption-item'>
      <b>Views</b>
      ${n}
    </p>
    <p class='caption-item'>
      <b>Comments</b>
      ${$}
    </p>
    <p class='caption-item'>
      <b>Downloads</b>
      ${w}
    </p>
  </div>
    </li>`).join("")}const b=document.querySelector(".js-search"),g=document.querySelector(".loader"),u=document.querySelector(".load-more");b.addEventListener("submit",v);u.addEventListener("click",P);let L=new S(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}),m=1,p=0,c="",l=0;function f(){const e=()=>Math.floor(Math.random()*256);return`rgb(${e()}, ${e()}, ${e()})`}function q(){const e=f(),o=f();document.body.style.backgroundImage=`linear-gradient(45deg, ${e}, ${o})`}async function v(e){if(e.preventDefault(),q(),c=e.target.elements.query.value.trim(),m=1,u.classList.add("hidden"),d.innerHTML="",b.reset(),!c){i.show({title:"Error",message:"Please enter a search query!",position:"topRight",color:"#da1418",timeout:2e3});return}g.classList.remove("hidden");try{const o=await h(c,m);if(l=o.totalHits,p=o.hits.length,l===0){i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"#da1418",timeout:2e3});return}d.innerHTML=y(o.hits),u.classList.toggle("hidden",l<=p),L.refresh(),A()}catch{i.error({title:"Error",message:"An error occurred. Please try again!",position:"topRight",color:"#da1418",timeout:2e3})}finally{g.classList.add("hidden")}}async function P(){m++;try{const e=await h(c,m);R(e.hits),p+=e.hits.length,p>=l&&(u.classList.add("hidden"),i.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"#21d4bce0",timeout:2e3}))}catch{i.error({title:"Error",message:"An error occurred. Please try again!",position:"topRight",color:"#da1418",timeout:2e3})}}function R(e){d.insertAdjacentHTML("beforeend",y(e)),L.refresh()}function A(){const{top:e}=d.getBoundingClientRect();window.scrollTo({top:e+window.scrollY,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
