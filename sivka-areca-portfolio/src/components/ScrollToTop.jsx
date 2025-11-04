import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  // Ensure the browser does not restore previous scroll position
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    // Jump to top immediately on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    })
    // Fallbacks for browsers that ignore the options above
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  return null
}