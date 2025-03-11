import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import Swiper
import Swiper from 'swiper';
import { Navigation, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';

const gallery = document.querySelector('.reviews-gallery');

getAllFoto();

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Keyboard, Mousewheel],
  cssMode: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  direction: 'horizontal',
  slidesPerView: 1,
  grabCursor: true,
  simulateTouch: true,
  keyboard: {
    enabled: true,
    pageUpDown: true,
  },
  mousewheel: {
    sensitivity: 1,
  },
  speed: 400,
});

async function getAllFoto() {
  try {
    const result = await axios.get(
      `https://portfolio-js.b.goit.study/api/reviews`
    );
    console.log(result.data);
    makeGallery(result.data);

    // const targetLast = document.querySelector('.swiper-slide:last-child');
    // const targetFirst = document.querySelector('.swiper-slide:first-child');

    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0,
    // };

    // const observerLast = new IntersectionObserver(arr => {
    //   if (arr[0].isIntersecting) console.log('LAST', arr[0]);
    // }, options);

    // const observerFirst = new IntersectionObserver(arr => {
    //   if (arr[0].isIntersecting) console.log('FIRST', arr[0]);
    // }, options);

    // observerFirst.observe(targetFirst);
    // observerLast.observe(targetLast);
  } catch (error) {
    const messageErr = `<li class="reviews-item">
        <div class="reviews-content">
          <p class="reviews-error">Not found</p>
        </div>
      </li>
    `;
    console.log(messageErr);

    gallery.insertAdjacentHTML('beforeend', messageErr);

    const target = document.querySelector('.reviews-error');
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(arr => {
      if (arr[0].isIntersecting)
        messageAllert('ERROR', `Sorry, ${error}!`, ' #ef4040');
      console.log(arr[0]);
    }, options);

    observer.observe(target);
  }
}

function messageAllert(message, text, backColor) {
  iziToast.show({
    position: 'topRight',
    title: message,
    titleColor: 'white',
    message: text,
    messageSize: '24px',
    messageLineHeight: '24px',
    messageColor: 'white',
    backgroundColor: backColor,
    theme: 'dark',
  });
}

function makeGallery(array) {
  // =========================================== gallery
  const listImages = array
    .map(
      element =>
        `<li class="swiper-slide">
      <div class="slide-container">
          <div class="reviews-thumb">
            <img
              src="${element.avatar_url}"
              alt="foto"
              width="48"
              class="reviews-image"
            />
          </div>
          <div class="reviews-content">
            <h3 class="reviews-member">${element.author}</h3>
            <p class="reviews-text">${element.review}
            </p>
          </div>
          </div>
        </li>
    `
    )
    .join(' ');
  gallery.insertAdjacentHTML('beforeend', listImages);

  // =========================================== buttons
  // const reviewsCards = document.querySelector('.swiper');
  // const listBtn = `<div class="swiper-buttons">
  //       <button type="button" class="swiper-btn swiper-button-prev rotate">
  //         <svg class="arrow" width="25" height="24">
  //           <use href="./img/sprite.svg#icon-arrow-narrow-right"></use>
  //         </svg>
  //       </button>
  //       <button type="button" class="swiper-btn swiper-button-next">
  //         <svg class="arrow" width="25" height="24">
  //           <use href="./img/sprite.svg#icon-arrow-narrow-right"></use>
  //         </svg>
  //       </button>
  //     </div>`;
  // reviewsCards.insertAdjacentHTML('beforeend', listBtn);
}
