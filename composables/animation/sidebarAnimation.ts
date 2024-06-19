import { CustomEase } from 'gsap/CustomEase'

let menuTimeLine: any = null

function init() {
  menuTimeLine = useGsap
  menuTimeLine.registerPlugin(CustomEase)
}
function mini() {
  // const gsap = useGsap
  // menuTimeLine = gsap.timeline()
  menuTimeLine
    .to('.layout-topbar-logo-container', { position: 'fixed', left: '50%', duration: 0.3 })
    .to('.sidebar-control-btn', { top: 15, left: 0, duration: 0.2 }, '<')
    .to('.layout-sidebar', { top: '70px', width: '70px', duration: 0.2 }, '<')
    .to('.layout-content', { marginLeft: '70px', borderRadius: '0px', duration: 0.2 }, '<')
    .addLabel('mini')
  menuTimeLine.play()
  // menuTimeLine.restart()
}
function close() {
  // const gsap = useGsap
  // menuTimeLine = gsap.timeline()
  menuTimeLine
    .to('.layout-topbar-logo-container', { opacity: 0, duration: 0.3 })
    .to('.layout-sidebar', { left: -250, duration: 0.3 })
    .to('.sidebar-control-btn', { top: 15, left: 0, duration: 0.2 }, '<')
    .to('.layout-content', { marginLeft: 0, duration: 0.2, borderTopLeftRadius: 0 }, '<')
    .to('.layout-topbar-logo-container', { position: 'fixed', left: '50%', marginLeft: '-100px', duration: 0, opacity: 0 }, '<')
    .to('.layout-topbar-logo-container', { opacity: 1, duration: 0.3 }, '+=.3')

    .addLabel('close')
  menuTimeLine.play()
  // menuTimeLine.restart()
}

export function useSideBarTween() {
  if (!menuTimeLine) {
    const gsap = useGsap
    gsap.registerPlugin(CustomEase)
    menuTimeLine = gsap.timeline()
  }
  return {
    menuTimeLine,
    mini,
    close,
  }
}
