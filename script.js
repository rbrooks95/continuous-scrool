const imageContainer = document.getElementById("image-container");
let ready = false;
let imagesLoaded = 0;
let total = 0;
let photoArray = [];

const count = 30;
const apiKey = "qwt65j76FWz-gmx-TdT5wrfMMbWTvZwpHVhyhsaxyyM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoad() {
  imagesLoaded++;
  if (imagesLoaded === total) {
    ready = true;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  total = photoArray.length;
  photoArray.forEach((photo) => {
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoad);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// gwt photos

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();

    displayPhotos();
  } catch (error) {
    // catching the error here
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
