import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Prism shader material
const PrismMaterial = ({ 
  height = 3.5, 
  baseWidth = 5.5, 
  glow = 1, 
  noise = 0.5, 
  scale = 3.6, 
  hueShift = 0, 
  colorFrequency = 1, 
  timeScale = 0.5,
  animationType = 'hover'
}) => {
  const materialRef = useRef()

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float uTime;
    uniform float uHeight;
    uniform float uBaseWidth;
    uniform float uGlow;
    uniform float uNoise;
    uniform float uScale;
    uniform float uHueShift;
    uniform float uColorFrequency;
    uniform float uTimeScale;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    
    // Noise function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    // HSV to RGB conversion
    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }
    
    void main() {
      vec2 uv = vUv;
      float time = uTime * uTimeScale;
      
      // Create prism shape
      float centerX = 0.5;
      float prismWidth = uBaseWidth * 0.1;
      float prismHeight = uHeight * 0.1;
      
      // Distance from center
      float distFromCenter = abs(uv.x - centerX);
      
      // Create triangular prism shape
      float prismMask = 1.0 - smoothstep(0.0, prismWidth, distFromCenter);
      float heightMask = smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.9, uv.y);
      
      // Color bands with sine waves
      float colorBand = sin((uv.x + time * 0.5) * uColorFrequency * 10.0) * 0.5 + 0.5;
      float colorBand2 = sin((uv.y + time * 0.3) * uColorFrequency * 8.0) * 0.5 + 0.5;
      
      // Create spectrum effect
      float hue = uv.x + colorBand * 0.3 + colorBand2 * 0.2 + time * 0.1 + uHueShift;
      float saturation = 0.8 + colorBand * 0.2;
      float brightness = 0.6 + colorBand2 * 0.4;
      
      // Convert to RGB
      vec3 color = hsv2rgb(vec3(hue, saturation, brightness));
      
      // Add glow effect
      float glow = uGlow * (1.0 - distFromCenter * 2.0);
      color *= (1.0 + glow);
      
      // Add noise
      float noiseValue = random(uv + time) * uNoise;
      color += vec3(noiseValue);
      
      // Apply masks
      float alpha = prismMask * heightMask;
      
      gl_FragColor = vec4(color, alpha);
    }
  `

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uHeight: { value: height },
    uBaseWidth: { value: baseWidth },
    uGlow: { value: glow },
    uNoise: { value: noise },
    uScale: { value: scale },
    uHueShift: { value: hueShift },
    uColorFrequency: { value: colorFrequency },
    uTimeScale: { value: timeScale }
  }), [height, baseWidth, glow, noise, scale, hueShift, colorFrequency, timeScale])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent={true}
      blending={THREE.AdditiveBlending}
    />
  )
}

// Prism geometry component
const PrismGeometry = (props) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current && props.animationType === 'hover') {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} scale={[props.scale || 3.6, props.scale || 3.6, 1]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <PrismMaterial {...props} />
    </mesh>
  )
}

// Main Prism Background component
const PrismBackground = ({
  height = 3.5,
  baseWidth = 5.5,
  animationType = 'hover',
  glow = 1,
  offset = { x: 0, y: 0 },
  noise = 0.5,
  transparent = true,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  timeScale = 0.5,
  className = '',
  style = {}
}) => {
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        ...style
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: transparent ? 'transparent' : '#000' }}
      >
        <PrismGeometry
          height={height}
          baseWidth={baseWidth}
          animationType={animationType}
          glow={glow}
          noise={noise}
          scale={scale}
          hueShift={hueShift}
          colorFrequency={colorFrequency}
          timeScale={timeScale}
        />
      </Canvas>
    </div>
  )
}

export default PrismBackground