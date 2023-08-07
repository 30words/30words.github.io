const images = document.querySelectorAll('.anim');
const images2 = document.querySelectorAll('.anim2');

const observer1 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = `anim1 1s ${entry.target.dataset.delay} forwards`;
    } else {
      entry.target.style.animation = 'none';
    }
  });
});

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = `anim2 1s ${entry.target.dataset.delay} forwards`;
    } else {
      entry.target.style.animation = 'none';
    }
  });
});

images.forEach(image => {
  observer1.observe(image);
});

images2.forEach(image => {
  observer2.observe(image);
});

// Reset animations after 60 seconds
setInterval(() => {
  images.forEach(image => {
    observer1.unobserve(image);
    image.style.animation = 'none';
    setTimeout(() => observer1.observe(image), 0);
  });

  images2.forEach(image => {
    observer2.unobserve(image);
    image.style.animation = 'none';
    setTimeout(() => observer2.observe(image), 0);
  });
}, 60000); // 60 seconds in milliseconds
  