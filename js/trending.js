const TRENDING_API =
  'https://api.themoviedb.org/3/trending/all/day?api_key=04c35731a5ee918f014970082a0088b1'
const cardElTrending = document.querySelector('.trending-template').content
const trendList = document.getElementById('trending-list')
const bookmark = cardElTrending.getElementById('item-bookmark')
const bookmarkBtn = cardElTrending.getElementById('bookmark-btn')

async function getTrending(url) {
  const resp = await fetch(url)
  const respData = await resp.json()
  console.log(respData)
  renderTrending(respData.results)
}

getTrending(TRENDING_API)

const renderTrending = (trends) => {
  trendList.innerHTML = null
  trends.forEach((trending) => {
    const { poster_path, vote_average, overview } = trending
    const card = cardElTrending.cloneNode(true)
    const imgCard = card.querySelector('#trending-img')
    const ratCard = card.querySelector('#trending-rating')
    const reviewCard = card.querySelector('#trending-text')
    reviewCard.style.color = '#fff'
    imgCard.src = IMGPATH + poster_path
    ratCard.textContent = vote_average
    reviewCard.textContent = overview
    trendList.appendChild(card)
    if (vote_average.toString().length < 3) {
      ratCard.textContent = vote_average + '.0'
    }
  })
}
