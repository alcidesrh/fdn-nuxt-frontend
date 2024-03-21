import { CustomEase } from 'gsap/CustomEase'

import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

const getRamdon = (min = 0, max = 10, i = false) => i ? Math.floor(Math.random() * (max - min) + min) : Number.parseFloat(Math.random() * (max - min) + min)
function toggleDay(tl: gsap.core.Timeline, toggle = 'day', logo_color = false) {
  if (toggle === 'day') {
    if (logo_color)
      tl.to(Array.from(document.querySelectorAll('.char')), { duration: 2, color: '#94a3b8' }, '<')
    tl.to('.layout-topbar', { backgroundColor: '#38bdf8', duration: 1 }, '<')// parada
      .to('#luna', { backgroundColor: 'transparent', x: -100, y: 140, width: 0, height: 0 })
      .to('#luna', { backgroundColor: '#facc15', x: 200, y: 0, duration: 2, width: '66px', height: '66px' }, '<')
    tl.fromTo(['.cloud1', '.cloud2', '.cloud3', '.cloud4'], { opacity: 0, x: -200, y: -140 }, { opacity: 1, x: 0, y: 0, duration: 2 }, '<')
  }
  else {
    if (logo_color)
      tl.to(Array.from(document.querySelectorAll('.char')), { duration: 2, color: '#94a3b8' }, '<')
    tl.to('#luna', { x: 300, y: 140, duration: 1 }, '<')
      .to('.layout-topbar', { backgroundColor: '#020617', duration: 2 }, '<')
      .to(['.cloud1', '.cloud2', '.cloud3', '.cloud4'], { opacity: 0, x: 200, y: 140, duration: 1 }, '<')
      .to('#luna', { y: -80, duration: 0 }, '<1')
      .to('#luna', { y: -23, top: '50%', x: -23, left: '50%', position: 'absolute', duration: 1.5, width: '46px', height: '46px', backgroundColor: 'white' }, '<')
      .fromTo('.star', { y: -140 }, { duration: 2.5, y: 0, top: 0 }, '<')
  }
}
function paradaAmanecer(tl: gsap.core.Timeline) {
  tl.to('#header-bus', { display: 'flex', duration: 0 }, '<')
    .to('#target2', { y: 30, x: -400, scale: 0.8 }, '<')//
    .to('#target', { x: 400, scale: 0.8 }, '<')//
  const nav_width = document.querySelector('.layout-topbar')?.offsetWidth
  toggleDay(tl, 'day')
  tl.to('#target', { y: 5, x: -nav_width, duration: 4, repeat: -1, repeatDelay: 15 })// parada
    .to('#target2', { x: nav_width, duration: 4, repeat: -1, repeatDelay: 15 }, '<')// parada
    .to(['#wheel1', '#wheel2'], { rotate: -500, duration: 4 }, '<')
  toggleDay(tl, 'night')
  return tl
}
function busDesarme(tl: gsap.core.Timeline) {
  tl.to(`#star-305, #star-306, #star-307`, { top: '50%', left: '50%', backgroundColor: '#fefce8', duration: 0, borderRadius: '150%' })
  tl.to('#luna', { width: '5px', height: '5px', x: -2.5, y: -2.5, duration: 1.5, backgroundColor: '#fcd34d' }, '<')
  tl.to(`#luna`, { width: '5px', height: '70px', duration: 2, x: -2.5, y: -35, backgroundColor: '#ffedd5', borderRadius: '250%' }, '<1').addLabel('luna')
  for (let index = 1; index < 350; index++) {
    if (![305, 306, 307].includes(index))
      tl.to(`#star-${index}`, { top: '50%', left: '50%', duration: getRamdon(1, 4) }, '<')
  }

  tl.to(`#luna`, { width: '80px', height: '15px', duration: 0.8, x: -40, y: -7.5, backgroundColor: '#fdba74' }, 'luna-=.3')
    .to(`#luna`, { zIndex: 5, width: '200px', height: '10px', x: -100, y: -10, duration: 0.3, backgroundColor: '#fef9c3' })
    .to(`#star-305`, { backgroundColor: '#c2410c', height: '60px', y: -40 }, '<')

    .to(`#star-305`, { width: window.innerWidth, x: (window.innerWidth) / -2, height: 80, y: -40, duration: 0.5, borderRadius: '70%' }, '<')
  tl.to(`#luna`, { backgroundColor: '#fef9c3', zIndex: 99, width: 10, x: -5, height: 3, y: -1.5, duration: 0.2 }, '<.3')

  tl.to(`#luna`, { width: window.innerWidth + 600, x: (window.innerWidth + 600) / -2, height: 80, y: -40, duration: .1, borderRadius: '0%' })

    .to(['.overlay2', '.overlay', '.telon'], { backgroundColor: 'white', opacity: 1, duration: 1 }, '<')

}
function getAxisY() {
  const random = Math.floor(Math.random() * 80)
  if (random < 60)
    return random
  return 80 - random
}
function unlock(tl: gsap.core.Timeline) {
  for (let index = 0; index < 2; index++) {
    tl.to('#lock', { x: 2, duration: 0.1 }, '+=0')
    tl.to('#lock', { x: -4, duration: 0.1 }, '+=0')
    tl.to('#lock', { x: 2, duration: 0.1 }, '+=0')
  }
  tl.to('#lock', { display: 'none', duration: 0 }, '+=0')

  tl.to('#unlock', { rotate: -60, duration: 0.2 })
  tl.to('#unlock', { x: -10, y: -10, duration: 0.2 })
  tl.to('#unlock', { rotate: 720, y: 600, duration: 1 })
  tl.to('#barra', { x: -200, duration: 1 }, '<.5')
  tl.to('#barra', { y: 600, rotate: -720, duration: 1 }, '<.7')

  const nails = document.querySelectorAll('.nail')
  for (let index = 0; index < 4; index += 2) {
    tl.to([nails[index], nails[index + 1]], { width: 20, height: 5, duration: 0.5 }, '<.2')
    tl.to([nails[index], nails[index + 1]], { rotate: 360, y: 300, duration: 1, opacity: 0 }, '<.5')
  }
  tl.to('.blur-sm', { filter: 'blur(0px)' }, '<')
  tl.to('#cerradura', { y: 600, duration: 1, scale: 0.5 }, '<.2')

  tl.to('.overlay2', { x: window.innerWidth / 2, duration: 4, ease: 'slow(0.7,0.7,false)' }, '<')
  tl.to('.overlay', { x: -(window.innerWidth / 2), duration: 4, ease: 'slow(0.7,0.7,false)' }, '<')

  tl.to(['#unlock', '#barra'], { opacity: 0, duration: 0 })
}
function starExplotion(tl: gsap.core.Timeline) {
  tl.to(`#luna, #star-305`, { delay: 1, width: 10, height: '10px', x: -5, y: -5, duration: 0.1, borderRadius: '150%', backgroundColor: 'white' })
  // tl.to(['.overlay2', '.overlay'], { backgroundColor: '#147aa5', duration: 1, ease: 'slow(0.7,0.7,false)' }, '<')
  tl.to(['.overlay2', '.overlay', '.telon'], { backgroundColor: '#0f172a', opacity: .8, duration: .5, ease: 'slow(0.7,0.7,false)' }, '<')
  tl.to('#luna', { y: -60, top: '0%', x: 223, left: '50%', position: 'absolute', duration: 0, width: '46px', height: '46px', opacity: 0 }, '+=1')
  tl.to([`#star-205`, `#star-206`, `#star-208`, `#star-209`], { width: '0px', height: '0px', display: 'block', top: '50%', left: '50%', backgroundColor: '#e2e8f0', duration: 0, opacity: 1, borderRadius: '150%' })

  tl.to(['.telon'], { opacity: 0, duration: 0 })
  for (let index = 0, temp = 45, position = '+=0', ids = [`#star-205`, `#star-206`, `#star-208`, `#star-209`]; index < 4; index++, temp += 90) {
    if (index === 2) {
      temp = 0
      position = '+=.5'
    }
    else if (index === 1 || index === 3) { position = '<' }
    tl.to(ids[index], { rotate: temp, duration: 0 }, position)
    tl.to(ids[index], { duration: 0.1, width: '80px', height: '2px', x: -40, y: -1 }, position)
  }
  tl.to(['.overlay'], { duration: 0.1, borderColor: '#fefce8', borderRightWidth: 0.5 }, '<')
  tl.to(['.overlay2'], { duration: 0.1, borderColor: '#fefce8', borderLeftWidth: 0.5 }, '<')

  const data = {
    width: '10px',
    height: '10px',
    duration: 3.5,
    x: -5,
    y: -5.0,
  }
  tl.to('#wheel-logo', { delay: 1, scale: 0, opacity: 1, zIndex: 99, fill: '#3f3f46', left: '50%', fontSize: '40px', duration: 0, x: -30 })
    .to('#wheel-logo', { rotate: 3600, duration: 5, scale: 1, fill: '#fefce8' })
    .to([`#star-205`, `#star-206`, `#star-208`, `#star-209`], data, '<')
  tl.to('.telon', { opacity: 0, duration: 3 }, '<')
  tl.to(['.overlay2', '.overlay'], { opacity: .3, backgroundColor: '#7dd3fc', duration: 3, ease: 'slow(0.7,0.7,false)' }, '<')
  // .to('#wheel-logo', { rotate: 3600, duration: 2 }, '<')
  let letters = Array.from(document.querySelectorAll('.char'))
  tl.to(letters, { left: '0%', top: '0%', x: -20, position: 'absolute', color: '#e2e8f0', duration: 0 }, '<')
  tl.to(document.querySelectorAll('.logo'), { display: 'flex' }, '<')
  const ease = [
    'slow(0.7,0.7,false)',
    'bounce.out',
    'back.out(1.7)',
    'circ.out',
    'elastic.out(1,0.3)',
    'rough({template:none.out,strength: 1,points:20,taper:none,randomize:true,clamp:false})',
    'slow(0.7,0.7,false)',
  ]
  const chars = Array.from(document.querySelectorAll('.char'))
  for (let i = 0; i < chars.length; i++) {
    const aux = 3 // getRamdon(2, 3)
    tl.to(chars[i], { delay: getRamdon(0.05, 0.2), zIndex: 100, x: window.innerWidth - 50, duration: aux, rotate: getRamdon(0, 360), color: '#fef3c7', ease: CustomEase.create('custom', 'M0,0 C0.14,0 0.242,0.438 0.272,0.561 0.313,0.728 0.354,0.963 0.362,1 0.37,0.985 0.411,0.983 0.472,0.94 0.567,0.871 0.639,0.929 0.652,0.938 0.728,0.988 0.892,0.994 0.911,0.998 0.922,1 1,1 1,1') }, !i ? '+=0' : `char${i - 1}-=${aux}`).addLabel(`char${i}`)
    tl.to(chars[i], { top: '50%', y: 50, duration: getRamdon(0.5, 1.5), ease: 'bounce.out' }, `char${i - 1}-=1.4`)
    tl.to(chars[i], { x: window.innerWidth - getRamdon(50, 400), duration: getRamdon(1.5, 3.5) }, `char${i - 1}-=1`)
  }
  tl.to('#wheel-logo', { rotate: -3600, duration: 3, scale: 0 }, '<')


  tl.to([`#star-0`, `#star-1`], { width: 0, height: 0, top: '50%', left: '50%', duration: 0.5, borderRadius: '150%', backgroundColor: '#fefce8' })

  for (let index = 351; index < 500; index++) {
    if (index === 351) {
      tl.to(['.overlay2', '.overlay', '.telon'], { backgroundColor: '#0f172a', opacity: .8, duration: 2.5 }, '<')
      // .to('.telon', { opacity: .3, duration: 4 }, '<')
    }
    if (![305, 306, 307].includes(index))
      tl.to(`#star-${index}`, { top: '50%', left: '50%', x: -((document.querySelector(`#star-${index}`)?.clientWidth || 0) / 2), y: -((document.querySelector(`#star-${index}`)?.clientHeight || 0) / 2), duration: getRamdon(0, 4) }, '<')
  }
  tl.to(['.telon'], { opacity: 0, duration: 0 }, '<3')

  tl.to(`#star-0`, { height: '3px', y: -1.5, width: window.innerWidth / 4, x: -((window.innerWidth) / 8), backgroundColor: '#fefce8', duration: 0.2 }, '<')
    .to(`#star-1`, { backgroundColor: '#fefce8', width: '3px', x: -1.5, height: 40, y: -20, duration: 0.2 }, '<')
    .to(`#star-0`, { width: window.innerWidth / 2, x: -((window.innerWidth) / 4), height: '1px', y: -0.4, duration: 0.1 }, '<.5')
    .to(`#star-1`, { height: 80, y: -40, width: '1px', x: -0.4, duration: 0.1 }, '<')


  tl.to([`#star-0`, `#star-1`], { width: 10, height: 10, y: -5, x: -5, duration: 0.7, ease: CustomEase.create('custom', 'M0,0 C0.031,0.061 0.599,-0.268 0.677,-0.138 0.859,0.165 0.644,1 1,1 ') })

  for (let index = 0; index < 500; index++) {
    if (index == 250) {
      tl.to('.telon', { opacity: 0, duration: 3 }, '<')
      tl.to(['.overlay2', '.overlay'], { opacity: .3, backgroundColor: '#7dd3fc', duration: 3, ease: CustomEase.create("custom", "M0,0 C0.012,0.03 0.219,0.488 0.271,0.484 0.35,0.477 0.71,0.422 0.838,0.499 0.965,0.577 0.974,0.737 0.974,0.822 0.971,1.164 0.784,1.531 1,1.531 ") }, '<')

    }
    tl.to(`#star-${index}`, { top: `${getAxisY()}px`, left: `${Math.floor(Math.random() * window.innerWidth)}px`, duration: getRamdon(2, 5), ease: CustomEase.create("custom", "M0,0 C0,0 -0.027,0.643 0.131,0.802 0.264,0.935 0.305,-0.034 0.473,-0.015 0.678,0.006 1,1 1,1 ") }, !index ? '+=0' : '<')
  }

  letters = Array.from(document.querySelectorAll('.char'))
  const options = {
    fontSize: '1.5rem',
    y: -15,
    zIndex: 999,
    duration: 0.2,
    ease: 'slow(0.7,0.7,false)',
  }

  const space = window.innerWidth / (document.querySelectorAll('.char').length * 20)
  const s = (window.innerWidth - (document.querySelectorAll('.char').length * 22)) / 2
  const axis = []
  axis.push(s)
  const items = [...document.querySelectorAll(`.name1`), ...document.querySelectorAll(`.name2`)]
  for (let i = 1; i < items.length; i++)
    axis.push(axis[i - 1] + 20 + space)
  let cont = letters.length - 1
  const aux = cont
  do {
    const temp = { ...options }
    if (cont === aux)
      temp.delay = 5
    const index = getRamdon(0, letters.length - 1, 'int')
    temp.x = axis[index]
    // temp.ease = ease[getRamdon(3, 10, 'int')]
    temp.rotate = 0
    temp.duration = getRamdon(1, 2)
    tl.to(letters[index], { ...temp }, `<0.08`)
    letters.splice(index, 1)
    axis.splice(index, 1)
  } while (cont--)

  tl.to(['#luna'], { backgroundColor: 'white', duration: 2, opacity: 1, y: -10 }, '+=1')
  tl.to(Array.from(document.querySelectorAll('.char')), { duration: 2, y: 15 }, '<')

  // if (isDayTime)
  //   toggleDay(tl, 'day')

  return tl
}

function animation() {
  const gsap = useGsap
  gsap.registerPlugin(MotionPathPlugin)
  gsap.registerPlugin(CustomEase)

  const tl = gsap.timeline()
  paradaAmanecer(tl)
  busDesarme(tl)
  starExplotion(tl)

  tl.play()// .call(() => tl.kill() as unknown as void)
  return tl
}

export function useTween() {
  return {
    animation,
  }
}
