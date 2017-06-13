const player = document.querySelector('.player')
const video = document.querySelector('.player__video')

const progress = document.querySelector('.progress')
const progressFilled = document.querySelector('.progress__filled')

const toggle = document.querySelector('.player__button.toggle')

const playerSliders = document.querySelectorAll('.player__slider')
const skipButtons = document.querySelectorAll('.player__button[data-skip]')
const fullscreenButton = document.querySelector('.fullscreen')

function togglePlay(e) {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}

function updateToggleButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚'
}

function updateProgress() {
  const percent = video.currentTime / video.duration * 100
  progressFilled.style.width = `${percent}%`
}

function updateProperty() {
  video[this.name] = this.value
}

function updateSkip() {
  const skip = parseFloat(this.dataset.skip)
  video.currentTime += skip
}



video.addEventListener('play', updateToggleButton)
video.addEventListener('pause', updateToggleButton)
video.addEventListener('timeupdate', updateProgress)
video.addEventListener('click', togglePlay)

playerSliders.forEach(slider => {
  slider.addEventListener('input', updateProperty)
})

skipButtons.forEach(button => {
  button.addEventListener('click', updateSkip)
})

progress.addEventListener('click', (e) => {
  const time = e.offsetX / this.offsetWidth * video.duration
  video.currentTime = time
})

fullscreenButton.addEventListener('click', () => {
  if (document.webkitIsFullScreen) {
    document.webkitCancelFullScreen()
    fullscreenButton.textContent = ']['
    return
  }

  video.webkitRequestFullscreen()
})

