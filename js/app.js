let page = 1
const IMGPATH = 'https://image.tmdb.org/t/p/w1280'

const inputSearch = document.getElementById('input-search')
const form = document.getElementById('form')
const inputSwitch = document.querySelector('.input-switch')
const body = document.querySelector('body')
const pagePrev = document.getElementById('page-prev')
const pageNext = document.getElementById('page-next')
const select = document.getElementById('select-sort')
const selectObject = {
  az: (a, b) => {
    if (a.title.lowerCase() < b.title.lowerCase()) {
      return -1
    } else {
      return 1
    }
  },
}
const switchMode = () => {
  inputSwitch.classList.add('active')
  body.classList.toggle('active')
}

inputSwitch.addEventListener('change', switchMode)
const getAPI = (url) => url + '&page=' + page
