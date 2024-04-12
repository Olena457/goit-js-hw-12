import{a as S,S as v,i as s}from"./assets/vendor-6e0bf343.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();async function L(e,o){const i="https://pixabay.com/api/",t=`?key=43261756-f7e91f342fa994673ba6d269c&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${o}`;try{return(await S.get(`${i}${t}`)).data}catch(r){throw console.error("Error fetching images:",r),r}}const c=document.querySelector(".gallery");function g(e){if(!Array.isArray(e)){console.error("Expected images to be an array");return}return e.map(({webformatURL:i,largeImageURL:n,tags:t,likes:r,views:a,comments:w,downloads:E})=>` 
      <li class="gallery-item">
    <a class="gallery-link" href="${n}">
    <img class="gallery-image" src="${i}" alt="${t}" loading="lazy">
    </a>
    <div class='caption'>
    <p class='caption-item'>
      <b>Likes</b>
      ${r}
    </p>
    <p class='caption-item'>
      <b>Views</b>
      ${a}
    </p>
    <p class='caption-item'>
      <b>Comments</b>
      ${w}
    </p>
    <p class='caption-item'>
      <b>Downloads</b>
      ${E}
    </p>
  </div>
    </li>`).join("")}const $=document.querySelector(".js-search"),f=document.querySelector(".loader"),m=document.querySelector(".load-more");$.addEventListener("submit",q);m.addEventListener("click",M);let h=new v(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}),p=1,l=0,d="",u=0;function y(){const e=()=>Math.floor(Math.random()*256);return`rgb(${e()}, ${e()}, ${e()})`}function R(){const e=y(),o=y();document.body.style.backgroundImage=`linear-gradient(45deg, ${e}, ${o})`}async function q(e){if(e.preventDefault(),R(),d=e.target.elements.query.value.trim(),p=1,m.classList.add("hidden"),c.innerHTML="",$.reset(),!d){s.show({title:"Error",message:"Please enter a search query!",position:"topRight",color:"#da1418",timeout:2e3});return}f.classList.remove("hidden");try{const o=await L(d,p);if(u=o.totalHits,l=o.hits.length,u===0){s.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"#da1418",timeout:2e3});return}l<15?(s.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"#21d4bce0",timeout:2e3}),c.innerHTML=g(o.hits),h.refresh(),b()):(c.innerHTML=g(o.hits),m.classList.toggle("hidden",u<=l),h.refresh(),b())}catch{s.error({title:"Error",message:"An error occurred. Please try again!",position:"topRight",color:"#da1418",timeout:2e3})}finally{f.classList.add("hidden")}}async function M(){p++;try{const e=await L(d,p);P(e.hits),l+=e.hits.length,l>=u&&(m.classList.add("hidden"),s.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"#21d4bce0",timeout:2e3}))}catch{s.error({title:"Error",message:"An error occurred. Please try again!",position:"topRight",color:"#da1418",timeout:2e3})}}function P(e){c.insertAdjacentHTML("beforeend",g(e)),h.refresh()}function b(){const{top:e}=c.getBoundingClientRect();window.scrollTo({top:e+window.scrollY,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
