let countdown
const timerLeftDisplay = document.querySelector('.display__time-left')
const timerEndDisplay = document.querySelector('.display__end-time')
const timerButtons = document.querySelectorAll('.timer__button')

function timer(seconds) {
  clearInterval(countdown)

  const now = Date.now()
  const then = now + seconds * 1000
  displayTimerLeft(seconds)
  displayEndTime(then)

  countdown = setInterval(() => {
    let secondsLeft = (then - Date.now()) / 1000
    secondsLeft = Math.round(secondsLeft)

    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }

    displayTimerLeft(secondsLeft)
  }, 1000)
}

function displayTimerLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60

  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
  timerLeftDisplay.textContent = display 
  document.title = display
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hour = end.getHours()
  const adjustedHour = hour > 12 ? hour - 12 : hour 
  const minutes = end.getMinutes()
  const adjustedMinutes = (minutes < 10 ? '0':'') + minutes
 
  timerEndDisplay.textContent = `Be Back At ${adjustedHour}:${adjustedMinutes}`
}

timerButtons.forEach(
  button => button.addEventListener('click', function(event) {
    const time = this.dataset.time 
    timer(time)
  })
)

customForm.addEventListener('submit', function(event) {
  event.preventDefault()
  const input = customForm.querySelector('[name=minutes]')
  const time = input.value * 60
  timer(time)
  this.reset()
})