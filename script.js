var container = document.body
var canvas = document.createElement('canvas')
canvas.style.display = 'block'
container.appendChild(canvas)
var context = canvas.getContext('2d')
var n, particles, raf

init()

Rx.Observable.fromEvent(window, 'resize')
  .debounceTime(200)
  .subscribe(function () {
    window.cancelAnimationFrame(raf)
    init()
  })

function init () {
  canvas.width = container.clientWidth
  canvas.height = container.clientHeight
  n = canvas.width * canvas.height / 2000
  particles = []
  for (var i = 0; i < n; i += 1) {
    particles.push(generateParticle())
  }
  raf = window.requestAnimationFrame(draw)
}

function generateParticle () {
  return {
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    vx: .1 * Math.random() * (Math.random() < .5 ? 1 : -1),
    vy: .1 * Math.random() * (Math.random() < .5 ? 1 : -1),
    r: 1
  }
}

function draw () {
  context.clearRect(0,0, canvas.width, canvas.height)
  context.fillStyle = 'rgba(255, 255, 0, .9)'
  context.beginPath()
  for (var i = 0; i < n; i += 1) {
    var particle = particles[i]
    context.moveTo(particle.x, particle.y)
    context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)    
    particle.x = (particle.x + particle.vx + canvas.width) % canvas.width
    particle.y = (particle.y + particle.vy + canvas.height) % canvas.height
  }
  context.fill()
  raf = window.requestAnimationFrame(draw)
}
