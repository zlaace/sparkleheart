// stories data
const stories = [
  {
    id: 1,
    name: "Sibilla",
    img: "./assets/img/17.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 2,
    name: "Lauma",
    img: "./assets/img/11.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 3,
    name: "Valentīna",
    img: "./assets/img/16.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 4,
    name: "Arta",
    img: "./assets/img/5.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 5,
    name: "Ketija",
    img: "./assets/img/10.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 6,
    name: "Anda",
    img: "./assets/img/6.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 7,
    name: "Asnāte",
    img: "./assets/img/4.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 8,
    name: "Indra",
    img: "./assets/img/8.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 9,
    name: "Alīna",
    img: "./assets/img/1.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 10,
    name: "Līga",
    img: "./assets/img/12.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 11,
    name: "Regīna",
    img: "./assets/img/14.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 12,
    name: "Marta",
    img: "./assets/img/13.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 13,
    name: "Zanda",
    img: "./assets/img/15.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 14,
    name: "Ilze",
    img: "./assets/img/7.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 15,
    name: "Katrīna",
    img: "./assets/img/9.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 16,
    name: "Gunita",
    img: "./assets/img/2.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 17,
    name: "Egija",
    img: "./assets/img/3.jpg",
    video: "./assets/video/sample_video.mp4"
  },
  {
    id: 18,
    info: "Jauns stāsts tiks pievienots drīzumā",
  },
  {
    id: 19
  },
  {
    id: 20
  },
  {
    id: 21
  },
  {
    id: 22
  },
  {
    id: 23
  },
  {
    id: 24
  },
  {
    id: 25
  },
  {
    id: 26
  },
  {
    id: 27
  },
  {
    id: 28
  },
  {
    id: 29
  },
  {
    id: 30
  },
  {
    id: 31
  },
  {
    id: 32
  },
  {
    id: 33
  },
  {
    id: 34
  },
  {
    id: 35
  },
  {
    id: 36
  },
  {
    id: 37
  },
  {
    id: 38
  },
  {
    id: 39
  },
  {
    id: 40
  },
  {
    id: 41,
  },
  {
    id: 42,
  },
  {
    id: 43
  },
  {
    id: 44
  },
  {
    id: 45
  },
  {
    id: 46
  },
  {
    id: 47
  },
  {
    id: 48
  },
  {
    id: 49
  },
  {
    id: 50
  },
  {
    id: 51
  },
  {
    id: 52
  },
  {
    id: 53
  },
  {
    id: 54
  },
  {
    id: 55
  },
  {
    id: 56
  },
  {
    id: 57
  },
  {
    id: 58
  },
  {
    id: 59
  },
  {
    id: 60
  }
];

// display stories
const storiesContainerInner = document.querySelector(".stories-container-inner");
const loadMore = document.querySelector(".js-load-more");
let currentIndex = 0;
let lastIndex = 18;
let storiesLength = stories.length;

function displayStoriesItems(stories) {
  let displayStories = stories.slice(currentIndex, lastIndex).map((item) => {
    let storyImage = item.img ? item.img : './assets/img/hover-img.jpg';
    let storyAuthor = item.name ? `<h3>${item.name}</h3>` : '';
    let commingSoon = item.info ? `<p class="comming-soon">${item.info}</p>` : '';
    let storyVideo = item.video ? `<div class="modal-overlay" id="modal-${item.id}">
        <div class="modal-container">
          <button class="close-btn" data-id="${item.id}">
            <span class="close-btn-icon"></span>
          </button>
          <video class="modal-video" controls>
            <source src="${item.video}" type="video/mp4"/>
          </video>
          ${storyAuthor}
        </div>
      </div>` : '';

    return `<div class="story js-modal-btn" data-id="${item.id}" style="background-image: url(${storyImage})">
        <p class="story-number">${item.id}</p>
        <div class="overlay">
          ${storyAuthor}
          ${commingSoon}
        </div>
      </div>
      ${storyVideo}`;
  });
  
  displayStories = displayStories.join("");

  storiesContainerInner.insertAdjacentHTML('beforeend', displayStories);
}

displayStoriesItems(stories);


// load next 18 stories
loadMore.addEventListener('click', () => {
  currentIndex = lastIndex;
  lastIndex += 18;
  
  if (lastIndex >= storiesLength) {
    lastIndex = storiesLength;
    loadMore.style.display = "none";
  }

  displayStoriesItems(stories);
});