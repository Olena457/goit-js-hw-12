import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import { galleryEl } from './js/render-functions';
import { renderImages } from './js/render-functions';

const searchForm = document.querySelector('.js-search');
let preloader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', handleSearchSubmit);
loadMoreBtn.addEventListener('click', onClickMoreBtn);

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

let currentPage = 1;
let currentHits = 0;
let query = '';
let totalHits = 0;

async function handleSearchSubmit(ev) {
  ev.preventDefault();
  query = ev.target.elements.query.value.trim();
  currentPage = 1;

  if (!query) {
    iziToast.show({
      title: 'Error',
      message: `Please enter a search query!`,
      position: 'topRight',
      color: '#da1418',
      timeout: 2000,
    });
    return;
  }
  try {
    preloader.classList.remove('hidden');
    const resp = await fetchImages(query, currentPage);
    totalHits = resp.totalHits;
    currentHits = resp.hits.length;

    galleryEl.innerHTML = '';
    addImagesToGallery(resp.hits);

    if (totalHits > 15) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      loadMoreBtn.classList.add('hidden');
    }
    scrollToNewImages();
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: `Sorry, there are no images matching your search query. Please try again!`,
      position: 'topRight',
      color: '#da1418',
      timeout: 2000,
    });
  } finally {
    preloader.classList.add('hidden');
  }
}

async function onClickMoreBtn() {
  currentPage += 1;
  try {
    const resp = await fetchImages(query, currentPage);
    addImagesToGallery(resp.hits);
    lightbox.refresh();
    currentHits += resp.hits.length;

    if (currentHits >= resp.totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        title: 'Info',
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
        color: ' #21d4bce0',
        timeout: 2000,
      });
    }
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: `Sorry, there are no images matching your search query. Please try again!`,
      position: 'topRight',
      color: '#da1418',
      timeout: 2000,
    });
  }
}

function addImagesToGallery(images) {
  const markup = renderImages(images);
  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
function scrollToNewImages() {
  const { top } = galleryEl.getBoundingClientRect();
  window.scrollTo({ top: top + window.scrollY, behavior: 'smooth' });
}
