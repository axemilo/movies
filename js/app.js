const MOVIE_APIURL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1'

const SHOWS_APIURL =
  'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1'

const IMGPATH = 'https://image.tmdb.org/t/p/w1280'
const MOVIE_SEARCHAPI =
  'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query='

const SHOW_SEARCHAPI =
  'https://api.themoviedb.org/3/search/tv?&api_key=04c35731a5ee918f014970082a0088b1&query='

const cardElMovie = document.getElementById('movie-template').content
const cardElShow = document.getElementById('show-template').content
const movieList = document.getElementById('movie-list')
const showList = document.getElementById('tv-list')
const inputSearch = document.getElementById('input-search')
const form = document.getElementById('form')
const showTitle = document.getElementById('show-title')
const movieTitle = document.getElementById('movie-title')
const inputSwitch = document.querySelector('.input-switch')
const body = document.querySelector('body')
const switchMode = () => {
  inputSwitch.classList.add('active')
  body.classList.toggle('active')
}

inputSwitch.addEventListener('change', switchMode)

async function getMovies(url) {
  const resp = await fetch(url)
  const respData = await resp.json()
  console.log(respData)

  renderMovies(respData.results)
}

async function getShows(url) {
  const resp = await fetch(url)
  const respData = await resp.json()
  console.log(respData)

  renderShows(respData.results)
}

const renderMovies = (movies) => {
  movieList.innerHTML = null
  movies.forEach((movie) => {
    const { poster_path, vote_average, overview } = movie
    const card = cardElMovie.cloneNode(true)
    const imgCard = card.querySelector('#movie-img')
    const ratCard = card.querySelector('#movie-rating')
    const reviewCard = card.querySelector('#movie-text')
    reviewCard.style.color = '#fff'
    imgCard.src = IMGPATH + poster_path
    ratCard.textContent = vote_average
    reviewCard.textContent = overview
    movieList.appendChild(card)
    if (vote_average.toString().length < 3) {
      ratCard.textContent = vote_average + '.0'
    }
  })
}

const renderShows = (shows) => {
  showList.innerHTML = null
  shows.forEach((show) => {
    const { poster_path, vote_average, overview } = show
    const card = cardElShow.cloneNode(true)
    const imgCard = card.querySelector('#show-img')
    const ratCard = card.querySelector('#show-rating')
    const reviewCard = card.querySelector('#show-text')
    imgCard.src = IMGPATH + poster_path
    ratCard.textContent = vote_average
    reviewCard.textContent = overview
    reviewCard.style.color = '#fff'
    showList.appendChild(card)
    if (vote_average.toString().length < 3) {
      ratCard.textContent = vote_average + '.0'
    }
  })
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const searchValue = inputSearch.value
  movieList.style.marginBottom = '20px'
  showList.innerHTML = null
  showList.style.marginBottom = '0'
  showTitle.style.display = 'none'

  if (searchValue || event.keyCode == 13) {
    getMovies(MOVIE_SEARCHAPI + searchValue)

    searchValue.innerHTML = ''
  } else if (searchValue == '') {
    getMovies(MOVIE_APIURL)
    getShows(SHOWS_APIURL)
    showTitle.style.display = 'block'
  }
})

getMovies(MOVIE_APIURL)
getShows(SHOWS_APIURL)
