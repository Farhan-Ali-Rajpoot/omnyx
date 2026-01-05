"use client";

import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
import { TextureLoader } from "three";
import { shaderMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waveMaterial: any;
    }
  }
}

export default function FloatingImage() {
  return (
    <Canvas 
     className="animate-hide-out"
     camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Image imageUrl="/images/farhan-ali.webp" />
    </Canvas>
  );
}

function Image({ imageUrl }: { imageUrl: string }) {
  const texture = useLoader(TextureLoader, imageUrl);
  const ref = useRef<any>(null!);

  if (!texture.image) return null;

  const { width, height } = texture.image;
  const aspectRatio = width / height;

  const planeArgs: [number, number, number?, number?] = useMemo(() => [aspectRatio * 10, 10], [aspectRatio]);

  const WaveMaterial = useMemo(
    () =>
      shaderMaterial(
        { uTime: 0, uTexture: texture },
        vertexShader,
        fragmentShader
      ),
    [texture]
  );

  extend({ WaveMaterial });

  useFrame((state, delta) => {
    if (ref.current) ref.current.uTime += delta;
  });

  return (
    <mesh>
      <planeGeometry args={planeArgs} />
      {/* @ts-ignore */}
      <waveMaterial ref={ref} />
    </mesh>
  );
}

// Vertex Shader 
const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader
const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform sampler2D uTexture;
  varying vec2 vUv;

  #define NUM_OCTAVES 5

  float rand(vec2 n) { 
  	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }
  
  float noise(vec2 p){
  	vec2 ip = floor(p);
  	vec2 u = fract(p);
  	u = u*u*(3.0-2.0*u);
  	
  	float res = mix(
  		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
  		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
  	return res*res;
  }
  
  float fbm(vec2 x) {
  	float v = 0.0;
  	float a = 0.5;
  	vec2 shift = vec2(100);
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
  	for (int i = 0; i < NUM_OCTAVES; ++i) {
  		v += a * noise(x);
  		x = rot * x * 2.0 + shift;
  		a *= 0.5;
  	}
  	return v;
  }

  void main() {
    vec2 uv = vUv;

    float wave = fbm(1.2 * uv + uTime/3.0);

    uv -= .5;
    float distort = 1.0 + wave;
    uv *= distort;
    uv += .5;

    if(uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      discard;
    }

    gl_FragColor = texture(uTexture, uv);
  }
`;
