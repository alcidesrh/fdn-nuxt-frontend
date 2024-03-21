import { CustomEase } from 'gsap/CustomEase'


let animationGsap: any = null

function init() {
  animationGsap = useGsap
  animationGsap.registerPlugin(CustomEase)
}
function shake(target: any, xy: string = 'x', pixels: number = 7) {
  if (!animationGsap) {
    init()
  }
  const data: Record<any, any> = {
    duration: .5,
    ease: CustomEase.create("custom", "M0,0 C0.012,0 0.025,0.066 0.05,0.066 0.1,0.066 0.1,-0.211 0.15,-0.211 0.2,-0.211 0.2,0.557 0.25,0.557 0.3,0.557 0.3,-0.837 0.35,-0.837 0.399,-0.837 0.399,0.984 0.449,0.984 0.499,0.984 0.499,-0.968 0.549,-0.968 0.6,-0.968 0.599,0.693 0.649,0.693 0.7,0.693 0.699,-0.319 0.749,-0.319 0.799,-0.319 0.799,0.114 0.849,0.114 0.899,0.114 0.899,-0.024 0.949,-0.024 0.974,-0.024 0.974,0 1,0 "),
  }
  if (xy === 'x') {
    data.x = pixels
  }
  else if (xy === 'y') {
    data.y = pixels
  }
  animationGsap.to(target, data);

}

export function useAnimationGsap() {
  return {
    shake,
  }
}

