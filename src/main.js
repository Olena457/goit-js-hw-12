import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import { galleryEl, renderImages } from './js/render-functions';

const searchForm = document.querySelector('.js-search');
const preloader = document.querySelector('.loader');
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

function generateRandomColor() {
  const randomColor = () => Math.floor(Math.random() * 256);
  return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
}

function setBackgroundGradient() {
  const color1 = generateRandomColor();
  const color2 = generateRandomColor();
  document.body.style.backgroundImage = `linear-gradient(45deg, ${color1}, ${color2})`;
}

async function handleSearchSubmit(ev) {
  ev.preventDefault();
  setBackgroundGradient();
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
  preloader.classList.remove('hidden');

  try {
    const resp = await fetchImages(query, currentPage);
    totalHits = resp.totalHits;
    currentHits = resp.hits.length;

    if (totalHits === 0) {
      iziToast.error({
        title: 'Error',
        message: `Sorry, there are no images matching your search query. Please try again!`,
        position: 'topRight',
        color: '#da1418',
        timeout: 2000,
      });
      return;
    }
    galleryEl.innerHTML = renderImages(resp.hits);
    loadMoreBtn.classList.toggle('hidden', totalHits <= 15);
    lightbox.refresh();
    scrollToNewImages();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred. Please try again!',
      position: 'topRight',
      color: '#da1418',
      timeout: 2000,
    });
  } finally {
    preloader.classList.add('hidden');
  }
}

async function onClickMoreBtn() {
  currentPage++;
  try {
    const resp = await fetchImages(query, currentPage);
    addImagesToGallery(resp.hits);
    currentHits += resp.hits.length;

    if (currentHits > totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        title: 'Info',
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
        color: '#21d4bce0',
        timeout: 2000,
      });
      searchForm.reset();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred. Please try again!',
      position: 'topRight',
      color: '#da1418',
      timeout: 2000,
    });
  }
}

function addImagesToGallery(images) {
  galleryEl.insertAdjacentHTML('beforeend', renderImages(images));
  lightbox.refresh();
}
function scrollToNewImages() {
  const { top } = galleryEl.getBoundingClientRect();
  window.scrollTo({ top: top + window.scrollY, behavior: 'smooth' });
}
