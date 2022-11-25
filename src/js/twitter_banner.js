console.log('тут!');


const target = document.querySelector('.twitterBanner');
const options = {
  // root: document.querySelector('.twitterBanner'),
  rootMargin: '0px',
  threshold: 1.0
}

const startTwitterAnimation = (entries, observer) => {
  entries[0].isIntersecting ? target.classList.add('twitterBanner_visible') : target.classList.remove('twitterBanner_visible')
}

const observer = new IntersectionObserver(startTwitterAnimation, options);

observer.observe(target);