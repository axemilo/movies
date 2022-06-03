const SHOWS_APIURL =
  'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1'

const SHOW_SEARCHAPI =
  'https://api.themoviedb.org/3/search/tv?&api_key=04c35731a5ee918f014970082a0088b1&query='

const cardElShow = document.getElementById('show-template').content
const showList = document.getElementById('tv-list')
const showTitle = document.getElementById('show-title')

async function getShows(url) {
  const resp = await fetch(url)
  const respData = await resp.json()
  console.log(respData)

  renderShows(respData.results)
}
getShows(SHOWS_APIURL)

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
  if (searchValue || event.keyCode == 13) {
    getShows(SHOW_SEARCHAPI + searchValue)

    searchValue.innerHTML = ''
  } else if (searchValue == '') {
    getShows(SHOWS_APIURL)
  }
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
})

const handlePrevPage = (e) => {
  e.preventDefault()
  if (page > 1) {
    page -= 1
    getShows(getAPI(SHOWS_APIURL))
  }
}
const handleNextPage = (e) => {
  e.preventDefault()
  page += 1
  getShows(getAPI(SHOWS_APIURL))
}

pageNext.addEventListener('click', handleNextPage)
pagePrev.addEventListener('click', handlePrevPage)
