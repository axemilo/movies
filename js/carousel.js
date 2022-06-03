const CAROUSEL_API =
  'https://api.themoviedb.org/3/trending/all/day?api_key=04c35731a5ee918f014970082a0088b1'
const cardElCarousel = document.getElementById('carousel-template').content
const carouselList = document.getElementById('carousel-list')
async function getCarousel(url) {
  const resp = await fetch(url)
  const respData = await resp.json()
  console.log(respData)
  const carousel = respData.results.slice(5, 10)
  renderCarousel(carousel)
}

getCarousel(CAROUSEL_API)

const renderCarousel = (movies) => {
  carouselList.innerHTML = null
  movies.forEach((movie) => {
    const { backdrop_path, overview, title } = movie
    const card = cardElCarousel.cloneNode(true)
    const cardImg = card.getElementById('carousel-img')
    const cardTitle = card.getElementById('carousel-title')
    const cardText = card.getElementById('carousel-text')
    const cardItem = card.getElementById('carousel-item')
    cardImg.src = IMGPATH + backdrop_path
    cardTitle.textContent = title
    cardText.textContent = overview
    carouselList.appendChild(card)
  })
}
