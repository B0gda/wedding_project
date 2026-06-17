import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './LiquidEther.css';

type LiquidEtherProps = {
  colors?: [string, string, string];
  mouseForce?: number;
  cursorSize?: number;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
};

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uPointer;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uMouseForce;
uniform float uCursorSize;
uniform float uAutoIntensity;

float wave(vec2 p, float speed, float scale) {
  return sin((p.x + p.y) * scale + uTime * speed) * 0.5 + 0.5;
}

void main() {
  vec2 uv = vUv;
  vec2 pointer = uPointer;
  float dist = distance(uv, pointer);
  float cursor = smoothstep(uCursorSize, 0.0, dist) * uMouseForce;
  float autoPulse = sin(uTime * 0.75) * 0.5 + 0.5;
  uv += normalize(uv - pointer + 0.0001) * cursor * 0.055;
  uv += vec2(sin(uv.y * 8.0 + uTime * 0.62), cos(uv.x * 7.0 - uTime * 0.48)) * 0.035 * uAutoIntensity * autoPulse;
  float a = wave(uv, 0.72, 8.0);
  float b = wave(uv.yx + 0.25, -0.55, 10.0);
  vec3 color = mix(uColor0, uColor1, a);
  color = mix(color, uColor2, b * 0.75);
  float vignette = smoothstep(0.84, 0.18, distance(vUv, vec2(0.5)));
  gl_FragColor = vec4(color * (0.78 + vignette * 0.32), 0.74);
}
`;

export function LiquidEther({
  colors = ['#b8afa3', '#f1eadf', '#8b6b55'],
  mouseForce = 20,
  cursorSize = 100,
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2
}: LiquidEtherProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return undefined;
    }

    if (typeof WebGLRenderingContext === 'undefined') {
      return undefined;
    }

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uColor0: { value: new THREE.Color(colors[0]) },
        uColor1: { value: new THREE.Color(colors[1]) },
        uColor2: { value: new THREE.Color(colors[2]) },
        uMouseForce: { value: mouseForce / 100 },
        uCursorSize: { value: cursorSize / 1000 },
        uAutoIntensity: { value: autoIntensity / 2 }
      }
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    const startTime = performance.now();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0xf1eadf, 0);
    scene.add(mesh);
    host.append(renderer.domElement);

    const resize = () => {
      renderer.setSize(host.clientWidth, host.clientHeight, false);
    };
    const pointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      (material.uniforms.uPointer.value as THREE.Vector2).set(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height
      );
    };

    let frameId = 0;
    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      material.uniforms.uTime.value = elapsed * autoSpeed;

      if (autoDemo) {
        const x = Math.sin(elapsed * 0.28) * 0.18 + 0.5;
        const y = Math.cos(elapsed * 0.23) * 0.18 + 0.5;
        (material.uniforms.uPointer.value as THREE.Vector2).lerp(new THREE.Vector2(x, y), 0.012);
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);
    host.addEventListener('pointermove', pointerMove);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      host.removeEventListener('pointermove', pointerMove);
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [autoDemo, autoIntensity, autoSpeed, colors, cursorSize, mouseForce]);

  return <div className="liquid-ether" ref={hostRef} aria-hidden="true" />;
}
