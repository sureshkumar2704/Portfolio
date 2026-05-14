import Lenis from 'lenis'

let lenis
export function initLenis() {
  if (!lenis) {
    lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      wheelMultiplier: 1.1,
      touchMultiplier: 1.2,
      infinite: false,
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }
  return lenis
}
