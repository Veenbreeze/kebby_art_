import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type CloudLayerProps = {
  altitude: number
  opacity: number
  scale: number
  speed: number
  tint: string
}

const skyVertex = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`

const skyFragment = /* glsl */ `
  varying vec2 vUv;
  void main() {
    // A physical-looking clear-sky falloff: deep overhead blue, pale haze at the horizon.
    float horizon = smoothstep(0.0, 0.9, vUv.y);
    vec3 horizonColor = vec3(0.56, 0.77, 0.96);
    vec3 zenithColor = vec3(0.055, 0.24, 0.51);
    vec3 color = mix(horizonColor, zenithColor, horizon);
    float sunGlow = pow(max(0.0, 1.0 - distance(vUv, vec2(0.78, 0.7)) * 1.25), 3.0);
    color += vec3(1.0, 0.70, 0.36) * sunGlow * 0.22;
    gl_FragColor = vec4(color, 1.0);
  }
`

const cloudVertex = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`

const cloudFragment = /* glsl */ `
  uniform float uOpacity;
  uniform vec3 uTint;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float value = 0.0, amplitude = .55;
    for (int i = 0; i < 5; i++) { value += amplitude * noise(p); p *= 2.03; amplitude *= .5; }
    return value;
  }
  void main() {
    vec2 p = vUv;
    float n = fbm(p * vec2(5.0, 3.0));
    float edge = smoothstep(0.02, 0.22, p.x) * smoothstep(0.02, 0.23, 1.0-p.x) * smoothstep(0.03, 0.34, p.y) * smoothstep(0.03, 0.34, 1.0-p.y);
    float body = smoothstep(0.34, 0.73, n + sin(p.x * 7.0) * .07);
    float alpha = body * edge * uOpacity;
    vec3 cloud = mix(uTint * .72, vec3(1.0), smoothstep(.45, .88, n));
    gl_FragColor = vec4(cloud, alpha);
  }
`

function SkyBackdrop() {
  const material = useMemo(() => new THREE.ShaderMaterial({ vertexShader: skyVertex, fragmentShader: skyFragment, depthWrite: false }), [])
  return <mesh frustumCulled={false} renderOrder={-10}><planeGeometry args={[2, 2]} /><primitive object={material} attach="material" /></mesh>
}

function CloudLayer({ altitude, opacity, scale, speed, tint }: CloudLayerProps) {
  const group = useRef<THREE.Group>(null)
  const clouds = useMemo(() => Array.from({ length: 8 }, (_, index) => ({
    x: -14 + index * 4.2,
    y: ((index * 1.73) % 4) - 1.4,
    width: 4.1 + (index % 3) * 1.4,
    height: 1.35 + (index % 2) * 0.45,
    phase: index * 1.87,
  })), [])

  useFrame(({ clock }) => {
    if (!group.current) return
    const elapsed = clock.getElapsedTime()
    group.current.children.forEach((cloud, index) => {
      const item = clouds[index]
      const distance = 30
      cloud.position.x = ((((item.x + elapsed * speed + 15) % distance) + distance) % distance) - 15
      cloud.position.y = item.y + Math.sin(elapsed * (0.18 + index * 0.013) + item.phase) * 0.18
      cloud.rotation.z = Math.sin(elapsed * 0.08 + item.phase) * 0.025
    })
  })

  return <group ref={group} position={[0, altitude, 0]}>{clouds.map((cloud, index) => (
    <mesh key={index} position={[cloud.x, cloud.y, 0]} scale={[cloud.width * scale, cloud.height * scale, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial vertexShader={cloudVertex} fragmentShader={cloudFragment} uniforms={{ uOpacity: { value: opacity }, uTint: { value: new THREE.Color(tint) } }} transparent depthWrite={false} blending={THREE.NormalBlending} />
    </mesh>
  ))}</group>
}

function CameraParallax() {
  const { pointer, camera } = useThree()
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.22, 0.025)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.13, 0.025)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Scene() {
  return <>
    <SkyBackdrop />
    <Environment preset="dawn" environmentIntensity={0.26} />
    <ambientLight intensity={0.8} color="#b9d8ff" />
    <directionalLight position={[5, 4, 4]} intensity={1.8} color="#ffe2af" />
    <fog attach="fog" args={['#a8c9e7', 7, 19]} />
    <CloudLayer altitude={-1.6} opacity={0.36} scale={1.25} speed={0.10} tint="#d8e5ee" />
    <CloudLayer altitude={-0.3} opacity={0.52} scale={0.98} speed={0.19} tint="#edf4f6" />
    <CloudLayer altitude={1.35} opacity={0.76} scale={0.74} speed={0.34} tint="#fff7e8" />
    <CameraParallax />
    <EffectComposer multisampling={0}><Bloom intensity={0.13} luminanceThreshold={0.82} mipmapBlur /></EffectComposer>
  </>
}

export default function CinematicSky() {
  return <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
    <Canvas
      camera={{ position: [0, 0, 9], fov: 48 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.08, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => { gl.outputColorSpace = THREE.SRGBColorSpace }}
    >
      <Scene />
    </Canvas>
  </div>
}
