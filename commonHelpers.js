import{a as w,S,i as c}from"./assets/vendor-6e0bf343.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();async function f(t,o){const s="https://pixabay.com/api/",e=`?key=43261756-f7e91f342fa994673ba6d269c&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${o}`;try{return(await w.get(`${s}${e}`)).data}catch(r){throw console.error("Error fetching images:",r),r}}const u=document.querySelector(".gallery");function E(t){if(!Array.isArray(t)){console.error("Expected images to be an array");return}const o=t.map(({webformatURL:s,largeImageURL:a,tags:e,likes:r,views:i,comments:b,downloads:L})=>` 
      <li class="gallery-item">
    <a class="gallery-link" href="${a}">
    <img class="gallery-image" src="${s}" alt="${e}" loading="lazy">
    </a>
    <div class='caption'>
    <p class='caption-item'>
      <b>Likes</b>
      ${r}
    </p>
    <p class='caption-item'>
      <b>Views</b>
      ${i}
    </p>
    <p class='caption-item'>
      <b>Comments</b>
      ${b}
    </p>
    <p class='caption-item'>
      <b>Downloads</b>
      ${L}
    </p>
  </div>
    </li>`);u.insertAdjacentHTML("beforeend",o.join(""))}const $=document.querySelector(".js-search");let m=document.querySelector(".loader");const l=document.querySelector(".load-more");$.addEventListener("submit",q);l.addEventListener("click",v);let y=new S(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}),d=1,p=0,n="",h=0;async function q(t){if(t.preventDefault(),n=t.target.elements.query.value.trim(),d=1,!n){c.show({title:"Error",message:"Please enter a search query!",position:"topRight",color:"#da1418",timeout:2e3});return}try{m.classList.remove("hidden");const o=await f(n,d);h=o.totalHits,p=o.hits.length,u.innerHTML="",g(o.hits),h>15?l.classList.remove("hidden"):l.classList.add("hidden"),P()}catch{c.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"#da1418",timeout:2e3})}finally{m.classList.add("hidden")}}async function v(){d+=1;try{const t=await f(n,d);g(t.hits),y.refresh(),p+=t.hits.length,p>=t.totalHits&&(l.classList.add("hidden"),c.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:" #21d4bce0",timeout:2e3}))}catch{c.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"#da1418",timeout:2e3})}}function g(t){const o=E(t);u.insertAdjacentHTML("beforeend",o),y.refresh()}function P(){const{top:t}=u.getBoundingClientRect();window.scrollTo({top:t+window.scrollY,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
