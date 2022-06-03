const MOVIE_APIURL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1'

const MOVIE_SEARCHAPI =
  'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query='

const cardElMovie = document.getElementById('movie-template').content
const movieList = document.getElementById('movie-list')
const movieTitle = document.getElementById('movie-title')
const imgRandom = document.getElementById('imgRandom')

async function getMovies(url) {
  const resp = await fetch(url)
  const respData = await resp.json()
  console.log(respData)

  renderMovies(respData.results)
}
getMovies(MOVIE_APIURL)

const renderMovies = (movies) => {
  movieList.innerHTML = null
  movies.forEach((movie) => {
    const { poster_path, vote_average, overview, title } = movie
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
  movies.sort((a, b) => {
    console.log(a.title)
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1
    } else {
      return 1
    }
  })
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const searchValue = inputSearch.value
  if (searchValue || event.keyCode == 13) {
    getMovies(MOVIE_SEARCHAPI + searchValue)

    searchValue.innerHTML = ''
  } else if (searchValue == '') {
    getMovies(MOVIE_APIURL)
  }
})

const handlePrevPage = (e) => {
  e.preventDefault()
  if (page > 1) {
    page -= 1
    getMovies(getAPI(MOVIE_APIURL))
  }
}
const handleNextPage = (e) => {
  e.preventDefault()
  page += 1
  getMovies(getAPI(MOVIE_APIURL))
}

pageNext.addEventListener('click', handleNextPage)
pagePrev.addEventListener('click', handlePrevPage)
