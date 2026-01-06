import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import errorIcon from './img/bi_x-octagon.svg';

const form = document.querySelector('.form');
const input = form.elements['search-text'];

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.error({
      message: 'Please enter a search term!',
      // timeout: 0,
      position: 'topRight',
      iconUrl: errorIcon,
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching <span class="span-text">your search query. Please, try again!</span>',
        //   timeout: 0,
        position: 'topRight',
        iconUrl: errorIcon,
      });
      return;
    }

    createGallery(data.hits);
  } finally {
    hideLoader();
  }
});

// catch (error) {
//     iziToast.error({
//         message: 'Something went wrong!',
//         position: 'topRight',
//         iconUrl: errorIcon,
//      });
//   }
