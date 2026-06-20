"use client";

import dynamic from 'next/dynamic';

const ShaderGradientAny = dynamic<any>(
  () => import('shadergradient').then((mod) => mod.ShaderGradient as any),
  { ssr: false }
);

const ShaderGradientCanvasAny = dynamic<any>(
  () => import('shadergradient').then((mod) => mod.ShaderGradientCanvas as any),
  { ssr: false }
);

interface AboutShaderProps {
  variant?: 'card' | 'page';
}

export function AboutShader({ variant = 'card' }: AboutShaderProps) {
  const wrapperClass = variant === 'card' 
    ? "absolute inset-0 z-0 opacity-80 pointer-events-none mix-blend-screen"
    : "fixed inset-0 z-0 pointer-events-none";

  return (
    <div className={wrapperClass}>
      <ShaderGradientCanvasAny style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <ShaderGradientAny
          animate="on"
          axesHelper="off"
          bgColor1="#000000"
          bgColor2="#000000"
          brightness={1.2}
          cAzimuthAngle={298}
          cDistance={3.6}
          cPolarAngle={99}
          cameraZoom={5.16}
          color1="#ff5005"
          color2="#dbba95"
          color3="#d0bce1"
          destination="onCanvas"
          embedMode="off"
          envPreset="lobby"
          format="gif"
          fov={45}
          frameRate={10}
          gizmoHelper="hide"
          grain="off"
          lightType="env"
          pixelDensity={1}
          positionX={-1.4}
          positionY={0}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={10}
          rotationZ={50}
          shader="defaults"
          type="sphere"
          uAmplitude={1}
          uDensity={0.8}
          uFrequency={5.5}
          uSpeed={0.1}
          uStrength={2.3}
          uTime={0}
          wireframe={false}
          zoomOut={false}
        />
      </ShaderGradientCanvasAny>
    </div>
  );
}
