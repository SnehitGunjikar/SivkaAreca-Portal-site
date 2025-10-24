import { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './ScrollReveal.css'

gsap.registerPlugin(ScrollTrigger)

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  as = 'h2',
  textTag = 'span',
  mode = 'auto', // 'text' | 'block' | 'auto'
  useDefaultTextStyles = true,
  scrub = false,
  start = 'top 85%'
}) => {
  const containerRef = useRef(null)

  const isTextMode = useMemo(() => {
    if (mode === 'text') return true
    if (mode === 'block') return false
    return typeof children === 'string'
  }, [children, mode])

  const splitText = useMemo(() => {
    if (!isTextMode) return null
    const text = typeof children === 'string' ? children : ''
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word
      return (
        <span className="word" key={index}>
          {word}
        </span>
      )
    })
  }, [children, isTextMode])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window

    // Rotation animation on the container itself
    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: scrub ? 'none' : 'power2.out',
        rotate: 0,
        duration: scrub ? undefined : 0.6,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: scrub,
          toggleActions: scrub ? undefined : 'play none none reverse'
        }
      }
    )

    if (isTextMode) {
      const wordElements = el.querySelectorAll('.word')

      // Opacity + translateY for clearer reveal for words
      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, y: 12, willChange: 'opacity, transform' },
        {
          ease: scrub ? 'none' : 'power3.out',
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: scrub ? undefined : 0.9,
          scrollTrigger: {
            trigger: el,
            scroller,
            start,
            end: wordAnimationEnd,
            scrub: scrub,
            toggleActions: scrub ? undefined : 'play none none reverse'
          }
        }
      )

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: scrub ? 'none' : 'power3.out',
            filter: 'blur(0px)',
            stagger: 0.05,
            duration: scrub ? undefined : 0.9,
            scrollTrigger: {
              trigger: el,
              scroller,
              start,
              end: wordAnimationEnd,
              scrub: scrub,
              toggleActions: scrub ? undefined : 'play none none reverse'
            }
          }
        )
      }
    } else {
      // Block mode: animate the entire element
      gsap.fromTo(
        el,
        { opacity: baseOpacity, y: 24, willChange: 'opacity, transform' },
        {
          ease: scrub ? 'none' : 'power3.out',
          opacity: 1,
          y: 0,
          duration: scrub ? undefined : 1.0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start,
            end: wordAnimationEnd,
            scrub: scrub,
            toggleActions: scrub ? undefined : 'play none none reverse'
          }
        }
      )

      if (enableBlur) {
        gsap.fromTo(
          el,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: scrub ? 'none' : 'power3.out',
            filter: 'blur(0px)',
            duration: scrub ? undefined : 1.0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start,
              end: wordAnimationEnd,
              scrub: scrub,
              toggleActions: scrub ? undefined : 'play none none reverse'
            }
          }
        )
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, mode, scrub, start])

  const ContainerTag = as
  const TextTag = textTag

  if (isTextMode) {
    return (
      <ContainerTag ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
        <TextTag className={`${useDefaultTextStyles ? 'scroll-reveal-text' : ''} ${textClassName}`}>{splitText}</TextTag>
      </ContainerTag>
    )
  }

  // Block mode: render children as-is inside the container
  return (
    <ContainerTag ref={containerRef} className={`scroll-reveal ${containerClassName} ${textClassName}`}>
      {children}
    </ContainerTag>
  )
}

export default ScrollReveal