const TRENDING_API =
  'https://api.themoviedb.org/3/trending/all/day?api_key=04c35731a5ee918f014970082a0088b1'
const cardElTrending = document.querySelector('.trending-template').content
const trendList = document.getElementById('trending-list')
const bookmarkList = document.getElementById('bookmark-list')
const cardElBookmark = document.getElementById('bookmark-template').content
let array = []
let bookmarkArray = localStorage.getItem('bookmark')
  ? JSON.parse(localStorage.getItem('bookmark'))
  : []
async function getTrending(url) {
  const resp = await fetch(url)
  const respData = await resp.json()
  renderTrending(respData.results)
  array.push(...respData.results)
  console.log(respData.results)
}
getTrending(TRENDING_API)
console.log(array)

const renderTrending = (trends) => {
  trendList.innerHTML = null
  trends.forEach((trending) => {
    const { poster_path, vote_average, overview, id } = trending
    const card = cardElTrending.cloneNode(true)
    const imgCard = card.querySelector('#trending-img')
    const ratCard = card.querySelector('#trending-rating')
    const reviewCard = card.querySelector('#trending-text')
    const bookmark = card.getElementById('bookmark-btn')

    reviewCard.style.color = '#fff'
    imgCard.src = IMGPATH + poster_path
    ratCard.textContent = vote_average
    reviewCard.textContent = overview
    bookmark.dataset.id = id
    trendList.appendChild(card)
    if (vote_average.toString().length < 3) {
      ratCard.textContent = vote_average + '.0'
    }
  })
}

let bookmarkFragment = document.createDocumentFragment()

const renderBookmarks = (array) => {
  bookmarkList.innerHTML = null
  array.forEach((bookmark, index) => {
    const { title, poster_path, original_name, id } = bookmark
    const card = cardElBookmark.cloneNode(true)
    const titleCard = card.getElementById('bookmark-title')
    const imgCard = card.getElementById('bookmark-img')
    const numbCard = card.getElementById('bookmark-numb')
    const delCard = card.getElementById('bookmark-remove')
    bookmark.isCompleted = false
    if (title) {
      titleCard.textContent = title
    } else if (original_name) {
      titleCard.textContent = original_name
    }
    numbCard.textContent = 1 + index++
    imgCard.src = IMGPATH + poster_path
    delCard.dataset.id = id
    bookmarkFragment.appendChild(card)
  })
  bookmarkList.appendChild(bookmarkFragment)
}

const handleClickList = (evt) => {
  if (evt.target.matches('.js-bookmark')) {
    evt.target.classList.toggle('active')
    const foundMovies = array.find(
      (element) => element.id == evt.target.dataset.id
    )
    const bookmarkMovie = bookmarkArray.find(
      (element) => element.id == evt.target.dataset.id
    )
    if (!bookmarkMovie) {
      bookmarkArray.push(foundMovies)
    }
    bookmarkArray.forEach((bookmark) => {})
    localStorage.setItem('bookmark', JSON.stringify(bookmarkArray))
    renderBookmarks(bookmarkArray)
    console.log(bookmarkArray)
  }
}

const handleRemoveList = (evt) => {
  if (evt.target.matches('.bookmark-remove')) {
    bookmarkArray.splice(0, 1)
    localStorage.setItem('bookmark', JSON.stringify(bookmarkArray))
    renderBookmarks(bookmarkArray)
  }
}

bookmarkList.addEventListener('click', handleRemoveList)
trendList.addEventListener('click', handleClickList)
renderBookmarks(bookmarkArray)
